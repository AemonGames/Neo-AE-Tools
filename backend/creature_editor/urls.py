from rest_framework import routers
from django.urls import path, include
from .views import *

router = routers.DefaultRouter()
router.register(r'monsters', MonsterViewSet)
router.register(r'moves', MoveViewSet)
router.register(r'abilities', AbilityViewSet)
router.register(r'items', ItemViewSet)
router.register(r'types', TypeViewSet)

# router.register(r'egg-groups', EggGroupViewSet)
# router.register(r'move-records', MonsterMoveRecordViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/v1/core/', include(router.urls)),
    path('api/dyna_cmd/', dyna_cmd_view, name='dyna_cmd_view'),

]

from .views import bulk_create_moves, bulk_create_move_records

urlpatterns += [
    path('api/bulk/moves/', bulk_create_moves, name='bulk_create_moves'),
    path('api/bulk/move-records/', bulk_create_move_records, name='bulk_create_move_records'),
    path('api/ss/dyna/cmd', get_dyna_cmd, name='get_dyna_cmd'),
]
