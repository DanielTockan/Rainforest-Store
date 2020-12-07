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

@router.route('/products/<int:id>/new-order', methods=['PUT'])
def new_order(id):
  single_product = ProductModel.query.get(id)
  single_product_data = product_schema.dump(single_product)
  print(single_product_data)

  try: 
    new_item = populated_order_schema.load(single_product_data)

  except ValidationError as e:
    return { 'errors': e.messages, 'message': 'Something went wrong.' }

  return populated_order_schema.jsonify(new_item)


@router.route('/products/<int:id>/add-to-cart', methods=['PUT'])
def add_to_cart(id):
  single_product = ProductModel.query.get(id)
  single_product_data = product_schema.dump(single_product)
  current_order = OrderModel.query.filter_by(current_order=True).first()

  try:
    item = populated_order_schema.load(
      {"products": [single_product_data]},
      instance=current_order,
      partial=True
    )

  except ValidationError as e:
    return { 'errors': e.messages, 'message': 'Something went wrong.' }

  item.save()

  current_order = OrderModel.query.filter_by(current_order=True).first()
  current_order_data = order_schema.dump(current_order)

  try:
    calculate_amount = 0
    for i in range(len(current_order_data['products'])):
      calculate_amount = current_order_data['products'][i]['price'] + calculate_amount

    total_amount = populated_order_schema.load(
      {"total_amount": calculate_amount},
      instance=current_order,
      partial=True
    )
    total_amount.save()
  
  except ValidationError as e:
    return { 'errors': e.messages, 'message': 'Something went wrong.' }
  
  return populated_order_schema.jsonify(item), 200

@router.route('/products/<int:id>/delete-from-cart', methods=['DELETE'])
def delete_from_cart(id):
  single_product = ProductModel.query.get(id)
  single_product_data = product_schema.dump(single_product)
  current_order = OrderModel.query.filter_by(current_order=True).first()
  current_order_data = order_schema.dump(current_order)
 
  try:
    single_product.remove()

  except ValidationError as e:
    return { 'errors': e.messages, 'message': 'Something went wrong.' }

  current_order = OrderModel.query.filter_by(current_order=True).first()
  current_order_data = order_schema.dump(current_order)

  try:
    calculate_amount = 0
    for i in range(len(current_order_data['products'])):
      calculate_amount = current_order_data['products'][i]['price'] + calculate_amount

    total_amount = order_schema.load(
      {"total_amount": calculate_amount},
      instance=current_order,
      partial=True,
      many=True
    )
    total_amount.save()
  
  except ValidationError as e:
    return { 'errors': e.messages, 'message': 'Something went wrong.' }
  
  return order_schema.jsonify(total_amount), 200
  