# Django Rest framework
from rest_framework import viewsets

# Permissions
from rest_framework.permissions import (
    IsAuthenticated,
)

# Models
from muni.models import Requirement

# Serializers
from muni.serializers import RequirementModelSerializer


class RequirementViewSet(viewsets.ModelViewSet):
    queryset = Requirement.objects.filter(active=True)
    serializer_class = RequirementModelSerializer

    def get_permissions(self):
        permissions = []
        if self.action not in ['list', 'retrieve']:
            permissions = [IsAuthenticated]
        return [p() for p in permissions]

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
