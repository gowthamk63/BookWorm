from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

class Book(models.Model):
    user= models.ForeignKey('User')
    book_id= models.CharField(max_length=50)

    def __str__(self):
        return self.book_id

