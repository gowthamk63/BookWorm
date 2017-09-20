from django.conf.urls import url,include
from api.views import UserCreateAPIView, BooksAPIView
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'books', BooksAPIView, base_name='book')

urlpatterns = [
    url(r'^register/$', UserCreateAPIView.as_view(),name="register"),
    url(r'^login$', obtain_jwt_token),
    url(r'^', include(router.urls))

]


