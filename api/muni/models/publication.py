# Django
from django.db import models

# Utils
from utils.models import BaseModel


class Publication(BaseModel):
    title = models.CharField(max_length=100, NULL=False)
    content = models.TextField()
    publication_date = models.DateField()
    expiration_date = models.DateField(NULL=True, DEFAULT=None)
    user = models.ForeignKey('users.User', related_name='publications', on_delete=models.SET_NULL, NULL=True)
    categories = models.ManyToManyField('muni.Category', related_name='publications')
