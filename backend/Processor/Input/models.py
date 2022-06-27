from django.db import models

# Create your models here.
class Field(models.Model):
    url = models.CharField(max_length=500) # The same object must be made while designing the form in REACT


    def __str__(self): # The display name of the instance will be 'url' now and this is possible beacuse of this method
        return "Image" + self.id