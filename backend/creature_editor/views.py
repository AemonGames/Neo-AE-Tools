import json
import os
from django.conf import settings
from django.http import JsonResponse
from rest_framework import filters, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializers import *
from .services import get_dyna_cmd

from rest_framework import viewsets

# DRY base class
class SlugLookupModelViewSet(viewsets.ModelViewSet):
    lookup_field = 'slug'

class HybridLookupModelViewSet(viewsets.ModelViewSet):
    """
    Tries to get an object by slug first, then by pk.
    If variant support is enabled, it checks for suffix-based variant matching.
    """
    slug_field = 'slug'

    def get_object(self):
        queryset = self.get_queryset()
        lookup_value = self.kwargs.get(self.lookup_field)

        # Try slug field first (e.g. "pikachu-alola")
        filter_kwargs = {self.slug_field: lookup_value}
        try:
            return get_object_or_404(queryset, **filter_kwargs)
        except:
            pass

        # Try primary key as fallback
        try:
            return get_object_or_404(queryset, pk=lookup_value)
        except:
            raise Http404("No matching object found.")

# Bulk creation endpoints
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

# Dyna commands
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

# ViewSets using slug consistently
class MonsterViewSet(SlugLookupModelViewSet):
    queryset = Monster.objects.all().prefetch_related('abilities', 'egg_groups', 'move_records')
    serializer_class = MonsterSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'primary_type', 'secondary_type', 'abilities__name']
    ordering_fields = ['name', 'rarity']

class MoveViewSet(SlugLookupModelViewSet):
    queryset = Move.objects.all()
    serializer_class = MoveSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'type', 'category']
    ordering_fields = ['name', 'power', 'accuracy']

class AbilityViewSet(SlugLookupModelViewSet):
    queryset = Ability.objects.all()
    serializer_class = AbilitySerializer

class EggGroupViewSet(SlugLookupModelViewSet):
    queryset = EggGroup.objects.all()
    serializer_class = EggGroupSerializer

class MonsterMoveRecordViewSet(SlugLookupModelViewSet):
    queryset = MonsterMoveRecord.objects.all()
    serializer_class = MonsterMoveRecordSerializer

class ItemViewSet(SlugLookupModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class TypeViewSet(SlugLookupModelViewSet):
    queryset = Type.objects.all()
    serializer_class = TypeSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['name']
