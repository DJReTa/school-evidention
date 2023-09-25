from .models import User
import json

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
    User.objects.fetchUserWithPassword(data.get("username"), data.get("password"))
    

    