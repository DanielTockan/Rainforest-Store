from app import db
from models.base import BaseModel
from models.product import ProductModel
from models.order_product import orders_products_join

class OrderModel(db.Model, BaseModel):
  __tablename__ = 'orders'
  total_amount = db.Column(db.Integer, nullable=False)
  order_status = db.Column(db.String(20), nullable=False)

  products = db.relationship('ProductModel', secondary=orders_products_join, backref='orders')
  