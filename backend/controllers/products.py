from flask import Blueprint, request
from models.product import ProductModel
from models.order import OrderModel
from serializers.product import ProductSchema
from serializers.order import OrderSchema
from marshmallow import ValidationError

router = Blueprint(__name__, 'products')
product_schema = ProductSchema()
order_schema = OrderSchema()

@router.route('/products', methods=['GET'])
def get_products():
  products = ProductModel.query.all()
  return product_schema.jsonify(products, many=True), 200
  
@router.route('/orders/<int:id>', methods=['GET'])
def order_status(id):
  order = OrderModel.query.get(id)
  return order_schema.jsonify(order), 200
  