from curses.ascii import HT
import imp
import json
from .serializer import Fieldserializer,testFieldserializer
from rest_framework import viewsets
from rest_framework.parsers import JSONParser
from .models import Field
from rest_framework.renderers import JSONRenderer
from django.http import Http404, HttpResponse, JsonResponse
import io
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework import status
# Create your views here.

class Fieldview(viewsets.ModelViewSet):    
    serializer_class = Fieldserializer
    queryset = Field.objects.all()




@csrf_exempt # function based view
def API(request,pk = None):
    if request.method == 'POST':
        json_data = request.body # data received from the client in the form of json
        stream = io.BytesIO(json_data)
        pythondata = JSONParser().parse(stream) # converting the data in JSON to pythondata
        serializer = Fieldserializer(data = pythondata) # converting python data to the data that is storable in the database
        if serializer.is_valid(): 
            serializer.save() # saving the data in the database
            res = {'msg':'data created'}
            json_data = JSONRenderer().render(res)
            print(json_data)
            return HttpResponse(json_data,content_type= 'application/json')
        json_data = JSONRenderer().render(serializer.errors)
        return HttpResponse(json_data,content_type= 'application/json')
    if request.method == 'GET': # This part will be called whenever the corresponding url (as in urls.py) is requested either by me directly or by any other application
    # pk will be a number given as the argument in the request
        if pk is not None:
            try:
                d = Field.objects.get(id = pk) # getting the data from the database
            except:
                json_data = JSONRenderer().render({'error':"Not found in database"})
                return HttpResponse(json_data,content_type= 'application/json')
            else:
                serializer = testFieldserializer(d) # got the data in python object
                json_data = JSONRenderer().render(serializer.data) # converted it to json so that it can be understood by frontend
                return HttpResponse(json_data,content_type='application/json') 
        else : 
            d = Field.objects.all()
            serializer = testFieldserializer(d,many=True) # got the data in python object
            json_data = JSONRenderer().render(serializer.data) # converted it to json so that it can be understood by frontend
            return HttpResponse(json_data,content_type='application/json') 
        # print(serializer.data)


class APIVIEW(APIView): # class based view of the above function based view

    def getData(self,pk):
        try:
            return Field.objects.get(id = pk)
        except Field.DoesNotExist:
            raise Http404

    def get(self,request,pk = None,*args,**kwargs):
        if pk is not None:
            data = self.getData(pk)
            serializer = testFieldserializer(data)
            json_data = JSONRenderer().render(serializer.data)
            return HttpResponse(json_data,content_type='application/json')    
        data = Field.objects.all()
        serializer = testFieldserializer(data,many = True)
        json_data = JSONRenderer().render(serializer.data)
        return HttpResponse(json_data,content_type='application/json')

    def post(self,request,*args,**kwargs):
        json_data = request.body
        stream = io.BytesIO(json_data)
        pythondata = JSONParser().parse(stream)
        serializer = testFieldserializer(data = pythondata)
        if serializer.is_valid():
            serializer.save() # we can give the argument id in order to make a new data at a particular id
            res = {'msg':'data created'}
            json_data = JSONRenderer().render(res)
            return HttpResponse(json_data,content_type = 'application/json')
        json_data = JSONRenderer().render(serializer.errors)
        return HttpResponse(json_data,content_type = 'application/json')

    def put(self,request,pk = None,*args,**kwargs):
        d = self.getData(pk)
        
        serializer = testFieldserializer(d,data = request.data)
        if serializer.is_valid():
            serializer.save()
            json_data = JSONRenderer().render(serializer.data)
            return HttpResponse(json_data,content_type = 'application/json')
        json_data = JSONRenderer().render(serializer.errors)
        return HttpResponse(json_data,content_type = 'applications/json')

