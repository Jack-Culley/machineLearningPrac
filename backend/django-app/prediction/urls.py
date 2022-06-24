from django.urls import path
import prediction.views as views

urlpatterns = [
    path('predict/', views.CNN_Predict.as_view(), name = 'api_predict'),
]