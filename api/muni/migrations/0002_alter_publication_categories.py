# Generated by Django 5.1 on 2024-09-19 07:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('muni', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='publication',
            name='categories',
            field=models.ManyToManyField(blank=True, related_name='publications', to='muni.category'),
        ),
    ]