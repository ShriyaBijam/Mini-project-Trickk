from django.urls import path
from . import views

urlpatterns = [
    path('api/decrypt/', views.DecryptImageListCreate.as_view() ),
]