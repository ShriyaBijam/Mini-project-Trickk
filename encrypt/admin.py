from django.contrib import admin

# Register your models here.
from .models import EncryptImages

class EncryptImagesAdmin(admin.ModelAdmin):
    pass

admin.site.register(EncryptImages, EncryptImagesAdmin)