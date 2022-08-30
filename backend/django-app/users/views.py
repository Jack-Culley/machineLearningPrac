from django.shortcuts import render
from rest_auth.views import (LoginView, LogoutView)
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_auth.views import PasswordChangeView
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from users.serializers import UserSerializer


# Create your views here.
class APILogoutView(LogoutView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class APILoginView(LoginView):
    pass

class APIPasswordUpdateView(PasswordChangeView):
    authentication_classes = [TokenAuthentication]


class APISignupView(APIView):

    def post(self, request):
        user = User.objects.create_user(username=request.data.get('username'),
                                        first_name=request.data.get('firstname'),
                                        last_name=request.data.get('lastname'),
                                        password=request.data.get('password'),
                                        email=request.data.get('email'))
        return Response(None, status=status.HTTP_200_OK)