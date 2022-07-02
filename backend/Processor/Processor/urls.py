"""Processor URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from rest_framework import routers
from Input import views
from Input.views import APIVIEW

router = routers.DefaultRouter()
router.register(r'Input', views.Fieldview, 'Input')

urlpatterns = [
   path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('request_to_api/',APIVIEW.as_view()),
    path('request_to_api/<int:pk>',APIVIEW.as_view()) 
]
