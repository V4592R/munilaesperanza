# Django Rest framework
from rest_framework import viewsets

# Permissions
from rest_framework.permissions import (
    IsAuthenticated,
)

# Models
from muni.models import Publication

# Serializers
from muni.serializers import PublicationModelSerializer, PublicationCreateModelSerializer


class PublicationViewSet(viewsets.ModelViewSet):
    queryset = Publication.objects.filter(active=True)

    def get_serializer_class(self):
        if self.action == 'create':
            return PublicationCreateModelSerializer
        return PublicationModelSerializer

    def get_permissions(self):
        permissions = [IsAuthenticated]
        return [p() for p in permissions]

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
