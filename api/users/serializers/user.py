# Django
from django.contrib.auth import authenticate, password_validation

# Django REST Framework
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator

# Models
from users.models import (
    User,
)

from utils.generate_password import generate_user_password
from utils.validators import username_regex_validator


class UserSignUpModelSerializer(serializers.ModelSerializer):
    """ Serializer for User Sign Up """
    username = serializers.CharField(
        validators=[
            username_regex_validator(),
            UniqueValidator(queryset=User.objects.all())
        ]
    )

    class Meta:
        model = User
        fields = [
            'first_name',
            'middle_name',
            'last_name',
            'second_surname',
            'username',
            'birthday',
            'phone_number',
        ]

    def create(self, validated_data):
        password = generate_user_password()
        self.context['raw_password'] = password
        validated_data['password'] = password
        user = User.objects.create_user(**validated_data)
        return user


class ChangeUserPasswordSerializer(serializers.Serializer):
    """ Change User password in extreme case. Use when forget password """

    def validate(self, data):
        """ Validate new password """
        user = self.context['user']
        if user.is_staff:
            raise serializers.ValidationError(
                'No se puede cambiar la contraseña del admin')
        return data

    def create(self, validated_data):
        new_password = generate_user_password()
        user = self.context['user']
        user.set_password(new_password)
        user.save()
        return {"new_password": new_password}


class UserLoginSerializer(serializers.Serializer):
    """ User login model serializer """
    username = serializers.CharField(
        validators=[username_regex_validator()]
    )
    password = serializers.CharField(min_length=5, max_length=64)

    def validate(self, data):
        """ Check credentials and if user changed given password """
        user = authenticate(
            username=data['username'],
            password=data['password']
        )
        if not user:
            raise serializers.ValidationError('Invalid credentials')

        self.context['user'] = user
        return data

    def create(self, validated_data):
        token, created = Token.objects.get_or_create(user=self.context['user'])
        return self.context['user'], token.key


class UserModelSerializer(serializers.ModelSerializer):
    """ User model serializer """

    class Meta:
        model = User
        fields = [
            'id',
            'first_name',
            'last_name',
            'username',
            'birthday',
            'phone_number',
            'is_staff',
            'active',
        ]

        read_only_fields = [
            'is_staff',
        ]
