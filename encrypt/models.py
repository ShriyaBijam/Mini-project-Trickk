from django.db import models
from datetime import date
import os
from django.contrib.auth.models import User


# Create your models here.
def user_directory_path(instance, filename):  
    # file will be uploaded to MEDIA_ROOT / user_<username>/<filename> 
    return 'user_{0}/{1}'.format(instance.owner, filename)

class EncryptImages(models.Model):
    to_be_hidden = models.ImageField(upload_to=user_directory_path)
    used_to_hide = models.ImageField(upload_to=user_directory_path)
    encrypted_picture = models.ImageField(null=True, blank=True, upload_to=user_directory_path)
    owner = models.ForeignKey(User, related_name="encryptImages", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def to_be_hidden_name(self):
        file_name = os.path.basename(self.to_be_hidden.name)
        full_name = os.path.splitext(file_name)
        return full_name[0]

    @property
    def used_to_hide_name(self):
        file_name = os.path.basename(self.used_to_hide.name)
        full_name = os.path.splitext(file_name)
        return full_name[0]

    @property
    def encrypted_picture_name(self):
        file_name = os.path.basename(self.encrypted_picture.name)
        full_name = os.path.splitext(file_name)
        return full_name[0] 
