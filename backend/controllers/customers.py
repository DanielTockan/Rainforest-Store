from flask import Blueprint, request
from models.product import ProductModel
from models.order import OrderModel
from models.customer import CustomerModel
from serializers.product import ProductSchema
from serializers.order import OrderSchema
from serializers.customer import CustomerSchema
from marshmallow import ValidationError

router = Blueprint(__name__, 'customers')
product_schema = ProductSchema()
order_schema = OrderSchema()
customer_schema = CustomerSchema()
  
@router.route('/customers', methods=['GET'])
def get_customers():
  customers = CustomerModel.query.all()
  return customer_schema.jsonify(customers, many=True), 200

@router.route('/customers/<int:id>', methods=['GET'])
def get_single_customer(id):
  single_customer = CustomerModel.query.get(id)

  if not single_customer:
    return { 'message': 'This customer is not available' }, 404

  return customer_schema.jsonify(single_customer), 200