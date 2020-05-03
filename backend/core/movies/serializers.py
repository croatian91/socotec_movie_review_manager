from rest_framework import serializers
from .models import Actor, Movie, Review


class ActorSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()

    class Meta:
        model = Actor
        fields = ("id", "first_name", "last_name")


class MovieSerializer(serializers.ModelSerializer):
    actors = ActorSerializer(many=True)
    avg_grade = serializers.DecimalField(
        required=False, allow_null=True, max_digits=5, decimal_places=2
    )

    class Meta:
        model = Movie
        read_only_fields = ["avg_grade"]
        fields = ("id", "title", "description", "actors", "avg_grade")

    def create(self, validated_data):
        actors = validated_data.pop("actors", [])
        instance = Movie.objects.create(**validated_data)

        for actor_data in actors:
            actor = Actor.objects.get(pk=actor_data.get("id"))

            instance.actors.add(actor)

        return instance

    def update(self, instance, validated_data):
        actors = validated_data.pop("actors", [])
        instance = super().update(instance, validated_data)

        instance.actors.clear()

        for actor_data in actors:
            actor = Actor.objects.get(pk=actor_data.get("id"))

            instance.actors.add(actor)

        return instance


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"
