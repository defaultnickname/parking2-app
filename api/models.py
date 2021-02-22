from django.db import models
from django.contrib.auth.models import User, AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager
from django.core.exceptions import ValidationError
from django.utils import timezone
import datetime
from .validators import validate_date


class Company(models.Model):
    company_name = models.CharField(max_length=100)

    def __str__(self):
        return self.company_name


class ParkingSpot(models.Model):
    id = models.IntegerField(unique=True, primary_key=True)
    belongs_to = models.ForeignKey(
        Company, on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        return f"Spot with ID: {self.id} -  Company : {self.belongs_to}"

    def save(self, *args, **kwargs):

        if ParkingLotDescription.objects.exists():
            parking_lot = ParkingLotDescription.objects.get()
        else:
            raise ValidationError(
                _("One should create ParkingLotDescription object first")
            )

        if (
            ParkingSpot.objects.count() >= parking_lot.width * parking_lot.length
            and self.id is None
        ):
            raise ValidationError(_("There are no more physical parking spots "))

        return super(ParkingSpot, self).save(*args, **kwargs)


class ParkingUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("email address"), unique=True)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    company = models.ForeignKey(
        Company, on_delete=models.SET_NULL, null=True, blank=True
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        if self.is_staff:
            return f"{self.email} - Admin"
        else:
            return f"{self.email} - Company {self.company}"


class ParkingSpotReservation(models.Model):
    spot = models.ForeignKey(ParkingSpot, on_delete=models.CASCADE)
    reserved_for = models.DateTimeField(validators=[validate_date])
    reserved_by = models.ForeignKey(ParkingUser, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.spot_id} reserved at {self.reserved_for} by {self.reserved_by}"


# model which basically describes size of parking lot and number of possible parking spots
class ParkingLotDescription(models.Model):
    width = models.IntegerField()
    length = models.IntegerField()

    def save(self, *args, **kwargs):
        if not self.pk and ParkingLotDescription.objects.exists():
            raise ValidationError(
                _("There  can be only one instance of ParkingLotDescription")
            )
        return super(ParkingLotDescription, self).save(*args, **kwargs)
