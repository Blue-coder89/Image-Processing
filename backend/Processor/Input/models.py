from django.db import models

# Create your models here.
class Field(models.Model):
    url = models.CharField(max_length=500,null=True) # The same object must be made while designing the form in REACT
    requestType = models.CharField(max_length=20,null=True)
    relativebrightness = models.DecimalField(max_digits=2,decimal_places=1,null=True)
    thresholdvalue = models.IntegerField(null = True)

    def __str__(self): # The display name of the instance will be 'url' now and this is possible beacuse of this method
        return "Image" + str(self.id)