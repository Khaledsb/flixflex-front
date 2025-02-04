<template>
  <header class="bg-gray-900 text-white p-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-xl font-bold">MovieApp</h1>
      <nav>
        <ul class="flex space-x-6">
          <li><a href="#" @click="currentComponent = 'MoviesComponent'" class="hover:text-gray-300">Movies</a></li>
          <li><a href="#" @click="currentComponent = 'FavoriteComponent'" class="hover:text-gray-300">Favorite</a></li>
          <li><a href="#" @click="logout" class="hover:text-red-400">Logout</a></li>
        </ul>
      </nav>
    </div>
  </header>
  <component :is="currentComponent" :key="componentKey" @reload-favorites="reloadFavorite"></component>
  <notifications position="top right" :width="notificationWidth()" :max="4">
    <template #body="props">
      <div
        class="flex flex-cols items-center justify-between vue-custom-notification mt-5 mr-2 lg:mt-5 lg:mr-5"
        :class="props.item.type"
      >
        <div class="flex flex-cols items-center justify-start">
          <div
            class="flex p-2 rounded-2xl h-12 icon-bg"
            :class="props.item.type"
            v-html="icon(props.item.type)"
          ></div>
          <span
            class="flex mx-6 text-left text-base text-gray-600 break-normal"
            v-text="props.item.text"
          ></span>
        </div>
        <div class="hover: cursor-pointer pr-3 close" @click="props.close">
          <svg
            width="10"
            fill="#787878"
            height="10"
            class="text-gray-500"
            id="Layer_1"
            style="enable-background: new 0 0 512 512"
            version="1.1"
            viewBox="0 0 512 512"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"
            />
          </svg>
        </div>
      </div>
    </template>
  </notifications>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import MoviesComponent from "../components/MoviesComponent.vue";
import FavoriteComponent from "../components/FavoriteComponent.vue";
import MovieDataService from "@/services/MovieDataService";
import AccountDataService from "../services/AccountDataService";
import { notify } from "@kyvg/vue3-notification";

export default defineComponent({
  name: "Home",
  components: {
    MoviesComponent,
    FavoriteComponent,
  },
  data() {
    return {
       currentComponent: 'MoviesComponent',
       componentKey: 0, 
    };
  },
  mounted() {
  },
  created() {},
  methods: {
    reloadFavorite() {
      this.currentComponent = "FavoriteComponent";
      if (this.currentComponent === "FavoriteComponent") {
        this.componentKey++; // Force re-render when a favorite is removed
      }
    },
    logout() {
      AccountDataService.logout()
        .then((response) => {
            localStorage.removeItem('token');

            notify({
              text: "Successfully logged out",
              duration: 6000,
              ignoreDuplicates: true,
              type: "success",
            });
            this.$router.push(`/login`);

        })
        .catch((e: any) => {
          notify({
              text: "Error when logged out",
              duration: 6000,
              ignoreDuplicates: true,
              type: "error",
            });
        });
    },
    notificationWidth() {
      if (window.innerWidth < 640) {
        return window.innerWidth - 10;
      }

      return 450;
    },
    icon(type: string) {
      if (type === "success") {
        return `<svg width="34" height="34" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fill-rule="evenodd">
                    <path d="M0 0h34v34H0z" />
                    <g stroke-linecap="round" stroke-linejoin="round" stroke-width="2.04">
                      <path
                        d="M17 29.75h0C9.945 29.75 4.25 24.042 4.25 17h0C4.25 9.945 9.958 4.25 17 4.25h0c7.042 0 12.75 5.708 12.75 12.75h0c0 7.042-5.708 12.75-12.75 12.75z"
                        stroke="#FFF"
                        fill="#FFF"
                      />
                      <path stroke="#0BB91A" d="m22.667 14.167-7.084 7.083-4.25-4.25" />
                    </g>
                  </g>
                </svg>`;
      }

      if (["warning", "error"].includes(type)) {
        return `<svg width="34" height="34" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fill-rule="evenodd">
            <path d="M0 0h34v34H0z" />
            <g stroke-linecap="round" stroke-linejoin="round" stroke-width="2.125">
              <path
                d="m19.874 5.864 10.838 18.989c1.26 2.195-.34 4.954-2.875 4.954H6.134c-2.543 0-4.137-2.747-2.874-4.954L14.096 5.85c1.26-2.239 4.476-2.239 5.749 0l.03.013z"
                stroke="#FFF"
                fill="#FFF"
              />
              <path
                stroke="${type === "warning" ? "#ffa200" : "#e02020"}"
                d="M17 18.587v-5.299M16.999 22.844a.35.35 0 0 0-.355.354.36.36 0 0 0 .355.354.37.37 0 0 0 .354-.354.363.363 0 0 0-.369-.354"
              />
            </g>
          </g>
        </svg>`;
      }

      return `<svg width="34" height="34" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fill-rule="evenodd">
              <path d="M0 0h34v34H0z"/>
              <g stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2">
                  <path class="stroke-primary" d="M17 29.75h0C9.945 29.75 4.25 24.042 4.25 17h0C4.25 9.945 9.958 4.25 17 4.25h0c7.042 0 12.75 5.708 12.75 12.75h0c0 7.042-5.708 12.75-12.75 12.75z" stroke="#FFF" fill="#FFF"/>
                  <path class="stroke-primary" d="M17 24.083V17h-1.417M16.632 11.333a.35.35 0 0 0-.355.354.36.36 0 0 0 .355.355.37.37 0 0 0 .354-.354.363.363 0 0 0-.369-.355"/>
              </g>
          </g>
      </svg>`;
    },
  }
});
</script>
<style>
.vue-custom-notification {

  padding: 10px;
  font-size: 12px;
  color: #262626;
  height: auto;
  text-align: left;


  background: #f8fcff;
  border: 1px solid #0091ff;
  border-radius: 14px;


  &.info {
    background: #f8fcff;
    border-radius: 14px;
  }

  &.success {
    background: #f6fff7;
    border-radius: 14px;
  }

  &.warning {
    background: #fff9f6;
    border: 1px solid #ffa200;
    border-radius: 14px;
  }

  &.error {
    background: #fffbfb;
    border: 1px solid #e02020;
    border-radius: 14px;
  }
}
</style>