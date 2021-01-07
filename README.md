# Rainforest E-Store (SEI Project 4)

![GA Logo](./resources/screenshots/GALogo.png)

## Project Overview

The Rainforest E-Store is a full-stack application where customers can complete their online shopping through a clean and user friendly interface. It was built using Python Flask for the back-end, a postgreSQL relational databse and a React front-end. 

The concept was inspired by the growing trend of retail businesses improving their online presence, and presented a considerable increase in complexity in comparison to the projects covered within our classwork.

This was my final and most challenging project with GA, but also my most enjoyble. Despite only having being taught Python and SQL the week prior, I got very comfortable the languages and creating intricate table relationships.

Upon completion, the project was deployed via Heroku.

### Have a browse at the Rainsforest store [here.](https://rainforeststore.herokuapp.com/)

### Table of Contents

1. [Project Overview](#Project-Overview)
2. [The Brief](#The-Brief)
3. [Technologies Used](#Technologies-Used)
4. [The Approach](#The-Approach)
    - [Planning](#Planning)
    - [Back-end](#Back-end)
    - [Front-end](#Front-end)
5. [Triumphs](#Triumphs)
6. [Obstacles Faced and Lessons](#Obstacles-Faced-and-Lessons)
7. [Future Features](#Future-Features)

## The Brief

- Build a full-stack MERN web application, making my own front-end and back-end
- Use a Python Flask API using  a Flask Rest Framework to serve my data from a PostgreSQL database
- Be a complete product which means multiple relationships and CRUD functionality for the relevant models
- Implement thoughtful user stories/wireframes, significant enough to clearly determine which features are core MVP and which are stretch goals
- Be deployed online so its accessible publicly (using Heroku)

<br>

## Technologies Used:

### Back-end tech:

- Python
- Flask
- Marshmallow
- SQL Alchemy
- JSON Web Token
- Bcrypt
- PostgreSQL
- TablePlus

### Front-end tech:

- HTML
- CSS
- Bootstrap
- Bulma
- JavaScript
- React (with hooks)
- Axios
- Material UI

### Development Tools:

- VS Code
- Git
- GitHub
- Insomnia

<br>

## The Approach

### Planning:

Once the concept for the application and our choice of API were finalised, the emphasis was placed on ensuring that the model design was robust. The motivation behind this was to avoid major code refactoring and debugging further down the line, and to have the desired full functionality across the store. 

Our key considerations were:
- What SQL tables/models were necessary
- In some scenarios, whether an outright table or a table column would be optimal
- What table relationships to create
- What the MVP and stretch goals for the project were <!-- (via User Stories) -->
- What pages were needed on the frontend, and how they would interact with the API

Our model-centric planning process came at the detriment of other apsects of the app (which will be expanded on througout the document) but overall, set a solid foundation for us to proceed.

Quick DBD was used to create the entity relationship diagrams, graphically describing the relationships between the models:

![Relationship-Diagrams](./resources/screenshots/entity_relationship_diagram.png)

This is the final design that waa settled on, following several iterations.

### Back-end:

#### Models

As referenced in the planning section, the complexity of the relationships between our models meant that a lot of time was dedicated towards their design. This paid dividends when it came to the actual writing of the code as the desired output was achieved.

Models were created for:
- Customers
- Orders
- Products
- Reviews

The build of the relevent tables was relatively simple. This was verified, using TablePlus to ensure the expected columns were produced.

```py
class CustomerModel(db.Model, BaseModel):

  __tablename__ = "customers"

  username = db.Column(db.String(200), nullable=False)
  email = db.Column(db.String(200), nullable=False, unique=True)
  password_hash = db.Column(db.String(200), nullable=False)
```

The models were first created in Flask, before being converted to PostgreSQL using SQLAlechemy.

Each column witin the table  corresponds to a line of code within the "CustomerModel" class. 

![TablePlus](./resources/screenshots/tableplus.png)

The "id", "created_at" and "updated_at" columns, originate from the BaseModel, passed in as an arguement to the class, prior to the extension with the custom fields that were added. This was carried out for all of models used in the app.

```py
class BaseModel: 

  id = db.Column(db.Integer, primary_key=True)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.utcnow)
```

The complexity kicked in when it came to desiging the relationships. We designed the following for the stated reasons;

**Many to Many (M-M)** 
- Order & Products <br> - When a customer checks out (places an order), they are able to buy many items (prodcuts) at a time, whether they be a variety of different products or a bulk buy of the same product. <br> - Provided there is enough stock, products are able to be purchased as part of many different orders. <br>

- Customers & Products <br> - A customer should be able to save more than one item to their favourites/wishlist <br> - Popular items should be able to the the favourties/wish lists of more than one custonmer

**One to Many (1-M)** 
- Products to Reviews - A product in the store can have many customer reviews.
- Customers to Orders - A customer is able to return and place another order.
- Customers to Reviews - Assuming a customer buys more than one product, they are able to leave reviews for each of those prodcuts.

The M-M relation relationships the products shared with the order and customer models meant that join tables were needed. <br>
Here is an extract of the order-product join:

```py
from app import db

orders_products_join = db.Table('orders_products',
  db.Column('order_id', db.Integer, db.ForeignKey('orders.id'), primary_key=True),
  db.Column('product_id', db.Integer, db.ForeignKey('products.id'), primary_key=True)
```

It's purpose was to act as a standalone table that stored a record for each of the combinations between the counterpart tables, as a row. (READ NOTES AND ELABORATE ON WHY MORE EXPLICITYLY!!!) The simplistic appearance of this two liner can be decieving as a lot of prior code and rationale was required for this to function.

Within the order model, the product model and the order-product join were imported. It was vital that these imports was carried out in only one of the counterparts, and not both (READ NOTES AND EXPLICTY ELABORATE ON WHY!!!)


```py
from app import db
from models.base import BaseModel
from models.product import ProductModel
from models.order_product import orders_products_join
from models.customer import CustomerModel

class OrderModel(db.Model, BaseModel):

  __tablename__ = 'orders'

  total_amount = db.Column(db.Float, nullable=True)
  order_status = db.Column(db.String(20), nullable=False)
  current_order = db.Column(db.Boolean, nullable=True)

  customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'), nullable=True)  
  customer = db.relationship('CustomerModel', backref='orders')

  products = db.relationship('ProductModel', secondary=orders_products_join, backref='orders')
```
*The code referencing the relationship can be found within the bottom line of the class.*

I chose the order model as it possessed only one M-M relationship, whereas the product model had two. This choice made our code simpler and easier to read, however it would have worked either way. For this same reason, the imports were carried out in the customer model for the customer-product M-M relationship.

Within the same model, reference to the 1-M relationship between customers and orders can be found. This was enabled by adding a the customer ID number as a foreign key to the table and coding the relaitonship just beneath.

#### Serializers



#### Controllers

### Front-end:

#### Home Page

#### My Cart

#### My Account Page

<br>

## Triumphs


<br>

## Obstacles Faced and Lessons

<br>

## Future Features