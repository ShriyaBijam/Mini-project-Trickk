# Generated by Django 3.1.3 on 2020-11-17 15:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('decrypt', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='decryptimages',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='decryptImages', to=settings.AUTH_USER_MODEL),
        ),
    ]