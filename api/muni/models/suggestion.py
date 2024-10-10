# Django
from django.db import models

# Utils
from utils.models import BaseModel
from utils.validators import phone_regex_validator

class Suggestion(BaseModel):
    last_name = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=15, validators=[phone_regex_validator()])
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    content = models.TextField()