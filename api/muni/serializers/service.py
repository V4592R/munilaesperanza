# Django REST Framework
from rest_framework import serializers

# Models
from muni.models import Service
from muni.serializers.requirement import RequirementModelSerializer


class ServiceModelSerializer(serializers.ModelSerializer):
    requirements = RequirementModelSerializer(many=True, read_only=True)

    class Meta:
        model = Service
        fields = '__all__'
        read_only_fields = ['creator']


class ServiceCreateModelSerializer(serializers.ModelSerializer):
    requirements = RequirementModelSerializer(many=True, read_only=True)

    class Meta:
        model = Service
        fields = [
            'title',
            'description',
            'requirements',
        ]

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['creator'] = user
        return super().create(validated_data)
