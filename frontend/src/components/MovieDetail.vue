<template>
  <div v-if="movie" class="content">
    <b-card :title="movie.title" body-class="text-center">
      <b-badge>
        {{ movie.avg_grade || 'N/A' }} <b-icon icon="star-fill"></b-icon>
      </b-badge>

      <b-card-group deck>
        <b-card header="Description">
          <p class="card-text mt-2">
            {{ movie.description }}
          </p>
        </b-card>

        <b-card no-body header="Actors">
          <b-list-group flush>
            <b-list-group-item v-for="actor of movie.actors" :key="actor.id">
              {{ actor.first_name }} {{ actor.last_name }}
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-card-group>

      <b-button variant="primary" v-b-modal.modal-edit class="edit-modal-btn">
        Edit
      </b-button>

      <b-form-rating
        variant="warning"
        class="mb-2"
        v-model="grade"
        @change="onAddReview($event)"
      ></b-form-rating>
    </b-card>

    <b-modal id="modal-edit" title="Edit details" @ok="onHandleSubmit">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Description"
          label-for="description-textarea"
          invalid-feedback="Description is required"
        >
          <b-form-textarea
            id="description-textarea"
            v-model="modalData.description"
            required
          ></b-form-textarea>
        </b-form-group>
        <b-form-group
          label="Actors"
          label-for="actor-tags"
          invalid-feedback="At least 1 actor is required"
        >
          <b-form-select v-model="modalData.actors" multiple :select-size="3">
            <b-form-select-option
              v-for="option of actors"
              :key="option.id"
              :value="option"
            >
              {{ option.first_name }}
              {{ option.last_name }}
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
      </form>
    </b-modal>
  </div>
  <div v-else class="no-content">
    No movie available
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'MovieDetail',
    created() {
      this.fetchActors();
    },
    data() {
      return {
        grade: 0
      };
    },
    computed: {
      movie() {
        const movieId = +this.$route.params.id;

        return this.movieById(movieId);
      },
      modalData() {
        return { ...this.movie };
      },
      actors() {
        return this.$store.state.moduleActors.all;
      },
      ...mapGetters('moduleMovies', ['movieById'])
    },
    methods: {
      ...mapActions('moduleMovies', ['updateMovie', 'addReview']),
      ...mapActions('moduleActors', ['fetchActors']),
      onHandleSubmit() {
        return this.updateMovie(this.modalData);
      },
      onAddReview(evt) {
        const review = { movie: this.movie.id, grade: evt };

        return this.addReview(review);
      }
    }
  };
</script>

<style>
  .edit-modal-btn,
  .card-deck {
    margin: 20px;
  }
</style>
