# Generated by Django 5.1 on 2024-10-23 23:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('muni', '0005_suggestion'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='requirement',
            options={'ordering': ['created']},
        ),
    ]
