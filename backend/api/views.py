from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework import viewsets, status
from rest_framework.response import Response

User = get_user_model()

from .serializers import UserCreateSerializer, BooksSerializer

class UserCreateAPIView(CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserCreateSerializer
    queryset = User.objects.all()

class BooksAPIView(viewsets.ModelViewSet):
    def list(self, request, *args, **kwargs):
        serializer = BooksSerializer
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer= BooksSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get_queryset(self):
        return self.request.user.accounts.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)