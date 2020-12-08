from app import ma
from serializers.base import BaseSchema
from marshmallow import fields
from models.order import OrderModel

# ! Just have the Tea.
class OrderSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:
    model = OrderModel
    load_instance = True
    
<<<<<<< HEAD
  products = fields.Nested('ProductSchema', many=True)
=======
  products = fields.Nested('ProductSchema', many=True)
  # customer_id = fields.Nested('CustomerSchema', many=False)

  
>>>>>>> development
