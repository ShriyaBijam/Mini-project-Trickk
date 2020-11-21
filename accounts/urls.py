from django.urls import path
from . import views
from knox.views import LogoutView

urlpatterns = [
    path('register/', views.RegistrationAPI.as_view()),
    path('login/', views.LoginAPI.as_view()),
    path('user/', views.UserAPIView.as_view()),
    path('logout/', LogoutView.as_view(), name='knox_logout')
]