from django.shortcuts import render
from .serializer import Fieldserializer
from rest_framework import viewsets
from .models import Field
# Create your views here.

class Fieldview(viewsets.ModelViewSet):
    
    serializer_class = Fieldserializer
    queryset = Field.objects.all()

