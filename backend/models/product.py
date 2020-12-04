from app import db
from models.base import BaseModel

class ProductModel(db.Model, BaseModel):

  __tablename__ = "products"

  title = db.Column(db.String(200), nullable=False)
  description = db.Column(db.String(200), nullable=True)
  rating = db.Column(db.Float, nullable=False)
  category = db.Column(db.String(200), nullable=False)
  price = db.Column(db.Float, nullable=False)
  currency = db.Column(db.String(10), nullable=False)
  symbol = db.Column(db.String(10), nullable=False)
  image = db.Column(db.String(200), nullable=False)
  review = db.Column(db.String(200), nullable=True)


