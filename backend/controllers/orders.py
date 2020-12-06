from flask import Blueprint, request
from models.product import ProductModel
from models.order import OrderModel
from models.customer import CustomerModel
from serializers.product import ProductSchema
from serializers.order import OrderSchema
from serializers.customer import CustomerSchema
from serializers.populated_order import PopulateOrderSchema
from marshmallow import ValidationError

router = Blueprint(__name__, 'orders')

product_schema = ProductSchema()
order_schema = OrderSchema()
customer_schema = CustomerSchema()
populate_order = PopulateOrderSchema()

@router.route('/orders', methods=['GET'])
def get_orders():
  orders = OrderModel.query.all()
  return order_schema.jsonify(orders, many=True), 200

@router.route('/orders', methods=['POST'])
def create_order():
  new_order = request.get_json()
  
  try: 
    order = order_schema.load(new_order)
  except ValidationError as e:
    return { 'errors': e.messages, 'message': 'Something went wrong.' }

  order.save()

  return order_schema.jsonify(order), 200


@router.route('/orders/<int:id>', methods=['GET'])
def get_single_order(id):
  single_order = OrderModel.query.get(id)

  if not single_order:
    return { 'message': 'This order is not available' }, 404

  return order_schema.jsonify(single_order), 200

@router.route('orders/<int:id>', methods=['PUT'])
def add_single_item(id):
  get_order = OrderModel.query.get(id)

  try:
    item = order_schema.load(
      request.get_json(),
      instance=get_order,
      partial=True
    )

  except ValidationError as e:
    return { 'errors': e.messages, 'message': 'Something went wrong.' }

  item.save()

  return order_schema.jsonify(item)

@router.route('orders/current-order', methods=['GET'])
def current_order():
  this_order = OrderModel.query.filter_by(current_order=True).first()
  return order_schema.jsonify(this_order)

@router.route('orders/finalize-order', methods=['POST'])
def set_order_status():
  this_order = OrderModel.query.filter_by(current_order=True).first()

  complete_order = order_schema.load(
    request.get_json(),
    instance=this_order,
    partial=True
  )

  complete_order.save()

  return populate_order.jsonify(complete_order), 200

  

  

  
