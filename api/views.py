from datetime import datetime

from rest_framework import generics, permissions, status
from .serializers import (
    UserParkSerializer,
    ParkingSpotSerializer,
    ParkingTimetableSerializer,
    CompanySerializer,
    RegisterSerializer,
    LoginSerializer,
    ParkingDescriptionSerializer,
)

from .models import (
    ParkingUser,
    ParkingSpot,
    Company,
    ParkingSpotReservation,
    ParkingLotDescription,
)
from knox.models import AuthToken
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import logout


class UserView(generics.ListCreateAPIView):
    """Get user API"""

    queryset = ParkingUser.objects.all().exclude(is_staff=True)
    serializer_class = UserParkSerializer


class SpotView(generics.ListCreateAPIView):
    """Get spots API"""

    queryset = ParkingSpot.objects.all()
    serializer_class = ParkingSpotSerializer


class CompanyView(generics.ListCreateAPIView):
    """Get companies API"""

    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class DescriptionView(generics.ListCreateAPIView):
    """Get parking lot description API"""

    queryset = ParkingLotDescription.objects.all()
    serializer_class = ParkingDescriptionSerializer


class MakeReservation(APIView):
    """Make users reservation API"""

    serializer_class = ParkingTimetableSerializer

    def post(self, request, format=None):

        serializer = ParkingTimetableSerializer(data=request.data)

        serializer.is_valid()

        serializer.save()

        return Response((request.data), status=status.HTTP_201_CREATED)

    def delete(self, request, format=None):
        
        reservation_id = request.data['reservation_id']
        if ParkingSpotReservation.objects.filter(id = reservation_id).exists():

            ParkingSpotReservation.objects.get(id=reservation_id).delete()
        
        return Response(status=status.HTTP_204_NO_CONTENT)



class TimetableView(generics.ListAPIView):
    """Get reservations API"""

    serializer_class = ParkingTimetableSerializer

    def get_queryset(self):
        queryset = ParkingSpotReservation.objects.all()
        userid = self.request.query_params.get("userid", None)
        if userid is not None:
            queryset = queryset.filter(reserved_by_id=userid)
        return queryset


class RegisterView(generics.GenericAPIView):
    """User register API"""

    serializer_class = RegisterSerializer
    authentication_classes = ()
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LoginAPI(generics.GenericAPIView):
    """User login API"""

    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data

        return Response(
            {
                "user": UserParkSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": AuthToken.objects.create(user)[1],
            }
        )


class UserAPI(generics.RetrieveAPIView):
    """Get users by token API"""

    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserParkSerializer

    def get_object(self):
        return self.request.user
