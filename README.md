# Rainforest E-Store (SEI Project 4)

![GA Logo](./resources/screenshots/GALogo.png)

## Project Overview

The Rainforest E-Store is a full-stack application where customers can complete their online shopping through a clean and user friendly interface. It was built using Python Flask for the back-end, a postgreSQL relational databse and a React front-end. 

The concept was inspired by the growing trend of retail businesses imptoving their online presence, and presented a considerable increase in complexity in comparison to the projects covered within our classwor.

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

Once the concept for the application and our choice of API were finalised, the emphasis was placed on ensuring that our model design was robust. The motivation behind this was to avoid major code refactoring and debugging further down the line, and to have the desired full functionality across the store. 

Our key considerations were:
- What SQL tables/models were necessary
- In some scenarios, whether an outright table or a table column would be optimal
- What table relationships to create
- What the MVP and stretch goals for the project were (via User Stories)
- What pages were needed on the frontend, and how they would interact with the API

Our hevaily model-centric planning process came at the detriment of other apsects of the app (which will be expanded on througout the document) but overall, set a solid foundation for us to proceed.

Quick DBD was used to create the entity relationship diagrams, to graphically describe the relationships between the models:

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

Each line of code, corresponds to a column in the table.

![TablePlus](./resources/screenshots/tableplus.png)

The "id", "created_at" and "updated_at" columns, originate from the BaseModel, passed in as an arguement to the class, therefore extending it.

```py
class BaseModel: 

  id = db.Column(db.Integer, primary_key=True)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.utcnow)
```

The base model passed as an earguement, and was extended by every model used in the app.

The complexity kicked in when it came to desiging the relationships. We used the following in these contexts:

- **Many to Many** - 
- **One to Many** - 


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