from django.urls import path
from . import views

urlpatterns = [
    path('api/encrypt/', views.EncryptImageListCreate.as_view() ),
]