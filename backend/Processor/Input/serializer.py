from urllib.error import HTTPError
from rest_framework import serializers
from .models import Field
from PIL import Image,UnidentifiedImageError
import urllib.request

# The below cass convert the objects into data types understandable by javascript and front-end frameworks
class Fieldserializer(serializers.ModelSerializer):
    class Meta:
        model = Field 
        fields = ('id','url') 

class testFieldserializer(serializers.Serializer):
    url = serializers.CharField(max_length = 500)

    def create(self,validate_data): # for creating new data during post method
        return Field.objects.create(**validate_data)
    
    def update(self,instance,validate_data): # for updaing data
        instance.url = validate_data.get('url',instance.url) # this is a simple python dictionary method
        # it gets the value of url key if exists otherwise return the second parameter
        instance.save()
        return instance

    def validate_url(self,value): # to validate url
        try:
            urllib.request.urlretrieve(value, "Image.jpg")
            Image.open("Image.jpg",mode = 'r',formats=None)
        except:
            raise serializers.ValidationError("Image does not exists")
        return value