from django.shortcuts import render
from .models import DecryptImages
from .serializers import DecryptImagesSerializer
from rest_framework.response import Response
from rest_framework import generics, permissions, status
from django.core.files import File
import cv2
import os
import numpy as np
import io
import random

def get_decrpypted_image(encrypted_picture):
    encrypted_picture.seek(0)

    encrypted_picture_image = cv2.imdecode(np.fromstring(encrypted_picture.read(), np.uint8), cv2.IMREAD_UNCHANGED)

    encrypted_picture_image = cv2.resize(encrypted_picture_image, (1000, 1000)) 

    width = encrypted_picture_image.shape[0] 
    height = encrypted_picture_image.shape[1] 
      
    # img1 and img2 are two blank images 
    img1 = np.zeros((width, height, 3), np.uint8) 
    img2 = np.zeros((width, height, 3), np.uint8) 
      
    for i in range(width): 
        for j in range(height): 
            for l in range(3): 
                v1 = format(encrypted_picture_image[i][j][l], '08b') 
                v2 = v1[:4] + chr(random.randint(0, 1)+48) * 4
                v3 = v1[4:] + chr(random.randint(0, 1)+48) * 4
                  
                # Appending data to img1 and img2 
                img1[i][j][l]= int(v2, 2) 
                img2[i][j][l]= int(v3, 2) 

    return img1, img2


class DecryptImageListCreate(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = DecryptImagesSerializer
    queryset = DecryptImages.objects.all()
    
    def get(self, request, format=None):
        images = DecryptImages.objects.all().filter(owner = self.request.user)
        serializer = DecryptImagesSerializer(images, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = DecryptImagesSerializer(data=request.data)
        if serializer.is_valid():
            if request.FILES.get("encrypted_picture", None) is not None:
                result1, result2 = get_decrpypted_image(request.FILES.get('encrypted_picture'))

                is_success, buffer1 = cv2.imencode(".png", result1)
                is_success, buffer2 = cv2.imencode(".png", result2)
                io_buf1 = io.BytesIO(buffer1)
                io_buf2 = io.BytesIO(buffer2)
                io_buf1.seek(0)
                io_buf2.seek(0)
                content1 = File(io_buf1, name='temp1')
                content2 = File(io_buf2, name='temp2')
                ret = serializer.save(owner = self.request.user)
                name1 = ret.encrypted_picture_name + "a.png"
                name2 = ret.encrypted_picture_name + "b.png"
                ret.to_be_hidden.save(name1, content1, save=True)
                ret.used_to_hide.save(name2, content2, save=True)
                serializer = DecryptImagesSerializer(instance=ret)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

