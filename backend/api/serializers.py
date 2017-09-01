from django.contrib.auth import get_user_model

from rest_framework.serializers import ModelSerializer,EmailField, ValidationError
from .models import Book

User= get_user_model()

class UserCreateSerializer(ModelSerializer):
    class Meta:
        model= User
        fields= [
            'username',
            # 'firstName',
            # 'lastName',
            'email',
            'password',
        ]
        extra_kwargs={"password":
                          {"write_only":True}}


    def create(self, validated_data):
        print(validated_data)

        username= validated_data['username']
        # firstName= validated_data['firstName']
        # lastName= validated_data['lastName']
        email=validated_data['email']
        password=validated_data['password']

        user_obj=User(
            username=username,
            email=email,
            # firstName=firstName,
            # lastName=lastName
        )
        user_obj.set_password(password)
        user_obj.save()
        return user_obj

class BooksSerializer(ModelSerializer):
    user = UserCreateSerializer(read_only=True)
    class Meta:
        model=Book
        fields=['user','book_id']

