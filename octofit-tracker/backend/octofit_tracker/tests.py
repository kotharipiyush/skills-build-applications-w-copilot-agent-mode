from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class ModelTests(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Marvel', description='Marvel Superheroes')
        self.user = User.objects.create(name='Spider-Man', email='spiderman@marvel.com', team=self.team)
        self.workout = Workout.objects.create(name='Web Swing', description='Swinging through the city')
        self.activity = Activity.objects.create(user=self.user, activity_type='Swing', duration=30, date='2023-01-01')
        self.leaderboard = Leaderboard.objects.create(team=self.team, score=100)

    def test_user_team(self):
        self.assertEqual(self.user.team.name, 'Marvel')

    def test_leaderboard_score(self):
        self.assertEqual(self.leaderboard.score, 100)

    def test_activity_type(self):
        self.assertEqual(self.activity.activity_type, 'Swing')

    def test_workout_name(self):
        self.assertEqual(self.workout.name, 'Web Swing')
