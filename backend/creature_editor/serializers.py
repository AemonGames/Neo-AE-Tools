from rest_framework import serializers
from .models import *

class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = ['id', 'name']

class EstimateMonStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstimateMonStats
        fields = ['hp', 'atk', 'sp_atk', 'def_stat', 'sp_def', 'spd']


class AbilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Ability
        fields = ['id', 'name']

class EggGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = EggGroup
        fields = ['id', 'name']

class MoveSerializer(serializers.ModelSerializer):
    type = TypeSerializer()

    class Meta:
        model = Move
        fields = ['id', 'name', 'slug', 'type', 'category', 'power', 'accuracy', 'pp']


class LearnableMoveSerializer(serializers.ModelSerializer):
    move = MoveSerializer()
    class Meta:
        model = LearnableMove
        fields = ['level', 'move']

class MonsterMoveRecordSerializer(serializers.ModelSerializer):
    learnset = LearnableMoveSerializer(many=True)
    class Meta:
        model = MonsterMoveRecord
        fields = ['id', 'name', 'learnset']

class MonsterSerializer(serializers.ModelSerializer):
    primary_type = TypeSerializer()
    secondary_type = TypeSerializer()
    abilities = AbilitySerializer(many=True)
    egg_groups = EggGroupSerializer(many=True)
    base_stats = EstimateMonStatsSerializer()
    ev_yield = EstimateMonStatsSerializer()
    move_records = MonsterMoveRecordSerializer(many=True)

    class Meta:
        model = Monster
        fields = '__all__'

class LearnableMoveWriteSerializer(serializers.ModelSerializer):
    move = serializers.PrimaryKeyRelatedField(queryset=Move.objects.all())

    class Meta:
        model = LearnableMove
        fields = ['level', 'move']

class MonsterMoveRecordWriteSerializer(serializers.ModelSerializer):
    learnset = LearnableMoveWriteSerializer(many=True)

    class Meta:
        model = MonsterMoveRecord
        fields = ['name', 'monster', 'learnset']

    def create(self, validated_data):
        learnset_data = validated_data.pop('learnset')
        record = MonsterMoveRecord.objects.create(**validated_data)
        for item in learnset_data:
            LearnableMove.objects.create(**item, monstermoverecord=record)
        return record

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'name', 'effect', 'icon']
