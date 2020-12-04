from app import ma
from serializers.base import BaseSchema
from marshmallow import fields
from models.order import OrderModel

# ! Just have the Tea.
class PopulateOrderSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:
    model = OrderModel
    load_instance = True

  products = fields.Nested('ProductSchema', many=True)