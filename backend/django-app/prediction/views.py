import numpy as np
import pandas as pd
from django.shortcuts import render
from PIL import Image
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from prediction.apps import PredictionConfig
from prediction.serializers import ImageSerializer
from prediction.models import ImageModel
from rest_framework.parsers import MultiPartParser, FormParser


class ImageUpload(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]


    #TODO add a check to make sure user is valid since we set blank=True to the model
    def post(self, request, format=None):
        print(request.user.id)
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(creator=request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        images = ImageModel.objects.filter(creator=request.user)
        images = images.values()
        return Response(images, status=status.HTTP_200_OK)

    def delete(self, request):
        pass

    def put(self, request):
        print(request.data)
        loaded_mlmodel = PredictionConfig.mlmodel 
        with Image.open(request.data.image_url) as im:
            resizedImage = im.resize((32,32))
            pixel_array = np.array(resizedImage)
            y_pred = loaded_mlmodel.predict(pixel_array)
            #y_pred = pd.Series(y_pred)
            target_array = ['airplane', 'automobile', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck']
            prediction = target_array[y_pred.index(1)]

