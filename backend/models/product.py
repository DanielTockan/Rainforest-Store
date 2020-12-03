from app import db
from models.base import BaseModel

class ProductModel(db.Model, BaseModel):

  __tablename__ = "products"

  name = db.Column(db.String(200), nullable=False)
  description = db.Column(db.String(200), nullable=False)
  rating = db.Column(db.Integer, nullable=True)
  category = db.Column(db.String(200), nullable=False)
  price = db.Column(db.Integer, nullable=False)
  image = db.Column(db.String(200), nullable=False)
  review = db.Column(db.String(200), nullable=True)


