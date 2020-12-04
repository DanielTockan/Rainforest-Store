from app import db

customers_products_join = db.Table('customers_products',
  db.Column('customer_id', db.Integer, db.ForeignKey('customers.id'), primary_key=True),
  db.Column('product_id', db.Integer, db.ForeignKey('products.id'), primary_key=True)
)