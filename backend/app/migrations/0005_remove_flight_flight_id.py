# Generated by Django 5.1.4 on 2024-12-28 21:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_flight_flight_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='flight',
            name='flight_id',
        ),
    ]