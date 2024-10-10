# Django Rest framework
from rest_framework import viewsets, filters

# Permissions
from rest_framework.permissions import (
    IsAuthenticated,
)

# Models
from muni.models import Suggestion

# Serializers
from muni.serializers import SuggestionModelSerializer


class SuggestionViewSet(viewsets.ModelViewSet):
    queryset = Suggestion.objects.filter(active=True)
    serializer_class = SuggestionModelSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['-created']

    def get_permissions(self):
        permissions = []
        if self.action not in ['create']:
            permissions = [IsAuthenticated]
        return [p() for p in permissions]

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
