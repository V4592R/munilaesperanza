# Django REST Framework
from rest_framework import serializers

# Models
from muni.models import Requirement


class RequirementModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requirement
        fields = '__all__'
