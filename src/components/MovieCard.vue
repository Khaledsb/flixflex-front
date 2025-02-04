<template>
    <div class="bg-gray-800 text-white rounded-lg shadow-md overflow-hidden w-80">
      <img :src="imageUrl(movie.poster_path)" alt="Movie Poster" class="w-full h-96 object-cover">
      <div class="p-4">
        <h3 class="text-lg font-semibold">{{ movie.title }}</h3>
        <p class="text-sm text-gray-400">Release Date: {{ movie.release_date }}</p>
        <p class="mt-2 text-sm line-clamp-3">{{ movie.overview }}</p>
        <div class="mt-3 flex justify-between items-center">
          <span class="text-yellow-400 font-bold">{{ movie.vote_average }}/10</span>
          <button v-if="currentComponent == 'MoviesComponent'" class="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-700" @click="addToFavorite(movie.id)">Favorite</button>
          <button v-else class="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-700" @click="remoevFromFavorite(movie.id)">Remove </button>
          <button class="bg-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-700" @click="goToDetail(movie.id)">Detail</button>
        </div>
      </div>
    </div>
  </template>
  
<script>
import FavoriteDataService from "@/services/FavoriteDataService";
import { notify } from "@kyvg/vue3-notification";

export default {
    props: {
        movie: Object,
    },
    methods: {
        imageUrl(path) {
            return `https://image.tmdb.org/t/p/w500${path}`;
        },
        goToDetail(id) {
            this.$router.push(`/movies/${id}`);
        },
        addToFavorite(id) {
            FavoriteDataService.addToFavorite(id, 'movie')
            .then((response) => {
                notify({
                    text: "Successfully added to favorite",
                    duration: 6000,
                    ignoreDuplicates: true,
                    type: "success",
                });

            })
            .catch((error) => {
                notify({
                    text: "This movie is already in your favorites",
                    duration: 6000,
                    ignoreDuplicates: true,
                    type: "error",
                });
                console.error("Error fetching:", error);
            });
        },
        remoevFromFavorite(id){
            FavoriteDataService.removeFromFavorite(id)
            .then((response) => {
                notify({
                    text: "Successfully removed from favorite",
                    duration: 6000,
                    ignoreDuplicates: true,
                    type: "success",
                });
                this.$emit("removed");
            })
            .catch((error) => {
                notify({
                    text: "error when remove from favorites",
                    duration: 6000,
                    ignoreDuplicates: true,
                    type: "error",
                });
                console.error("Error fetching :", error);
            }); 
        }
    },
    computed: {
        currentComponent() {
            return this.$parent.$options.name;
        },
    },
};
</script>
