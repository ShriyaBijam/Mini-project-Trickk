from rest_framework import serializers
from .models import EncryptImages

class EncryptImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = EncryptImages
        fields = ('id', 'to_be_hidden', 'used_to_hide', 'encrypted_picture', 'owner', 'created_at')
        order_by = ['-created_at']
        