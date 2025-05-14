from django.db import models
from django.utils.text import slugify

### ========================
### DYNA_CMD Model
### ========================

class DynaCmd(models.Model):
    commands = models.JSONField()
    events_time_options = models.JSONField()
    events_target_options = models.JSONField()
    events_condition_reference = models.JSONField()
    events_condition_value = models.JSONField()
    functions = models.JSONField()
    variable = models.JSONField()
    toggles = models.JSONField()

    def __str__(self):
        return "DynaCmd Config"


### ========================
### Stats Model
### ========================

class EstimateMonStats(models.Model):
    hp = models.CharField(max_length=50)
    atk = models.CharField(max_length=50)
    sp_atk = models.CharField(max_length=50)
    def_stat = models.CharField(max_length=50)
    sp_def = models.CharField(max_length=50)
    spd = models.CharField(max_length=50)

    def __str__(self):
        return f"HP:{self.hp} ATK:{self.atk} SPD:{self.spd}"


### ========================
### Ability Model
### ========================

class Ability(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


### ========================
### EggGroup Model
### ========================

class EggGroup(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
### ========================
### Type Model
### ========================

class Type(models.Model):
    name = models.CharField(max_length=50, unique=True)
    
    strong_against = models.ManyToManyField(
        'self',
        symmetrical=False,
        related_name='is_strong_against_types',
        blank=True
    )
    weak_against = models.ManyToManyField(
        'self',
        symmetrical=False,
        related_name='is_weak_against_types',
        blank=True
    )
    immune_to = models.ManyToManyField(
        'self',
        symmetrical=False,
        related_name='has_no_effect_types',
        blank=True
    )


    def __str__(self):
        return self.name


### ========================
### Monster Model
### ========================

class Monster(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)
    image = models.ImageField(upload_to='monsters/')
    rarity = models.CharField(max_length=50)

    primary_type = models.ForeignKey(
        Type, 
        on_delete=models.PROTECT, 
        related_name='monsters_primary'
    )

    secondary_type = models.ForeignKey(
        Type, 
        blank=True, 
        null=True, 
        on_delete=models.DO_NOTHING, 
        related_name='monsters_secondary'
    )

    abilities = models.ManyToManyField(Ability, blank=True)

    description = models.TextField()

    weight_class = models.CharField(max_length=50)
    weight_value = models.FloatField()
    height_class = models.CharField(max_length=50)
    height_value = models.FloatField()

    base_stats = models.OneToOneField(EstimateMonStats, related_name='base_for', on_delete=models.CASCADE)

    egg_groups = models.ManyToManyField(EggGroup, blank=True)
    hatch_time = models.CharField(max_length=50)

    catch_rate = models.CharField(max_length=50)
    base_friendship = models.CharField(max_length=50)

    exp_yield = models.CharField(max_length=50)
    leveling_rate = models.CharField(max_length=50)

    ev_yield = models.OneToOneField(EstimateMonStats, related_name='ev_for', on_delete=models.CASCADE)

    notes = models.TextField(blank=True, null=True)
    lore = models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


    def __str__(self):
        return self.name



### ========================
### Move Model
### ========================

class Move(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)
    type = models.ForeignKey(Type, blank=True, null=True, on_delete=models.PROTECT)
    category = models.CharField(max_length=50)
    power = models.IntegerField()
    accuracy = models.IntegerField()
    pp = models.IntegerField()

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


    def __str__(self):
        return self.name


### ========================
### LearnableMove Model
### ========================

class LearnableMove(models.Model):
    level = models.IntegerField()
    move = models.ForeignKey(Move, on_delete=models.CASCADE)

    def __str__(self):
        return f"Level {self.level} - {self.move.name}"


### ========================
### MonsterMoveRecord Model
### ========================

class MonsterMoveRecord(models.Model):
    name = models.CharField(max_length=100)
    monster = models.ForeignKey(Monster, on_delete=models.CASCADE, related_name='move_records')
    learnset = models.ManyToManyField(LearnableMove)

    def __str__(self):
        return f"Move Record for {self.name}"

class Item(models.Model):
    name = models.CharField(max_length=100, unique=True)
    effect = models.TextField(blank=True, null=True)
    icon = models.ImageField(upload_to='items/', blank=True, null=True)

    def __str__(self):
        return self.name
