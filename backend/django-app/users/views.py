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


# Create your views here.
class APILogoutView(LogoutView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class APILoginView(LoginView):
    pass

class APIPasswordUpdateView(PasswordChangeView):
    authentication_classes = [TokenAuthentication]


class APISignupView(APIView):

    @csrf_exempt
    def post(self, request):
        user = User.objects.create_user(username=request.get('username'),
                                        firstname=request.get('firstname'),
                                        lastname=request.get('lastname'),
                                        password=request.get('password'),
                                        email=request.get('email'))
        return Response(user, status=status.HTTP_200_OK)