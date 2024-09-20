# Django Rest framework
import datetime
from django.db.models import Q

from rest_framework import viewsets
from rest_framework.decorators import action

# Permissions
from rest_framework.permissions import (
    IsAuthenticated,
)
from rest_framework.response import Response

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
        permissions = []
        if self.action not in ['public_posts', 'public_detail']:
            permissions = [IsAuthenticated]
        return [p() for p in permissions]

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()

    def get_queryset(self):
        queryset = super().get_queryset()

        if self.action in ['public_posts', 'public_detail']:
            queryset = queryset.filter(
                (Q(expiration_date=None) | Q(expiration_date__gt=datetime.date.today())),
                publication_date__lte=datetime.date.today())

        return queryset

    @action(detail=False, methods=['get'])
    def public_posts(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @action(detail=True, methods=['get'])
    def public_detail(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
