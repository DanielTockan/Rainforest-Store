from app import db, ma, bcrypt
from models.base import BaseModel
from models.product import ProductModel
from models.customer_product import customers_products_join
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import *
import jwt
from environment.config import secret



class CustomerModel(db.Model, BaseModel):

  __tablename__ = "customers"

  username = db.Column(db.String(200), nullable=False)
  email = db.Column(db.String(200), nullable=False, unique=True)
  password_hash = db.Column(db.String(200), nullable=False)
  products = db.relationship('ProductModel', secondary=customers_products_join, backref='customers')

  @hybrid_property
  def password(self):
    pass

  @password.setter
  def password(self, password_plaintext):
    self.password_hash = bcrypt.generate_password_hash(password_plaintext).decode('utf-8')

  def validate_password(self, password_plaintext):
    return bcrypt.check_password_hash(self.password_hash, password_plaintext)

  def generate_token(self):

    payload = { 
      'exp': datetime.utcnow() + timedelta(days=1),
      'iat': datetime.utcnow(),
      'sub': self.id
    }

    token = jwt.encode(
      payload,
      secret,
      'HS256'
    ).decode('utf-8')

    return token
