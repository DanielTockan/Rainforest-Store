from app import db
from serializers.base import BaseSchema
from models.customer import CustomerModel
from marshmallow import fields

class CustomerSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:
    model = CustomerModel
    load_instance = True
    exclude = ('password_hash')
    load_only = ('email', 'password')

  # ! Why is this needed?
  password = fields.String(required=True)
  #orders = fields.Nested('OrderSchema', many=True)
