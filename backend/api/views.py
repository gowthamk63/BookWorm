from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework import viewsets, status
from rest_framework.response import Response

User = get_user_model()

from .serializers import UserCreateSerializer, BooksSerializer
from .models import Book

class UserCreateAPIView(CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserCreateSerializer
    queryset = User.objects.all()

class BooksAPIView(viewsets.ModelViewSet):

    def list(self, request, *args, **kwargs):
        serializer = BooksSerializer
        queryset= Book.objects.all()
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer= BooksSerializer(Book(user=self.request.user), data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_queryset(self):
        return self.request.Book.filter(user=self.request.user)
