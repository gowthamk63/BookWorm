from django.contrib.auth import get_user_model

from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from .models import Book

User= get_user_model()

class UserCreateSerializer(ModelSerializer):
    class Meta:
        model= User
        fields= [
            'username',
            'first_name',
            'last_name',
            'email',
            'password',
        ]
        extra_kwargs={"password":
                          {"write_only":True}}


    def create(self, validated_data):
        username= validated_data['username']
        first_name= validated_data['first_name']
        last_name= validated_data['last_name']
        email=validated_data['email']
        password=validated_data['password']

        user_obj=User(
            username=username,
            email=email,
            first_name=first_name,
            last_name=last_name
        )
        user_obj.set_password(password)
        user_obj.save()
        return user_obj

class BooksSerializer(ModelSerializer):
    user=PrimaryKeyRelatedField(many=True, queryset=User.objects.all())
    class Meta:
        model=Book
        fields=['user','book_id','name']
