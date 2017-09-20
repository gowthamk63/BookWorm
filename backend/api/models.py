from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    def __str__(self):
        return self.username

class Book(models.Model):
    user= models.ManyToManyField('User')
    book_id= models.CharField(primary_key=True, max_length=50)

    def __str__(self):
        return self.book_id

# class Reader(models.Model):
#
#     # STATUS_CHOICES=(('T','toRead'),('R','reading'),('F','finished'))
#     user=models.ForeignKey('User', on_delete=models.CASCADE)
#     book=models.ForeignKey('Book', on_delete=models.CASCADE)
#     # status=models.CharField(max_length=1, choices=STATUS_CHOICES)
#     date_started=models.DateTimeField(auto_now_add=True)
#
#     # class Meta:
#     #     unique_together = ('user', 'book')