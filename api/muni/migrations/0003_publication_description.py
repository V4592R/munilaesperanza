# Generated by Django 5.1 on 2024-09-19 16:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('muni', '0002_alter_publication_categories'),
    ]

    operations = [
        migrations.AddField(
            model_name='publication',
            name='description',
            field=models.CharField(default='', max_length=300),
        ),
    ]
