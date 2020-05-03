<template>
  <div>
    <div v-if="movies.length" class="content">
      <b-pagination
        v-model="currentPage"
        :total-rows="moviesCount"
        @input="onPageChange"
        per-page="5"
        align="center"
        aria-controls="my-table"
      ></b-pagination>

      <b-table
        id="my-table"
        striped
        hover
        responsive
        @row-clicked="onRowClicked"
        :items="movies"
        :fields="fields"
        per-page="5"
        :current-page="currentPage"
      >
      </b-table>
    </div>

    <div v-else class="no-content">
      No movie available
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MovieList',
    created() {
      this.fetchMovies();
    },
    data() {
      return {
        currentPage: 1,
        fields: [
          { key: 'title', label: 'Title' },
          { key: 'avg_grade', label: 'Grade' }
        ]
      };
    },
    computed: {
      movies() {
        return this.$store.state.moduleMovies.all;
      },
      moviesCount() {
        return this.$store.state.moduleMovies.count;
      },
      pagesVisited() {
        return this.$store.state.moduleMovies.pagesVisited;
      },
      isLoading() {
        return this.$store.state.moduleMovies.isLoading;
      }
    },
    methods: {
      onRowClicked(evt) {
        this.$router.push({ name: 'movie', params: { id: evt.id } });
      },
      onPageChange(evt) {
        this.fetchMovies(evt);
      },
      fetchMovies() {
        // Only consume the API if needed
        if (!this.pagesVisited.includes(this.currentPage)) {
          this.$store.dispatch('moduleMovies/fetchMovies', this.currentPage);
        }
      }
    }
  };
</script>

<style>
  b-spinner {
    margin-right: 5px;
  }
</style>
