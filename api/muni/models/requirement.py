# Django
from django.db import models

# Utils
from utils.models import BaseModel

class Requirement(BaseModel):
    description = models.CharField(max_length=300)
