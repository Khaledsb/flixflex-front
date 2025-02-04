<template>
    <div class="container mx-auto px-4 py-6">
      <button @click="$router.back()" class="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
        Back
      </button>
      <MovieDetailComponent v-if="movie" :movie="movie" />
      <p v-else class="text-center text-gray-600">Loading movie details...</p>
    </div>
  </template>
  
  <script lang="ts">
  import MovieDetailComponent from "@/components/MovieDetailComponent.vue";
  import MovieDataService from "@/services/MovieDataService";
  import type { Movie } from "@/types/Movie";
  
  export default {
    name: "MovieDetail",
    components: {
      MovieDetailComponent,
    },
    data() {
      return {
        movie: null as Movie | null, // Initialize as null
      };
    },
    async mounted() {
      const movieId = this.$route.params.id;
        MovieDataService.get(movieId)
        .then((response) => {
          console.log(response.data);
          this.movie = response.data;
        })
        .catch((error) => {
          console.error("Error fetching:", error);
        });
    },
  };
  </script>
  