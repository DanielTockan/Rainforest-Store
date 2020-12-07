from flask import Blueprint, request, g
from models.product import ProductModel
from models.order import OrderModel
from models.customer import CustomerModel
from serializers.populated_customer import PopulatedCustomerSchema
from serializers.product import ProductSchema
from serializers.order import OrderSchema
from serializers.customer import CustomerSchema
from serializers.populated_order import PopulateOrderSchema
from middleware.secure_route import secure_route
from marshmallow import ValidationError

router = Blueprint(__name__, 'orders')

product_schema = ProductSchema()
order_schema = OrderSchema()
customer_schema = CustomerSchema()
populate_order = PopulateOrderSchema()
populate_customer = PopulatedCustomerSchema()

@router.route('/orders', methods=['GET'])
@secure_route
def get_orders():
  print(g.current_user.id)
  # orders = OrderModel.query.filter_by(customer_id = 1)
  # return populate_order.jsonify(orders, many=True), 200
  return "hello", 200

# @router.route('/orders', methods=['POST'])
# @secure_route
# def create_order():
#   new_order = request.get_json()
#   new_order['customer_id'] = g.current_user.id

#   try: 
#     order = order_schema.load(new_order)
#   except ValidationError as e:
#     return { 'errors': e.messages, 'message': 'Something went wrong.' }

#   order.save()

#   return order_schema.jsonify(order), 200


@router.route('/orders/<int:id>', methods=['GET'])
@secure_route
def get_single_order(id):
  single_order = OrderModel.query.get(id)
  print(single_order)

  # if not single_order['customer_id'] == g.current_user.id:
    # return { 'message': 'This order is not available' }, 404

  return populate_order.jsonify(single_order), 200

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

@router.route('orders/finalize-order', methods=['PUT'])
def set_order_status():
  this_order = OrderModel.query.filter_by(current_order=True).first()

  complete_order = order_schema.load(
    {"current_order": False,
    "order_status": "Completed"},
    instance=this_order,
    partial=True
  )

  complete_order.save()

  return populate_order.jsonify(complete_order), 200

  

  

  
