# Generated by Django 5.1.4 on 2024-12-30 22:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_remove_flight_depart_durtation_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='airport',
            name='airportname',
        ),
        migrations.AlterField(
            model_name='airport',
            name='airportcode',
            field=models.CharField(choices=[('EWR', 'EWR - Newark Liberty International Airport'), ('ATL', 'ATL - Hartsfield-Jackson Atlanta International Airport'), ('LAX', 'LAX - Los Angeles International Airport')], default='EWR', max_length=3),
        ),
        migrations.AlterField(
            model_name='airport',
            name='city',
            field=models.CharField(choices=[('Newark', 'Newark, New Jersey'), ('Atlanta', 'Atlanta, Georgia'), ('Los Angeles', 'Los Angeles, California')], default='Newark', max_length=100),
        ),
        migrations.AlterField(
            model_name='airport',
            name='country',
            field=models.CharField(default='USA', max_length=100),
        ),
    ]