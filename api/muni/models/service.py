# Django
from django.db import models

# Utils
from utils.models import BaseModel

class Service(BaseModel):
    title = models.CharField(max_length=100, null=False)
    description = models.CharField(max_length=300)
    creator = models.ForeignKey('users.User', related_name='services', on_delete=models.SET_NULL, null=True)
    requirements = models.ManyToManyField('muni.Requirement', related_name='services', blank=True)
