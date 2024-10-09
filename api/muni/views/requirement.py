# Django Rest framework
from django.utils.timezone import override
from rest_framework import viewsets

# Permissions
from rest_framework.permissions import (
    IsAuthenticated,
)

# Models
from muni.models import Requirement

# Serializers
from muni.serializers import RequirementModelSerializer

# Filters
from rest_framework import filters


class RequirementViewSet(viewsets.ModelViewSet):
    queryset = Requirement.objects.filter(active=True)
    serializer_class = RequirementModelSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['description',]

    def get_permissions(self):
        permissions = []
        if self.action not in ['list', 'retrieve']:
            permissions = [IsAuthenticated]
        return [p() for p in permissions]

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
