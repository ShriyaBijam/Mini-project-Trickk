from django.contrib import admin
from .models import DecryptImages

# Register your models here.
class DecryptImagesAdmin(admin.ModelAdmin):
    pass

admin.site.register(DecryptImages, DecryptImagesAdmin)