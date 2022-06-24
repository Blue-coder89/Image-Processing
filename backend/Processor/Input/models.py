from django.db import models

# Create your models here.
class Field(models.Model):
    url = models.CharField(max_length=500)

def _str_(*args): # The display name of the instance will be 'url' now and this is possible beacuse of this method
    return 'url'