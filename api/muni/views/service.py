# Django Rest framework
from rest_framework import viewsets

# Permissions
from rest_framework.permissions import (
    IsAuthenticated,
)

# Models
from muni.models import Service

# Serializers
from muni.serializers import ServiceModelSerializer, ServiceCreateModelSerializer


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.filter(active=True)

    def get_serializer_class(self):
        if self.action == 'create':
            return ServiceCreateModelSerializer
        return ServiceModelSerializer

    def get_permissions(self):
        permissions = []
        if self.action not in ['list', 'retrieve']:
            permissions = [IsAuthenticated]
        return [p() for p in permissions]

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
