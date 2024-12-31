# Generated by Django 5.1.4 on 2024-12-30 19:02

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_flight_duration_flight'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='flight',
            name='duration_flight',
        ),
        migrations.AddField(
            model_name='flight',
            name='depart_durtation',
            field=models.IntegerField(default=180),
        ),
        migrations.AddField(
            model_name='flight',
            name='depart_time',
            field=models.TimeField(default=datetime.time(13, 0)),
        ),
        migrations.AddField(
            model_name='flight',
            name='return_duration',
            field=models.IntegerField(default=240),
        ),
        migrations.AddField(
            model_name='flight',
            name='return_time',
            field=models.TimeField(default=datetime.time(15, 0)),
        ),
    ]
