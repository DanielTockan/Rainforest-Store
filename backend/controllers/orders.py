from flask import Blueprint, request, g
from models.product import ProductModel
from models.order import OrderModel
from models.customer import CustomerModel
from serializers.product import ProductSchema
from serializers.order import OrderSchema
from serializers.customer import CustomerSchema
from serializers.populated_order import PopulateOrderSchema
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
  orders = OrderModel.query.all()
  return order_schema.jsonify(orders, many=True), 200

@router.route('/orders/<int:id>', methods=['GET'])
@secure_route
def get_single_order(id):
  single_order = OrderModel.query.get(id)

  if single_order.customer_id != g.current_user.id:
    return { 'message': 'You do not have permission to access this order.'}

  if not single_order:
    return { 'message': 'This order is not available' }, 404

  return order_schema.jsonify(single_order), 200

@router.route('orders/<int:id>', methods=['PUT'])
@secure_route
def add_single_item(id):
  get_order = OrderModel.query.get(id)

  if get_order.customer_id != g.current_user.id:
    return { 'message': 'You do not have permission to access this order.'}

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