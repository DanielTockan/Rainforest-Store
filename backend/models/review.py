from app import db
from models.base import BaseModel

from models.product import ProductModel
from models.customer import CustomerModel

class ReviewModel(db.Model, BaseModel):
  __tablename__ = 'reviews'
  content = db.Column(db.Text, nullable=False)

  product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
  product = db.relationship('ProductModel', backref='reviews')

  customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))
  customer = db.relationship('CustomerModel', backref='reviews')