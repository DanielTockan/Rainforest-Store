from app import ma
from serializers.base import BaseSchema
from marshmallow import fields
from models.product import ProductModel

# ! Just have the Tea.
class ProductSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:
    model = ProductModel
    load_instance = True
