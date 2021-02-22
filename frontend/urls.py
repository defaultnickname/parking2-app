from django.urls import path
from . import views
from django.conf.urls import url

urlpatterns = [

    path('', views.index),
    path('register/', views.index),
    path('login/', views.index),
    path('profile/', views.index),

]
