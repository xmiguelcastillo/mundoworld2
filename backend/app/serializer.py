from rest_framework import serializers, status
from .models import *
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response


class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = React
        fields = ["employee", "department"]


class AirportSerializer(serializers.ModelSerializer):
    airportname = serializers.CharField(required=False, allow_blank=True)
    airportcode = serializers.CharField(required=False, allow_blank=True)
    city = serializers.CharField(required=False, allow_blank=True)
    country = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = Airport
        fields = ["airportname", "airportcode", "city", "country"]


class FlightSerializer(serializers.ModelSerializer):
    depart_location = AirportSerializer()
    return_location = AirportSerializer()

    class Meta:
        model = Flight
        fields = [
            "depart_location",
            "return_location",
            "airline",
            "depart_date",
            "return_date",
            "flightnumber",
            "class_flight",
            "passenger_flight",
            "price_flight",
            "depart_time",
            "return_time",
            "depart_duration",
            "return_duration",
        ]

    def create(self, validated_data):
        # Extract the nested location data
        depart_location_data = validated_data.pop("depart_location")
        return_location_data = validated_data.pop("return_location")

        # Create Airport instances from the validated data
        depart_location = Airport.objects.create(**depart_location_data)
        return_location = Airport.objects.create(**return_location_data)

        # Create and return the Flight instance with foreign key relationships
        flight = Flight.objects.create(
            depart_location=depart_location,
            return_location=return_location,
            **validated_data
        )

        return flight


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User  # Specify the model you're working with (e.g., User model)
        fields = ["email", "password"]
