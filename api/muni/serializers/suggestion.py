# Django REST Framework
import requests
from rest_framework import serializers
from django.conf import settings

# Models
from muni.models import Suggestion


class SuggestionModelSerializer(serializers.ModelSerializer):
    captchaToken = serializers.CharField(read_only=True)
    class Meta:
        model = Suggestion
        fields = '__all__'

    def create(self, validated_data):
        captcha_token = self.initial_data.get('captchaToken', '')
        captcha_key = settings.CAPTCHA_SECRET_KEY_V2
        captcha_url = 'https://www.google.com/recaptcha/api/siteverify'
        data = {
            'secret': captcha_key,
            'response': captcha_token
        }
        try:
            captcha_response = requests.post(captcha_url, data=data)
            captcha_response_data = captcha_response.json()

            if not captcha_response_data.get('success', False):
                raise serializers.ValidationError('Captcha failed response')

            return super().create(validated_data)
        except:
            raise serializers.ValidationError('Captcha failed')
