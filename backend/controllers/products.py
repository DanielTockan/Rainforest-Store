from flask import Blueprint, request
from app import db
from models.product import ProductModel
from models.order import OrderModel
from models.customer import CustomerModel
from serializers.product import ProductSchema
from serializers.order import OrderSchema
from serializers.customer import CustomerSchema
from serializers.populated_order import PopulateOrderSchema
from marshmallow import ValidationError
import requests


router = Blueprint(__name__, 'products')
product_schema = ProductSchema()
order_schema = OrderSchema()
customer_schema = CustomerSchema()
populated_order_schema = PopulateOrderSchema()

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

@router.route('/products/<int:id>/add-to-cart', methods=['PUT'])
def add_to_cart(id):
  single_product = ProductModel.query.get(id)
  current_order = OrderModel.query.filter_by(current_order=True).first()


  query = db.execute("""SELECT * FROM orders """)
  print(query)


  try:
    item = order_schema.load(
      request.get_json(),
      instance=current_order,
      partial=True
    )
    print(item.products)

  except ValidationError as e:
    return { 'errors': e.messages, 'message': 'Something went wrong.' }

  item.save()

  return populated_order_schema.jsonify(item), 200
  