from app import ma
from serializers.base import BaseSchema
from models.customer import CustomerModel
from marshmallow import fields

class PopulatedCustomerSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:
    model = CustomerModel
    load_instance = True
    exclude = ('password_hash',)
    load_only = ('password')
  
  products = fields.Nested('ProductSchema', many=True)  
  orders = fields.Nested('OrderSchema', many=True)