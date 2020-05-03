from django.db.models import Avg
from rest_framework import status, viewsets
from rest_framework.response import Response

from .models import Actor, Movie, Review
from .serializers import ActorSerializer, MovieSerializer, ReviewSerializer
from .tasks import sleep


class ActorViewSet(viewsets.ModelViewSet):

    queryset = Actor.objects.all()
    serializer_class = ActorSerializer


class MovieViewSet(viewsets.ModelViewSet):

    serializer_class = MovieSerializer

    def get_queryset(self):
        queryset = Movie.objects.all()

        return queryset.annotate(avg_grade=Avg("reviews__grade"))

    def update(self, request, pk=None):
        instance = self.get_object()
        serializer = self.serializer_class(instance, data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReviewViewSet(viewsets.ModelViewSet):

    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def create(self, request):
        """
        Override to return the movie with it's avg_grade updated
        so we can update vuex on the client side
        """
        super().create(request)

        movie_id = request.data.get("movie")
        queryset = Movie.objects.annotate(avg_grade=Avg("reviews__grade")).get(
            pk=movie_id
        )
        serializer = MovieSerializer(queryset)

        # CELERY call
        sleep.delay()

        return Response(serializer.data, status=status.HTTP_200_OK)
