from rest_framework import serializers
from .models import Field


# The below cass convert the objects into data types understandable by javascript and front-end frameworks
class Fieldserializer(serializers.ModelSerializer):
    class Meta:
        model = Field 
        fields = ('id','url') 
