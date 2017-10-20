from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

User = get_user_model()

from .serializers import UserCreateSerializer, BooksSerializer
from .models import Book
from .permissions import IsOwnerOrReadOnly

class UserCreateAPIView(CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserCreateSerializer
    queryset = User.objects.all()

class BooksMixin(object):
    serializer_class = BooksSerializer
    permission_classes = (IsOwnerOrReadOnly,)

class BooksAPIView(BooksMixin, viewsets.ModelViewSet):
    def get_queryset(self):
        user=self.request.user
        return Book.objects.filter(user=user)

    def create(self, request, *args, **kwargs):
        data=request.data.copy()
        data['user']= [request.user.id]
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)