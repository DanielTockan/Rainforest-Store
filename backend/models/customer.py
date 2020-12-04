from app import db
from models.base import BaseModel
from models.product import ProductModel
from models.customer_product import customers_products_join

class CustomerModel(db.Model, BaseModel):

  __tablename__ = "customers"

  username = db.Column(db.String(200), nullable=False)
  email = db.Column(db.String(200), nullable=False, unique=True)
  password_hash = db.Column(db.String(200), nullable=False)
  products = db.relationship('ProductModel', secondary=customers_products_join, backref='customers')
