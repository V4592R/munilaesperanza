# Django REST Framework
from rest_framework import serializers

# Models
from muni.models import Publication
from muni.serializers import CategoryModelSerializer


class PublicationModelSerializer(serializers.ModelSerializer):
    categories = CategoryModelSerializer(many=True, read_only=True)

    class Meta:
        model = Publication
        fields = '__all__'
        read_only_fields = ['user']


class PublicationCreateModelSerializer(serializers.ModelSerializer):
    categories = CategoryModelSerializer(many=True, read_only=True)

    class Meta:
        model = Publication
        fields = [
            'title',
            'content',
            'publication_date',
            'expiration_date',
            'categories',
        ]

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return super().create(validated_data)


