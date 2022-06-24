from django.contrib import admin
from .models import Field
# Register your models here.

class FieldAdmin(admin.ModelAdmin):
    list = ('url')

admin.site.register(Field,FieldAdmin) # Registering the model with the admin so that we can manage the records through the admin interface
