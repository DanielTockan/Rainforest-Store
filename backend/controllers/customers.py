from flask import Blueprint, request, g
from models.product import ProductModel
from models.order import OrderModel
from models.customer import CustomerModel
from serializers.customer import CustomerSchema
from serializers.populated_customer import PopulatedCustomerSchema
from marshmallow import ValidationError
from middleware.secure_route import secure_route

router = Blueprint(__name__, 'customers')

customer_schema = CustomerSchema()
populated_customer = PopulatedCustomerSchema()

@router.route('/customers', methods=['GET'])
def get_customers():
  customers = CustomerModel.query.all()
  # return test, 200
  return customer_schema.jsonify(customers, many=True), 200

@router.route('/customers/<int:id>', methods=['GET'])
@secure_route
def get_single_customer(id):
  single_customer = CustomerModel.query.get(id)

  if not single_customer:
    return { 'message': 'This customer is not available' }, 404

  if single_customer.id != g.current_user.id:
    return { 'message': 'You cannot inspect a profile that is not yours'}

  return populated_customer.jsonify(single_customer), 200

@router.route('/customers/<int:id>', methods=['PUT'])
@secure_route
def update_customer(id):
  existing_customer = CustomerModel.query.get(id)
  favourites = populated_customer.dump(existing_customer)
  print(favourites)


  if existing_customer.id != g.current_user.id:
    return { 'message': 'You cannot update a profile that is not yours'}, 404

  try:
    customer = populated_customer.load(
      {"products": [request.get_json(), *favourites]},
      instance=existing_customer,
      partial=True
    )
  except ValidationError as e:
    return { 'errors': e.messages, 'message': 'Something went wrong.' }

  customer.save()

  return customer_schema.jsonify(customer), 201

@router.route('/register', methods=['POST'])
def register():
  customer_data = request.get_json()
  customer = customer_schema.load(customer_data)
  customer.save()
  return customer_schema.jsonify(customer), 201

@router.route('/login', methods=['POST'])
def login():
  customer_data = request.get_json()
  customer = CustomerModel.query.filter_by(email=customer_data['email']).first()

  if not customer:
    return { 'message': 'No user found with this email' }, 404

  if not customer.validate_password(customer_data['password']):
    return { 'message': 'Unauthorised' }, 402

  token = customer.generate_token()

  return { 'token': token, 'message': 'Welcome back'}
