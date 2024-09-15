# Django REST Framework
from rest_framework import serializers

# Models
from muni.models import Category

class CategoryModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'