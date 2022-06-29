from rest_framework import serializers
from.models import ImageModel

class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = ImageModel
        fields = ('creator', 'id', 'title', 'image_url', 'upload_date')
