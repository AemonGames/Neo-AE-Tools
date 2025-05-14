from django.contrib import admin
from .models import *

class EstimateMonStatsInline(admin.StackedInline):
    model = EstimateMonStats
    extra = 0

class LearnableMoveInline(admin.TabularInline):
    model = MonsterMoveRecord.learnset.through
    extra = 0

class MonsterMoveRecordInline(admin.TabularInline):
    model = MonsterMoveRecord
    extra = 0

@admin.register(Monster)
class MonsterAdmin(admin.ModelAdmin):
    list_display = ('name', 'rarity', 'primary_type', 'secondary_type')
    search_fields = ('name',)
    list_filter = ('rarity', 'primary_type', 'secondary_type')

    fieldsets = (
        ('Basic Info', {
            'fields': ('name', 'image', 'rarity', 'primary_type', 'secondary_type', 'description')
        }),
        ('Size & Stats', {
            'fields': ('weight_class', 'weight_value', 'height_class', 'height_value', 'base_stats', 'ev_yield')
        }),
        ('Abilities & Breeding', {
            'fields': ('abilities', 'egg_groups', 'hatch_time')
        }),
        ('Catch & Friendship', {
            'fields': ('catch_rate', 'base_friendship')
        }),
        ('Progression', {
            'fields': ('exp_yield', 'leveling_rate')
        }),
        ('Extra', {
            'fields': ('notes', 'lore')
        }),
    )

    inlines = [MonsterMoveRecordInline]

@admin.register(Ability)
class AbilityAdmin(admin.ModelAdmin):
    search_fields = ('name',)

@admin.register(EggGroup)
class EggGroupAdmin(admin.ModelAdmin):
    search_fields = ('name',)

@admin.register(Move)
class MoveAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'category', 'power', 'accuracy', 'pp')
    search_fields = ('name', 'type')


@admin.register(MonsterMoveRecord)
class MonsterMoveRecordAdmin(admin.ModelAdmin):
    inlines = [LearnableMoveInline]

@admin.register(EstimateMonStats)
class EstimateMonStatsAdmin(admin.ModelAdmin):
    pass

@admin.register(DynaCmd)
class DynaCmdAdmin(admin.ModelAdmin):
    pass
