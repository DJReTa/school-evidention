import json

from django.core.exceptions import ValidationError
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
    user = User.objects.fetchUserWithPassword(
        data.get("username"), data.get("password"))
    access_token = AccessToken.for_user(user)
    return access_token


def authorizeUser(token):
    user = User.objects.get(username=token['username'])
    return {'fullName': f'{user.name} {user.surname}', 'status': user.status_display, 'username': token['username'], 'type': user.type_display}


def updateUser(data, image, username):
    user = None
    user = User.objects.get(username=username)

    user.updateNameAndSurname(data.get("name"), data.get("surname"))

    if data.get("oldPassword"):
        if not user.doesPasswordMatch(data.get("oldPassword")):
            raise ValidationError("Old password does not match!")
        if user.doesPasswordMatch(data.get("password")):
            raise ValidationError(
                "New password can not be same as the old one!")
        user.updatePassword(data.get("password"))

    if image:
        user.updateProfilePicture(image)

    user.save()


def getUserProfileImage(token):
    username = token['username']
    user = User.objects.get(username=username)
    return user.image
