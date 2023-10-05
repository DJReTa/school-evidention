import json

from rest_framework_simplejwt.tokens import AccessToken

from .models import User


def getUsers():
    users = User.objects.getUsers()
    return json.dumps(list(users))

def registerUser(data):
    username = data.get("username")
    email = data.get("email")

    if User.objects.isUsernameTaken(username):
        raise ValueError("Username is already taken")
    if User.objects.isEmailTaken(email):
        raise ValueError("Email is already taken")

    user = User(**data)
    user.saveWithHashedPassword()

def loginUser(data):   
    user = User.objects.fetchUserWithPassword(data.get("username"), data.get("password"))
    access_token = AccessToken.for_user(user)
    access_token['status'] = user.status_display
    access_token['fullName'] = f'{user.name} {user.surname}'
    return access_token    

def authorizeUser(token):
    return {'fullName': token['fullName'], 'status': token['status'], 'username': token['username']}
    

    