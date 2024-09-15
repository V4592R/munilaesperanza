# Django Rest framework
from rest_framework import viewsets

# Permissions
from rest_framework.permissions import (
    IsAuthenticated,
)

# Models
from muni.models import Category

# Serializers
from muni.serializers import CategoryModelSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all(active=True)
    serializer_class = CategoryModelSerializer

    def get_permissions(self):
        permissions = [IsAuthenticated]
        return [p() for p in permissions]

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
