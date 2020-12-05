from .models import EncryptImages
from .serializers import EncryptImagesSerializer
from rest_framework.response import Response
from rest_framework import status, permissions, generics
from django.core.files import File
import cv2
import os
import numpy as np
import io

def get_encrpypted_image(data_hidden, data_use):
    data_hidden.seek(0)
    data_use.seek(0)

    data_hidden_image = cv2.imdecode(np.fromstring(data_hidden.read(), np.uint8), cv2.IMREAD_UNCHANGED)
    data_use_image = cv2.imdecode(np.fromstring(data_use.read(), np.uint8), cv2.IMREAD_UNCHANGED)

    data_hidden_image = cv2.resize(data_hidden_image, (1000, 1000)) 
    data_use_image = cv2.resize(data_use_image, (1000, 1000)) 

    for i in range(data_hidden_image.shape[0]): 
        for j in range(data_hidden_image.shape[1]): 
            for l in range(3): 
                  
                # v1 and v2 are 8-bit pixel values 
                # of img1 and img2 respectively 
                v1 = format(data_use_image[i][j][l], '08b') 
                v2 = format(data_hidden_image[i][j][l], '08b') 
                  
                # Taking 4 MSBs of each image 
                v3 = v1[:4] + v2[:4]  
                  
                data_use_image[i][j][l]= int(v3, 2) 

    return data_use_image


class EncryptImageListCreate(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    queryset = EncryptImages.objects.all().order_by('-created_at')
    serializer_class = EncryptImagesSerializer
    def get(self, request, format=None):
        snippets = EncryptImages.objects.all().filter(owner = self.request.user)
        serializer = EncryptImagesSerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = EncryptImagesSerializer(data=request.data)
        if serializer.is_valid():
            if request.FILES.get("to_be_hidden", None) is not None and request.FILES.get("used_to_hide", None) is not None:
                result = get_encrpypted_image(request.FILES.get('to_be_hidden'), request.FILES.get('used_to_hide'))

                is_success, buffer = cv2.imencode(".png", result)
                io_buf = io.BytesIO(buffer)
                io_buf.seek(0)
                content = File(io_buf, name='temp')
                ret = serializer.save(owner = self.request.user)
                name = ret.to_be_hidden_name + "in" + ret.used_to_hide_name + ".png"
                ret.encrypted_picture.save(name, content, save=True)
                serializer = EncryptImagesSerializer(instance=ret)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

