# Django REST Framework
import logging

from rest_framework import serializers

# Models
from muni.models import Service, Requirement
from muni.serializers.requirement import RequirementModelSerializer


class ServiceModelSerializer(serializers.ModelSerializer):
    requirements = RequirementModelSerializer(many=True, read_only=True)

    class Meta:
        model = Service
        fields = '__all__'
        read_only_fields = ['creator',]

    def update(self, instance, validated_data):
        try:
            requirements = self.initial_data['requirements']
            print(requirements)
            requirements_instances = []
            for requirement in requirements:
                requirements_instances.append(Requirement.objects.get(pk=requirement['id']))
            instance.requirements.set(requirements_instances)
        except Exception as e:
            logging.error(e)
        return super().update(instance, validated_data)


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
        requirements = self.initial_data.get('requirements', [])
        requirements_instances = []

        for requirement in requirements:
            try:
                requirements_instances.append(Requirement.objects.get(pk=requirement['id']))
            except Exception as e:
                logging.error(e)

        user = self.context['request'].user
        validated_data['creator'] = user
        instance = super().create(validated_data)
        instance.requirements.set(requirements_instances)
        return instance
