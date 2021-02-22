from django.contrib.auth.backends import ModelBackend, UserModel
from django.db.models import Q
from django.core.exceptions import MultipleObjectsReturned
from .models import ParkingUser


class EmailBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        if email is None or password is None:
            return
        try:  # to allow authentication through phone number or any other field, modify the below statement
            user = UserModel.objects.get(Q(email__iexact=email))

        except UserModel.DoesNotExist:

            UserModel().set_password(password)

        else:

            if user.check_password(password) and self.user_can_authenticate(user):
                return user
