from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("register", views.register, name="register"),
    path("login", views.login, name="login"),
    path("authorize", views.authorize, name="authorize"),
    path("update/<str:username>", views.update, name="update"),
    path("image", views.profilePicture, name="image")
]
