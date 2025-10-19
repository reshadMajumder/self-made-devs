from django.urls import path
from .views import DevWingRegistrationCreateView

urlpatterns = [
    path('register/', DevWingRegistrationCreateView.as_view(), name='register'),
    # path('registrations/', RegistrationListView.as_view(), name='registration-list'),
]
