from app import db
from models.base import BaseModel

class Product(db.Model, BaseModel):

  __tablename__ = "products"

  product_id = db.Column(db.Integer, nullable=False, unique=True)
  product_name = db.Column(db.String(200), nullable=False)

