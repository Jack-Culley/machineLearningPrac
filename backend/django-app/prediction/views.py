from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from prediction.apps import PredictionConfig
import pandas as pd

from PIL import Image
import numpy as np

# Create your views here.
# Class based view to predict based on IRIS model
class CNN_Predict(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        labels = ['airplane', 'automobile', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck']
        file = request.FILES['image'].name
        with Image.open(file) as im:
            newim = im.resize((32,32))
            newarr = np.array(newim)
            newarr = newarr/255 - 0.5
            loaded_mlmodel = PredictionConfig.mlmodel 
            y_pred = loaded_mlmodel.predict(newarr)
            pred = labels[y_pred.index(1)]
            #y_pred = pd.Series(y_pred)
            #target_map = {0: 'setosa', 1: 'versicolor', 2: 'virginica'}
            #y_pred = y_pred.map(target_map).to_numpy()
            response_dict = {"Predicted Object": pred}
            return Response(response_dict, status=200)


        # data = request.data
        # keys = []
        # values = []
        # for key in data:
        #     keys.append(key)
        #     values.append(data[key])
        # X = pd.Series(values).to_numpy().reshape(1, -1)
        # loaded_mlmodel = PredictionConfig.mlmodel 
        # y_pred = loaded_mlmodel.predict(X)
        # y_pred = pd.Series(y_pred)
        # target_map = {0: 'setosa', 1: 'versicolor', 2: 'virginica'}
        # y_pred = y_pred.map(target_map).to_numpy()
        # response_dict = {"Predicted Object": y_pred[0]}
        # return Response(response_dict, status=200)
