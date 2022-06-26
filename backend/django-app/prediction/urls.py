from django.urls import path
import prediction.views as views

urlpatterns = [
    path('predict/', views.ImageView.as_view(), name = 'api_predict'),
    path('upload/', views.ImageView.as_view(), name = 'api_upload'),
    path('gather/', views.ImageView.as_view(), name = 'api_gather'),
]