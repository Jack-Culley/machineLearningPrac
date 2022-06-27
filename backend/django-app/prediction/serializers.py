from rest_framework import serializers
from.models import ImageModel

class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = ImageModel
        fields = ('creator', 'id', 'title', 'image_url', 'upload_date')

    def create(self, validated_data):
        validated_data['creator'] = self.context['request'].user.id
        return super(ImageSerializer, self).create(validated_data)