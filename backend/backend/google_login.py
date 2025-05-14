from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from google.oauth2 import id_token
from google.auth.transport import requests
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

class GoogleLogin(APIView):
    def post(self, request):
        token = request.data.get("id_token")
        if not token:
            return Response({"error": "No token provided."}, status=400)

        try:
            client_id = getattr(settings, 'GOOGLE_OAUTH_CLIENT_ID', None)
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), client_id)
            email = idinfo["email"]
            first_name = idinfo.get("given_name", "")
            last_name = idinfo.get("family_name", "")
            sub = idinfo["sub"]

            # Find or create user
            user, created = User.objects.get_or_create(email=email, defaults={
                "username": f"google_{sub}",
                "first_name": first_name,
                "last_name": last_name
            })

            refresh = RefreshToken.for_user(user)
            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh)
            })

        except ValueError:
            return Response({"error": "Invalid token."}, status=400)
