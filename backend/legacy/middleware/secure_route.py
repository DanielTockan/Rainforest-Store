from flask import request, g
import jwt
from models.customer import CustomerModel
from environment.config import secret
from functools import wraps

def secure_route(func):
  @wraps(func)
  def wrapper(*args, **kwargs):

    raw_token = request.headers['Authorization']
    clean_token = raw_token.replace('Bearer ', '')

    try:
      payload = jwt.decode(clean_token, secret)
      customer_id = payload['sub']
      customer = CustomerModel.query.get(customer_id)

      if not customer:
        return { 'message': 'Unauthorised' }, 401

      g.current_user = customer

    except jwt.ExpiredSignatureError:
      return { 'message': 'Token has expired' }, 401

    except Exception as e:
      return { 'message': 'Unauthorised' }, 401


    return func(*args, **kwargs)

  return wrapper