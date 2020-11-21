from rest_framework import serializers
from .models import DecryptImages

class DecryptImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = DecryptImages
        fields = ('id', 'to_be_hidden', 'used_to_hide', 'encrypted_picture', 'owner', 'created_at')
        order_by = ['created_at']
        