# Django
from django.db import models

# Utils
from utils.models import BaseModel


class Category(BaseModel):
    name = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return self.name
