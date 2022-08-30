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
from django.core.files.storage import default_storage

class ImageUpload(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]


    #TODO add a check to make sure user is valid since we set blank=True to the model
    def post(self, request, format=None):
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            loaded_mlmodel = PredictionConfig.mlmodel 
            print(request.data.get('title')[-3:])
            if request.data.get('title')[-3:] == 'png':
                png = Image.open(request.data.get('image_url'))
                png.load()

                background = Image.new("RGB", png.size, (255, 255, 255))
                background.paste(png, mask=png.split()[3]) # 3 is the alpha channel
                url = request.data.get('title').replace('png', 'jpg')
                background.save(url, 'JPEG', quality=100)
            else:
                url = request.data.get('image_url')
            with Image.open(url) as im:
                resizedImage = im.resize((32,32))
                pixel_array = np.array(resizedImage)
                pixel_array = np.expand_dims(pixel_array, axis=0)
                y_pred = loaded_mlmodel.predict(pixel_array)
                print(y_pred)
                y_pred = np.rint(y_pred)
                print(np.where(y_pred == 1.))
                target_array = ['airplane', 'automobile', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck']
                prediction = target_array[np.where(y_pred == 1.)[1][0]]
                serializer.save(creator=request.user, pred_label=prediction)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        images = ImageModel.objects.filter(creator=request.user)
        images = images.values()
        return Response(images, status=status.HTTP_200_OK)

    def delete(self, request):
        print(request.data)
        url = request.data.get('image_url')
        obj = ImageModel.objects.filter(creator=request.user, image_url=url).delete()
        default_storage.delete(f'/home/jackculley/VSCode/machineLearningPrac/backend/django-app/static/images/{url}')
        return Response(obj, status=status.HTTP_200_OK)
        

    def put(self, request):
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

