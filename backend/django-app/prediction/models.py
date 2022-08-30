from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_delete

def upload_to(instance, filename):
    #return 'static/images/{filename}'.format(filename=filename)
    #return 'images/{filename}'.format(filename=filename)
    return '{filename}'.format(filename=filename)


class ImageModel(models.Model):
    creator = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="images", blank=True)
    title = models.CharField(
        max_length=80, blank=False, null=False)
    image_url = models.ImageField(upload_to=upload_to, blank=True, null=True)
    upload_date = models.DateTimeField(blank=False, null=True)
    pred_label = models.CharField(max_length=20, null=True)