from flask import Blueprint, request
from models.product import ProductModel
from models.order import OrderModel
from models.customer import CustomerModel
from serializers.product import ProductSchema
from serializers.order import OrderSchema
from serializers.customer import CustomerSchema
from marshmallow import ValidationError

router = Blueprint(__name__, 'orders')
product_schema = ProductSchema()
order_schema = OrderSchema()
customer_schema = CustomerSchema()

# @router.route('/products', methods=['GET'])
# def get_products():
#   products = ProductModel.query.all()
#   return product_schema.jsonify(products, many=True), 200

# @router.route('/products/<int:id>', methods=['GET'])
# def get_single_product(id):
#   single_product = ProductModel.query.get(id)

#   if not single_product:
#     return { 'message': 'This product is not available' }, 404

#   return product_schema.jsonify(single_product), 200
  


@router.route('/orders', methods=['GET'])
def get_orders():
  orders = OrderModel.query.all()
  return order_schema.jsonify(orders, many=True), 200

@router.route('/orders/<int:id>', methods=['GET'])
def get_single_order(id):
  single_order = OrderModel.query.get(id)

  if not single_order:
    return { 'message': 'This order is not available' }, 404

  return order_schema.jsonify(single_order), 200


  
# @router.route('/customers', methods=['GET'])
# def get_customers():
#   customers = CustomerModel.query.all()
#   return customer_schema.jsonify(customers, many=True), 200

# @router.route('/customers/<int:id>', methods=['GET'])
# def get_single_customer(id):
#   single_customer = CustomerModel.query.get(id)

#   if not single_customer:
#     return { 'message': 'This customer is not available' }, 404

#   return customer_schema.jsonify(single_customer), 200