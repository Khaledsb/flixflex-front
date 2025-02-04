<template>
    <div class="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        :src="getMoviePoster(movie.poster_path)"
        :alt="movie.title"
        class="w-full object-cover"
      />
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-2">{{ movie.title }}</h2>
        <p class="text-gray-700 text-sm mb-4">
          <span class="font-semibold">Release Date:</span> {{ movie.release_date }}
        </p>
        <p class="text-gray-700 mb-4">
          <span class="font-semibold">Overview:</span> {{ movie.overview }}
        </p>
        <p class="text-gray-700">
          <span class="font-semibold">Rating:</span> {{ movie.vote_average }} / 10
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "MovieDetailComponent",
    props: {
      movie: {
        type: Object,
        required: true,
      },
    },
    methods: {
      getMoviePoster(path) {
        return path
          ? `https://image.tmdb.org/t/p/w500${path}`
          : "https://via.placeholder.com/500x750?text=No+Image";
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any additional styles if needed */
  </style>
  