from django.contrib.auth.hashers import check_password, make_password
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.db import models

# Create your models here.

class UserManager(models.Manager):
    def isUsernameTaken(self, username):
        return self.filter(username=username).exists()
    
    def isEmailTaken(self, email):
        return self.filter(email=email).exists()
    
    def getUsers(self):
        return self.values("name", "surname", "username", "email", "image", "status", "password")
    
    def fetchUserWithPassword(self, username, password):
        user = self.get(username=username)
        if not check_password(password, user.password):
            raise ValidationError("Incorrect credentials!")
        return user

USER_STATUS_CHOICES = [
        ("active", "Active"),
        ("sick", "Sick"),
        ("on_vacation", "On Vacation"),
        ("away", "Away"),
        ("offline", "Offline")
    ]   

class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    image = models.ImageField(upload_to='profile_pics/', null=True)
    status = models.CharField(max_length=20, choices=USER_STATUS_CHOICES, default="active")

    objects = UserManager()

    USERNAME_FIELD = "username"

    def saveWithHashedPassword(self):
        password = self.password
        self.password = make_password(password)
        self.save()

    @property
    def status_display(self):
        for value, display_text in USER_STATUS_CHOICES:
            if value == self.status:
                return display_text
        return "Unknown"