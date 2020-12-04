from flask import Blueprint, request
from models.product import ProductModel
from models.order import OrderModel
from models.customer import CustomerModel
from serializers.product import ProductSchema
from serializers.order import OrderSchema
from serializers.customer import CustomerSchema
from marshmallow import ValidationError

router = Blueprint(__name__, 'products')
product_schema = ProductSchema()
order_schema = OrderSchema()
customer_schema = CustomerSchema()

@router.route('/products', methods=['GET'])
def get_products():
  products = ProductModel.query.all()
  return product_schema.jsonify(products, many=True), 200

@router.route('/products/<int:id>', methods=['GET'])
def get_single_product(id):
  single_product = ProductModel.query.get(id)

  if not single_product:
    return { 'message': 'This product is not available' }, 404

  return product_schema.jsonify(single_product), 200

@router.route('/products/<int:id>', methods=['PUT'])
def add_to_cart(id):
  product = ProductModel.query.get(id)

  try:
    item = order_schema.load(product)

  except ValidationError as e:
    return { 'errors': e.messages, 'message': 'Something went wrong.' }

  item.save()

  return order_schema.jsonify(item), 200
  