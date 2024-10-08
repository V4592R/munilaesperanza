""" Users urls """

# Django
from django.urls import path, include

# Django REST framework
from rest_framework.routers import DefaultRouter

# Views
from muni.views import CategoryViewSet, PublicationViewSet, ServiceViewSet

router = DefaultRouter()
router.register('categories', CategoryViewSet, basename='category')
router.register('publications', PublicationViewSet, basename='publication')
router.register('services', ServiceViewSet, basename='service')
router.register('requirements', ServiceViewSet, basename='requirement')


urlpatterns = [
    path('', include(router.urls))
]
