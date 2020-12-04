from app import db
from models.base import BaseModel
from models.product import ProductModel
from models.order_product import orders_products_join
from models.customer import CustomerModel

class OrderModel(db.Model, BaseModel):
  __tablename__ = 'orders'
  total_amount = db.Column(db.Integer, nullable=False)
  order_status = db.Column(db.String(20), nullable=False)

  customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'), nullable=True)
  customer = db.relationship('CustomerModel', backref='orders')


  products = db.relationship('ProductModel', secondary=orders_products_join, backref='orders')
  