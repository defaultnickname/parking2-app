from rest_framework import serializers
from .models import (
    ParkingSpot,
    Company,
    ParkingSpotReservation,
    ParkingUser,
    ParkingLotDescription,
)
from django.contrib.auth import authenticate
from .managers import CustomUserManager
from django.utils.translation import ugettext_lazy as _
from django.utils.dateparse import parse_datetime


class ParkingSpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingSpot
        fields = "__all__"


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"


class ParkingDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingLotDescription
        fields = "__all__"


class UserParkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingUser
        fields = ("id", "email", "password", "company")
        extra_kwargs = {
            "password": {"write_only": True},
        }


class ParkingTimetableSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingSpotReservation
        fields = ("id","spot", "reserved_for", "reserved_by")

    def validate(self, data):
        spot = data.get("spot")
        reserved_by = data.get("reserved_by")
        reserved_for = data.get("reserved_for")

        if not spot or not reserved_for or not reserved_by:
            raise serializers.ValidationError(_("Invalid reservation parameters!"))

        if reserved_by.company != spot.belongs_to:

            raise serializers.ValidationError(
                _("User company is not permitted to take this spot!")
            )

        if ParkingSpotReservation.objects.filter(
            reserved_for=reserved_for, spot=spot.id
        ).exists():
            raise serializers.ValidationError(_("This spot is already taken!"))

        if ParkingSpotReservation.objects.filter(
            reserved_for__date=reserved_for.date(),
            reserved_by=reserved_by,
        ).exists():
            raise serializers.ValidationError(
                _("This user has spot for today already !")
            )

        return data

    class ReservationDeleteSerializer(serializers.ModelSerializer):
        class Meta:
            model= ParkingSpotReservation
            fields= ("id",)

        def validate(self,data):
            print(data)
            reservation_id = data.get('reservation_id')
         
          
            if not ParkingSpotReservation.objects.filter(id=reservation_id).exists():
                raise serializers.ValidationError("Wrong reservation ID")

            return {'reservation_id':reservation_id}



class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingUser
        fields = ("email", "password")

    def create(self, validated_data):
        return ParkingUser.objects.create_user(
            email=validated_data["email"], password=validated_data["password"]
        )


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)

        if user and not user.is_active:

            raise serializers.ValidationError(_("Inactive user"))
        return user
