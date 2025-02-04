<template>
    <div class="p-6">
      <h2 class="text-2xl font-semibold">Movies</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>
      <!-- Pagination Controls -->
    <div class="mt-6 flex justify-center space-x-2">
      <button 
        @click="fetchMovies(currentPage - 1)" 
        :disabled="currentPage <= 1"
        class="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
      >
        Prev
      </button>

      <button 
        @click="fetchMovies(currentPage + 1)" 
        :disabled="currentPage >= totalPages"
        class="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
    </div>
  </template>
  
  <script lang="ts">
  import MovieDataService from "@/services/MovieDataService";
  import MovieCard from "./MovieCard.vue";
  import type { Movie } from "@/types/Movie";

  export default {
  name: "MoviesComponent",
  components: {
    MovieCard,
  },
  data() {
  return {
    movies: [] as Movie[],
    currentComponent: 'MoviesComponent',
    currentPage: 1,
    totalPages: 1
  };
},
  mounted() {
    this.fetchMovies();
  },
  created() {},
  methods: {
    async fetchMovies(page = 1) {
      MovieDataService.getAll(page)
        .then((response) => {
          this.movies = response.data.data;
          this.currentPage = response.data.current_page;
          this.totalPages = response.data.last_page;
        })
        .catch((error) => {
          console.error("Error fetching:", error);
        });
    },
  },
  };
  </script>
  