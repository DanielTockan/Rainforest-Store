from flask import Blueprint, request
from models.product import ProductModel
from models.order import OrderModel
from models.customer import CustomerModel
from serializers.product import ProductSchema
from serializers.order import OrderSchema
from serializers.customer import CustomerModel
from marshmallow import ValidationError

router = Blueprint(__name__, 'products')
product_schema = ProductSchema()
order_schema = OrderSchema()

@router.route('/products', methods=['GET'])
def get_products():
  products = ProductModel.query.all()
  return product_schema.jsonify(products, many=True), 200
  
@router.route('/orders', methods=['GET'])
def get_orders():
  orders = OrderModel.query.all()
  return order_schema.jsonify(orders, many=True), 200

@router.route('/customers', methods=['GET'])
def get_customers():
  customers = CustomerModel.query.all()
  return order_schema.jsonify(customers, many=True), 200

# @router.route('/orders/<int:id>', methods=['GET'])
# def order_status(id):
#   order = OrderModel.query.get(id)
#   return order_schema.jsonify(order), 200
  