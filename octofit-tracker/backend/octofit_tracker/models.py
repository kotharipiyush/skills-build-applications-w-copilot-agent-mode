from django.db import models
from djongo.models import ObjectIdField

class Team(models.Model):
    id = ObjectIdField(primary_key=True, db_column='_id')
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class User(models.Model):
    id = ObjectIdField(primary_key=True, db_column='_id')
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, related_name='members')

    def __str__(self):
        return self.name

class Activity(models.Model):
    id = ObjectIdField(primary_key=True, db_column='_id')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities')
    activity_type = models.CharField(max_length=100)
    duration = models.PositiveIntegerField(help_text='Duration in minutes')
    date = models.DateField()

    def __str__(self):
        return f"{self.user.name} - {self.activity_type} on {self.date}"

class Workout(models.Model):
    id = ObjectIdField(primary_key=True, db_column='_id')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    suggested_for = models.ManyToManyField(User, blank=True, related_name='suggested_workouts')

    def __str__(self):
        return self.name

class Leaderboard(models.Model):
    id = ObjectIdField(primary_key=True, db_column='_id')
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='leaderboards')
    score = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.team.name} - {self.score}"