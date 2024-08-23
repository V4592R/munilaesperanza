""" Data validators """

# Django
from django.core.validators import RegexValidator


def dpi_regex_validator():
    dpi_regex = RegexValidator(
        regex=r'[1-9][0-9]{12}$',
        message="El DPI debe tener 13 dígitos"
    )
    return dpi_regex


def nit_regex_validator():
    nit_regex = RegexValidator(
        regex=r'[1-9][0-9]{8}$',
        message="El Nit debe tener 9"
    )
    return nit_regex


def username_regex_validator():
    username_regex = RegexValidator(
        regex=r'[a-zA-Z][a-zA-Z0-9]{4,12}$',
        message="Entre 5 y 12 caracteres iniciando con una letra"
    )
    return username_regex


def phone_regex_validator():
    phone_regex = RegexValidator(
        regex=r'\+?1?\d{8,15}$',
        message="Mínimo 8 dígitos para el número de teléfono"
    )
    return phone_regex
