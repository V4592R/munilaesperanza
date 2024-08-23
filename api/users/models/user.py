# Django
from django.contrib.auth.models import AbstractUser
from django.db import models

# Utils
from utils.models import BaseModel
from utils.validators import phone_regex_validator, username_regex_validator


class User(BaseModel, AbstractUser):
    username = models.CharField(
        validators=[username_regex_validator()], max_length=13, unique=True,
        error_messages={
            "unique": "Este nombre de usuario está en uso",
        },
    )

    phone_number = models.CharField(
        validators=[phone_regex_validator()], max_length=17, blank=True)

    first_name = models.CharField(
        'first name',
        max_length=50
    )

    middle_name = models.CharField(
        'middle name',
        max_length=50,
        default=''
    )

    last_name = models.CharField(
        'last name',
        max_length=50
    )

    second_surname = models.CharField(
        'second surname',
        max_length=50
    )

    birthday = models.DateField('Birthday')

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['phone_number', 'first_name',
                       'last_name', 'birthday']

    def __str__(self) -> str:
        return f'{self.username} {self.first_name} {self.last_name}'
