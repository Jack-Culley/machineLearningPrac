from django.urls import path
import prediction.views as views

urlpatterns = [
    #path('predict/', views.ImageView.as_view(), name = 'api_predict'),
    path('image/upload/', views.ImageUpload.as_view(), name = 'api_upload'),
    path('image/get/', views.ImageUpload.as_view(), name = 'api_get'),
]