from django.db import models
from datetime import time


class React(models.Model):
    employee = models.CharField(max_length=30)
    department = models.CharField(max_length=200)


class Airport(models.Model):
    # Choices for Airport Code
    NEWARK = "EWR"
    ATLANTA = "ATL"
    LOS_ANGELES = "LAX"

    AIRPORT_CODE_CHOICES = [
        (NEWARK, "EWR"),
        (ATLANTA, "ATL"),
        (LOS_ANGELES, "LAX"),
    ]

    NEWARK_CITY = "Newark"
    ATLANTA_CITY = "Atlanta"
    LOS_ANGELES_CITY = "Los Angeles"

    CITY_CHOICES = [
        (NEWARK_CITY, "Newark, New Jersey"),
        (ATLANTA_CITY, "Atlanta, Georgia"),
        (LOS_ANGELES_CITY, "Los Angeles, California"),
    ]

    NEWARK_NAME = "Newark Liberty International Airport"
    ATLANTA_NAME = "Hartsfield-Jackson Atlanta International Airport"
    LOS_ANGELES_NAME = "Los Angeles International Airport"

    AIRPORT_NAME_CHOIES = [
        (NEWARK_NAME, "Newark Liberty"),
        (ATLANTA_NAME, "Hartsfield-Jackson"),
        (LOS_ANGELES, "Los Angeles"),
    ]

    airportname = models.CharField(
        max_length=100, choices=AIRPORT_NAME_CHOIES, default=NEWARK_NAME
    )

    airportcode = models.CharField(
        max_length=3, choices=AIRPORT_CODE_CHOICES, default=NEWARK
    )
    city = models.CharField(max_length=100, choices=CITY_CHOICES, default=NEWARK_CITY)
    country = models.CharField(max_length=100, default="USA")

    def __str__(self):
        return f"{self.get_airportcode_display()} - {self.get_city_display()}"


class Flight(models.Model):
    ECONOMY = "economy"
    PREMIUM_ECONOMY = "premium_economy"
    BUSINESS = "buisness_economy"
    FIRST_CLASS = "first_class"

    CLASS_CHOICES = [
        (ECONOMY, "Economy Class"),
        (PREMIUM_ECONOMY, "Premium Economy Class"),
        (BUSINESS, "Business Class"),
        (FIRST_CLASS, "First Class"),
    ]

    depart_location = models.ForeignKey(
        Airport,
        related_name="departures",
        on_delete=models.CASCADE,
        limit_choices_to={"city__in": ["Newark", "Atlanta", "Los Angeles"]},
    )
    return_location = models.ForeignKey(
        Airport,
        related_name="arrivals",
        on_delete=models.CASCADE,
        limit_choices_to={"city__in": ["Newark", "Atlanta", "Los Angeles"]},
    )

    airline = models.CharField(max_length=100)
    depart_date = models.DateField()
    return_date = models.DateField()
    flightnumber = models.CharField(max_length=10)

    class_flight = models.CharField(
        max_length=50, choices=CLASS_CHOICES, default=ECONOMY
    )

    ADULT = "adult"
    CHILDREN = "children"
    INFANT = "infant"

    PASSENGER_CHOICES = [(ADULT, "Adult "), (CHILDREN, "Children"), (INFANT, "Infant")]
    passenger_flight = models.CharField(
        max_length=100, choices=PASSENGER_CHOICES, default=ADULT
    )
    price_flight = models.DecimalField(max_digits=10, decimal_places=2)

    depart_time = models.TimeField(default=time(13, 0))
    return_time = models.TimeField(default=time(15, 0))

    depart_duration = models.IntegerField(default=180)
    return_duration = models.IntegerField(default=240)

    def __str__(self):
        return f"Flight {self.flightnumber} from {self.depart_location} to {self.return_location}"
