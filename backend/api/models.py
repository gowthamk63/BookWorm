from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    def __str__(self):
        return self.username

class Book(models.Model):
    user = models.ManyToManyField('User')
    name = models.CharField(max_length=200)
    book_id = models.CharField(primary_key=True, max_length=50)

    def __str__(self):
        return self.book_id

