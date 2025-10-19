from rest_framework import generics
from .models import DevWingRegistration
from .serializers import DevWingRegistrationSerializer

class DevWingRegistrationCreateView(generics.CreateAPIView):
    queryset = DevWingRegistration.objects.all()
    serializer_class = DevWingRegistrationSerializer
