from django.shortcuts import render

from django.contrib.auth import get_user_model

from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny


User = get_user_model()

from .serializers import UserCreateSerializer


class UserCreateAPIView(CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserCreateSerializer
    queryset = User.objects.all()






