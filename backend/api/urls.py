from django.conf.urls import url
from api.views import UserCreateAPIView, BooksAPIView
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    url(r'^register/$', UserCreateAPIView.as_view(),name="register"),
    url(r'^login', obtain_jwt_token),
    url(r'^addBook',BooksAPIView.as_view({'get':'list','post':'create'}))
]
