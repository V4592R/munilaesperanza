""" Users views """

# Django REST Framework
from rest_framework import status, viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response

# Permissions
from rest_framework.permissions import (
    IsAuthenticated,
    IsAdminUser,
)

# Models
from users.models import (
    User,
)

# Serializers
from users.serializers import (
    UserLoginSerializer,
    UserModelSerializer,
    UserSignUpModelSerializer,
    ChangeUserPasswordSerializer,
)


class UserViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    queryset = User.objects.filter(active=True)
    serializer_class = UserModelSerializer

    def get_permissions(self):
        """ Assign permissions based on action """
        permissions = []
        if self.action in ['login']:
            permissions = []
        else:
            permissions += [IsAuthenticated]

        return [p() for p in permissions]

    # TODO: Check for permissions

    @action(detail=False, methods=['post'])
    def login(self, request, *args, **kwargs):
        """ User login """
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user, token = serializer.save()
        user_data = UserModelSerializer(user).data
        data = user_data
        data['token'] = token

        return Response(data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def reset_password(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = ChangeUserPasswordSerializer(data=request.data)
        serializer.context['request'] = request
        serializer.context['user'] = user
        serializer.is_valid(raise_exception=True)
        data = serializer.save()
        return Response(data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def signup(self, request, *args, **kwargs):
        serializer = UserSignUpModelSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({"username": user.username, "password": serializer.context['raw_password']},
                        status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.is_staff:
            return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.active = False
        instance.save()
