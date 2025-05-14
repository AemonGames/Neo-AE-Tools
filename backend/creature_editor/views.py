import json
import os
from django.conf import settings
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework import filters
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .services import get_dyna_cmd

@api_view(['POST'])
def bulk_create_moves(request):
    serializer = MoveSerializer(data=request.data, many=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def bulk_create_move_records(request):
    serializer = MonsterMoveRecordWriteSerializer(data=request.data, many=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def dyna_cmd_view(request):
    dyna_cmd = get_dyna_cmd()
    return Response({
        "Commands": dyna_cmd.Commands,
        "Events": dyna_cmd.Events,
        "Functions": dyna_cmd.Functions,
        "Variable": dyna_cmd.Variable,
        "Toggles": dyna_cmd.Toggles
    })
@api_view(['GET'])
def get_dyna_cmd(request):
    mock_path = os.path.join(settings.BASE_DIR, 'mock_dyna_cmd.json')
    with open(mock_path, 'r') as file:
        data = json.load(file)
    return JsonResponse(data)

class MonsterViewSet(viewsets.ModelViewSet):
    queryset = Monster.objects.all().prefetch_related('abilities', 'egg_groups', 'move_records')
    serializer_class = MonsterSerializer
    lookup_field = 'slug'
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'primary_type', 'secondary_type', 'abilities__name']
    ordering_fields = ['name', 'rarity']

class MoveViewSet(viewsets.ModelViewSet):
    queryset = Move.objects.all()
    serializer_class = MoveSerializer
    lookup_field = 'slug'
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'type', 'category']
    ordering_fields = ['name', 'power', 'accuracy']

class AbilityViewSet(viewsets.ModelViewSet):
    queryset = Ability.objects.all()
    serializer_class = AbilitySerializer

class EggGroupViewSet(viewsets.ModelViewSet):
    queryset = EggGroup.objects.all()
    serializer_class = EggGroupSerializer

class MonsterMoveRecordViewSet(viewsets.ModelViewSet):
    queryset = MonsterMoveRecord.objects.all()
    serializer_class = MonsterMoveRecordSerializer

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class TypeViewSet(viewsets.ModelViewSet):
    queryset = Type.objects.all()
    serializer_class = TypeSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['name']