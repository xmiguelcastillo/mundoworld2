from django.contrib import admin
from django.urls import path
from app.views import *  # Only import ReactView here

urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        "", ReactView.as_view(), name="anything"
    ),  # Using ReactView as a class-based view
    path("airport", AirportView.as_view(), name="airport"),
    path("flights", FlightView.as_view(), name="flights"),
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("flights/search", FlightSearchView.as_view(), name="flight_search"),
]
