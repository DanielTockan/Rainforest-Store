from flask import Blueprint, request, g
from models.product import ProductModel
from models.order import OrderModel
from models.customer import CustomerModel
from serializers.product import ProductSchema
from serializers.order import OrderSchema
from serializers.customer import CustomerSchema
from serializers.populated_order import PopulateOrderSchema
from middleware.secure_route import secure_route
from marshmallow import ValidationError
from middleware.secure_route import secure_route

router = Blueprint(__name__, 'orders')

product_schema = ProductSchema()
order_schema = OrderSchema()
customer_schema = CustomerSchema()
populate_order = PopulateOrderSchema()

@router.route('/orders', methods=['GET'])
@secure_route
def get_orders():
  orders = OrderModel.query.filter_by(customer_id = g.current_user.id)
  return populate_order.jsonify(orders, many=True), 200

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
@secure_route
def get_single_order(id):
  single_order = OrderModel.query.get(id)

  if single_order.customer_id != g.current_user.id:
    return { 'message': 'You do not have permission to access this order.'}

  if not single_order:
    return { 'message': 'This order is not available' }, 404

  return order_schema.jsonify(single_order), 200

@router.route('orders/current-order', methods=['GET'])
@secure_route
def current_order():
  this_order = OrderModel.query.filter_by(customer_id=g.current_user.id, current_order=True).first()
  return order_schema.jsonify(this_order)

@router.route('orders/finalize-order', methods=['PUT'])
@secure_route
def set_order_status():
  this_order = OrderModel.query.filter_by(customer_id=g.current_user.id, current_order=True).first()

  # if get_order.customer_id != g.current_user.id:
  #   return { 'message': 'You do not have permission to access this order.'}

  try:
    complete_order = order_schema.load(
    {"current_order": 'false',
    "order_status": "Completed"},
    instance=this_order,
    partial=True
    )

  except ValidationError as e:
    return { 'errors': e.messages, 'message': 'Something went wrong.' }

  complete_order.save()

  return order_schema.jsonify(complete_order), 200
  


  

  

  
