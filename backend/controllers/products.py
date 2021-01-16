from flask import Blueprint, request, g
from models.product import ProductModel
from models.order import OrderModel
from models.customer import CustomerModel
from models.review import ReviewModel
from serializers.product import ProductSchema
from serializers.populated_product import PopulatedProductSchema
from serializers.order import OrderSchema
from serializers.customer import CustomerSchema
from serializers.review import ReviewSchema
from marshmallow import ValidationError
from middleware.secure_route import secure_route
from serializers.populated_order import PopulateOrderSchema
from marshmallow import ValidationError
from middleware.secure_route import secure_route
import requests


router = Blueprint(__name__, 'products')
product_schema = ProductSchema()
populated_product = PopulatedProductSchema()
order_schema = OrderSchema()
customer_schema = CustomerSchema()
review_schema = ReviewSchema()

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

  return populated_product.jsonify(single_product), 200

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


@router.route('/products/<int:product_id>/add-to-cart', methods=['PUT', 'POST'])
@secure_route
def add_to_cart(product_id):
  single_product = ProductModel.query.get(product_id)
  single_product_data = product_schema.dump(single_product)
  current_order = OrderModel.query.filter_by(customer_id=g.current_user.id, current_order=True).first()
  current_order_data = populated_order_schema.dump(current_order) 
  current_customer = CustomerModel.query.filter_by(id=g.current_user.id).first()
  current_customer_data = customer_schema.dump(current_customer)

  if current_order: 
    try:
      item = populated_order_schema.load(
      {"products": [*current_order_data['products'], single_product_data]},
      instance=current_order,
      partial=True
    )
      item.save()

    except ValidationError as e:
      return { 'errors': e.messages, 'message': 'Something went wrong.' }  

    current_order = OrderModel.query.filter_by(customer_id=g.current_user.id, current_order=True).first()
    current_order_data = order_schema.dump(current_order)

    try:
      calculate_amount = current_order_data['total_amount']
      
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


  elif not current_order: 
    create_new_item = populated_order_schema.load({
      "current_order": "true",
      "products": [single_product_data],
      "customer_id": g.current_user.id,
      "order_status": "In progress",
      "total_amount": single_product_data['price']},
      instance=OrderModel()
    )

    try:
      create_new_item.save()

    except ValidationError as e:
      return { 'errors': e.messages, 'message': 'Something went wrong.' }

    return populated_order_schema.jsonify(create_new_item), 200
  
  else:
    return 'No data recorded', 200
    

@router.route('/products/<int:id>/delete-from-cart', methods=['DELETE'])
@secure_route
def delete_from_cart(id):
  single_product = ProductModel.query.get(id)
  single_product_data = product_schema.dump(single_product)
  current_order = OrderModel.query.filter_by(current_order=True).first()
  current_order_data = order_schema.dump(current_order)

  delete_item = list(filter(lambda x: x['id'] != id, current_order_data['products']))

  item = populated_order_schema.load(
    {"products": [*delete_item]},
    instance=current_order,
    partial=True
  )
  item.remove()

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


@router.route('/products/<int:id>/reviews', methods=['POST'])
@secure_route
def create_review(id):
  review_data = request.get_json()
  review_data['id'] = g.current_user.id

  if not g.current_user.id:
    return { 'message': 'You must be logged in to leave a comment'}, 404

  product = ProductModel.query.get(id)
  review = review_schema.load(review_data)

  review.product = product
  review.save()
  return review_schema.jsonify(review)

@router.route('products/<int:id>/reviews', methods=['GET'])
def get_review(id):
  reviews = ReviewModel.query.get(id)
  return review_schema.jsonify(reviews)