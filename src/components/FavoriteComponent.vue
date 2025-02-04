<template>
    <div class="p-6">
      <h2 class="text-2xl font-semibold">Favorites</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6" v-if="movies.length > 0">
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" @removed="$emit('reload-favorites')"/>
      </div>
      <div v-else>
         Favorite is empty
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import FavoriteDataService from "@/services/FavoriteDataService";
  import MovieCard from "./MovieCard.vue";
  import type { Movie } from "@/types/Movie";

  export default {
  name: "FavoriteComponent",
  components: {
    MovieCard,
  },
  emits: ["reload-favorites"],
  data() {
  return {
    movies: [] as Movie[],
    currentComponent: 'FavoriteComponent',
  };
},
  mounted() {
    this.fetchMovies();
  },
  created() {},
  methods: {
    async fetchMovies(page = 1) {
      FavoriteDataService.getAll(page)
        .then((response) => {
        this.movies = response.data;
      })
        .catch((error) => {
        console.error("Error fetching:", error);
      });
    },
  },
  };
  </script>
  