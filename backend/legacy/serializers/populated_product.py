from app import ma
from serializers.base import BaseSchema
from marshmallow import fields
from models.product import ProductModel

class PopulatedProductSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:
    model = ProductModel
    load_instance = True

  reviews = fields.Nested('ReviewSchema', many=True)
