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

router = Blueprint(__name__, 'products')
product_schema = ProductSchema()
populated_product = PopulatedProductSchema()
order_schema = OrderSchema()
customer_schema = CustomerSchema()
review_schema = ReviewSchema()


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

@router.route('/products/<int:id>', methods=['PUT'])
def add_to_cart(id):
  product = ProductModel.query.get(id)

  try:
    item = order_schema.load(product)

  except ValidationError as e:
    return { 'errors': e.messages, 'message': 'Something went wrong.' }

  item.save()

  return order_schema.jsonify(item), 200


@router.route('/products/<int:id>/reviews', methods=['POST'])
@secure_route
def create_review(id):
  review_data = request.get_json()
  review_data['id'] = g.current_user.id

  product = ProductModel.query.get(id)
  review = review_schema.load(review_data)

  review.product = product
  review.save()
  return review_schema.jsonify(review)