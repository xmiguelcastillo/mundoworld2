from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from .serializer import *
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers, status


# Create your views here.


class ReactView(APIView):

    serializer_class = ReactSerializer

    def get(self, request):
        output = [
            {"employee": output.employee, "department": output.department}
            for output in React.objects.all()
        ]
        return Response(output)

    def post(self, request):

        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class AirportView(APIView):
    serializer_class = AirportSerializer

    def get(self, request):
        output = [
            {
                "airportname": airport.airportname,
                "airportcode": airport.airportcode,
                "city": airport.city,
                "country": airport.country,
            }
            for airport in Airport.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serializer = AirportSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class FlightView(APIView):
    serializer_class = FlightSerializer

    def get(self, request):
        flights = Flight.objects.all()

        # Serialize flights with the associated Airport data
        flight_data = []
        for flight in flights:
            flight_data.append(
                {
                    "depart_location": AirportSerializer(flight.depart_location).data,
                    "return_location": AirportSerializer(flight.return_location).data,
                    "airline": flight.airline,
                    "depart_date": flight.depart_date,
                    "return_date": flight.return_date,
                    "flightnumber": flight.flightnumber,
                    "class_flight": flight.class_flight,
                    "passenger_flight": flight.passenger_flight,
                    "price_flight": flight.price_flight,
                    "depart_time": flight.depart_time,
                    "return_time": flight.return_time,
                    "depart_duration": flight.depart_duration,
                    "return_duration": flight.return_duration,
                }
            )

        return Response(flight_data)

    def post(self, request):
        serializer = FlightSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class FlightSearchView(APIView):
    def get(self, request):
        depart_city = request.query_params.get("depart_city")
        return_city = request.query_params.get("return_city")
        depart_date = request.query_params.get("depart_date")
        return_date = request.query_params.get("return_date")

        # Build the filter dynamically, ignoring None values
        filters = {}
        if depart_city:
            filters["depart_location__city__icontains"] = depart_city
        if return_city:
            filters["return_location__city__icontains"] = return_city
        if depart_date:
            filters["depart_date"] = depart_date
        if return_date:
            filters["return_date"] = return_date

        # Query flights based on the built filter
        flights = Flight.objects.filter(**filters)

        # Serialize and return the results
        serializer = FlightSerializer(flights, many=True)
        return Response(serializer.data)


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {"message": "User created successfully"}, status=status.HTTP_201_CREATED
            )
        else:
            # Log the errors for debugging
            print("Registration errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get("email")
            password = serializer.validated_data.get("password")

            try:
                # Look for the user by email instead of username
                user_obj = User.objects.get(email=email)
                if user_obj.check_password(password):
                    refresh = RefreshToken.for_user(user_obj)
                    return Response(
                        {
                            "access": str(refresh.access_token),
                            "refresh": str(refresh),
                        },
                        status=status.HTTP_200_OK,
                    )
                else:
                    return Response(
                        {"message": "Invalid credentials"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
            except User.DoesNotExist:
                return Response(
                    {"message": "User not found"}, status=status.HTTP_400_BAD_REQUEST
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
