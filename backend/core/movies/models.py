from django.db import models


class Actor(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)

    def __str__(self):
        return "{} {}".format(self.first_name, self.last_name)


class Movie(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()
    actors = models.ManyToManyField(Actor)

    def __str__(self):
        return self.title


class Review(models.Model):
    grade = models.FloatField()
    movie = models.ForeignKey(Movie, related_name="reviews", on_delete=models.CASCADE)
