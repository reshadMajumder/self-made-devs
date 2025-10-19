from rest_framework import serializers
from .models import DevWingRegistration

class DevWingRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = DevWingRegistration
        fields = '__all__'
