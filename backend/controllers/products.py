from flask import Blueprint, request
from models.product import Product
# from serializers.defect import DefectsSerializer
from marshmallow import ValidationError

router = Blueprint(__name__, 'products')

@router.route('/products', methods=['GET'])
def get_products():
  print('Hello, World')
  return 'Yo bro', 201
  