from app import ma
from serializers.base import BaseSchema
from marshmallow import fields
from models.review import ReviewModel

class ReviewSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:
    model = ReviewModel
    load_instance = True

  customer = fields.Nested('CustomerSchema', only=('username', 'id'),  many=False)
  reviews = fields.Nested('ReviewSchema', many=True)