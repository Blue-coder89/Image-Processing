from urllib.error import HTTPError
from rest_framework import serializers
from .models import Field
from PIL import Image,UnidentifiedImageError,ImageEnhance
import urllib.request
from urllib.error import URLError


# The below cass convert the objects into data types understandable by javascript and front-end frameworks
class Fieldserializer(serializers.ModelSerializer):
    class Meta:
        model = Field 
        fields = ('id','url') 

class testFieldserializer(serializers.Serializer):
    url = serializers.CharField(max_length = 500)
    requestType = serializers.CharField(max_length = 20)
    thresholdvalue = serializers.IntegerField()
    relativebrightness = serializers.DecimalField(max_digits=2,decimal_places=1)

    def blackAndWhite(self,im): # returns the black and white form of the image
        x,y = im.size 
        for i in range(x):
            for j in range(y):
                pixel = im.getpixel((i,j)) # read pixel
                x = (pixel[0] + pixel[1]+ pixel[2])//3
                newPixel = (x,x,x) # updates it
                im.putpixel((i,j),newPixel) # write pixel
        return im
    def negative(self,im): # returns the black and white form of the image
        x,y = im.size 
        for i in range(x):
            for j in range(y):
                pixel = im.getpixel((i,j)) # read pixel
                x = 255 - (pixel[0] + pixel[1]+ pixel[2])//3
                newPixel = (x,x,x) # updates it
                im.putpixel((i,j),newPixel) # write pixel
        return im

    def checkEqual(self,im1,im2): # to check whether two images are equal or not
        if(im1 == im2): return True
        else: return False 




    def threshold(self,im,threshold): # threshold operation
       x,y = im.size 
       for i in range(x):
        for j in range(y):
            pixel = im.getpixel((i,j))
            if (pixel[0] + pixel[1] + pixel[2])/3 > threshold:
                im.putpixel((i,j),(255,255,255))
            else : im.putpixel((i,j),(0,0,0))
       return im

    def create(self,validate_data): # for creating new data during post method
        return Field.objects.create(**validate_data)
    
    def update(self,instance,validate_data): # for updaing data
        instance.url = validate_data.get('url',instance.url) # this is a simple python dictionary method
        instance.requestType = validate_data.get('requestType',instance.requestType) # this is a simple python dictionary method
        instance.relativebrightness = validate_data.get('relativebrightness',instance.relativebrightness) # this is a simple python dictionary method
        instance.thresholdvalue = validate_data.get('thresholdvalue',instance.thresholdvalue) # this is a simple python dictionary method
        # it gets the value of url key if exists otherwise return the second parameter
        instance.save()
        return instance

    def validate(self,data): # this function calls image processing functions
        url = data.get('url')
        request = data.get('requestType')
        thresholdvalue = data.get('thresholdvalue')
        relativebrightness = data.get('relativebrightness')
        ret = request.upper()
        if ret == "OPEN":
            try:
                urllib.request.urlretrieve(url, "../../frontend/src/Images/OriginalImage.jpg")
            except FileNotFoundError as e:
                raise serializers.ValidationError({'error':e})
            except ValueError as e:
                raise serializers.ValidationError({'error':e})
            except UnidentifiedImageError as e:
                raise serializers.ValidationError({'error':e})
            except HTTPError as e: 
                raise serializers.ValidationError({'error':e})
            except URLError as e: 
                raise serializers.ValidationError({'error':e})
            OriginalImage = Image.open("../../frontend/src/Images/OriginalImage.jpg")
            newSize1 = (998,int(998/OriginalImage.width*OriginalImage.height))
            newSize2 = (int(612/OriginalImage.height*OriginalImage.width),612)
            newsize = ()
            if newSize1[1] > 612:
                newSize = newSize2
            else : newSize = newSize1 
            OriginalImage = OriginalImage.resize(newSize,Image.ANTIALIAS)
            OriginalImage.save("../../frontend/src/Images/OriginalImage.jpg")
            OriginalImage.save("../../frontend/src/Images/ProcessedImage.jpg")
        elif ret == "RESET":
            OriginalImage = Image.open("../../frontend/src/Images/OriginalImage.jpg")
            OriginalImage.save("../../frontend/src/Images/ProcessedImage.jpg")
        elif ret == "BLACK AND WHITE":
            ProcessedImage = Image.open("../../frontend/src/Images/ProcessedImage.jpg")
            ProcessedImage = self.blackAndWhite(ProcessedImage)
            ProcessedImage.save("../../frontend/src/Images/ProcessedImage.jpg")
        elif ret == "NEGATIVE":
            ProcessedImage = Image.open("../../frontend/src/Images/ProcessedImage.jpg")
            ProcessedImage = self.negative(ProcessedImage)
            ProcessedImage.save("../../frontend/src/Images/ProcessedImage.jpg")
        elif ret == "THRESHOLD":
            ProcessedImage = Image.open("../../frontend/src/Images/ProcessedImage.jpg")
            ProcessedImage = self.threshold(ProcessedImage,thresholdvalue)
            ProcessedImage.save("../../frontend/src/Images/ProcessedImage.jpg")
        elif ret == "BRIGHTNESS CONTROL":
            ProcessedImage = Image.open("../../frontend/src/Images/ProcessedImage.jpg")
            enhancer = ImageEnhance.Brightness(ProcessedImage)
            ProcessedImage = enhancer.enhance(relativebrightness)
            ProcessedImage.save("../../frontend/src/Images/ProcessedImage.jpg")
        elif ret == "CHECK EQUAL": 
            ProcessedImage = Image.open("../../frontend/src/Images/ProcessedImage.jpg")
            OriginalImage = Image.open("../../frontend/src/Images/OriginalImage.jpg")
            raise serializers.ValidationError({'status':self.checkEqual(ProcessedImage,OriginalImage)})
        return data
