from django.urls import path

from .views import (
    SpotView,
    TimetableView,
    UserView,
    CompanyView,
    DescriptionView,
    MakeReservation,
    RegisterView,
    LoginAPI,
    UserAPI,
)

from knox import views as knox_views


urlpatterns = [
    path("spot/", SpotView.as_view()),
    path("reservations/", TimetableView.as_view()),
    path("companies/", CompanyView.as_view()),
    path("make-reservation/", MakeReservation.as_view()),
    path("user/", UserView.as_view()),
    path("desc/", DescriptionView.as_view()),
    path("auth/register/", RegisterView.as_view()),
    path("auth/login/", LoginAPI.as_view()),
    path("auth/logout/", knox_views.LogoutView.as_view()),
    path("auth/getuser/", UserAPI.as_view()),
]
