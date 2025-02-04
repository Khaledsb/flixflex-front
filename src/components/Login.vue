<template>
  <section class="bg-gray-50">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >

      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
          >
            Sign in to your account
          </h1>
          <form class="space-y-4 md:space-y-6" method="post">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Your username</label
              >
              <input
                type="text"
                name="username"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="username"
                v-model="form.inputs.username.value"
                required
              />
              <div v-if="form.inputs.username.error" class="mt-2 error text-red-600 text-left font-normal text-xs mt-0" v-text="form.inputs.username.error"></div>
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Password</label
              >
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                v-model="form.inputs.password.value"
                required
              />
            </div>
            <button
              @click="goToNextStep($event)"
              class="w-full text-white hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-400"
            >
              Sign in
            </button>
            <button
              @click="goToNewAccount($event)"
              class="w-full text-white hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-400"
            >
              Create new account
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import router from "@/router";
import AccountDataService from "../services/AccountDataService";

export default {
  data() {
    return {
      parameters: {},
      form: {
        serverError: null,
        inputs: {
          username: {
            value: null,
            rule: "required",
            error: null,
          } as { [key: string]: any },
          password: {
            value: null,
            rule: "required",
            error: null,
          } as { [key: string]: any },
        } as { [key: string]: any },
      },
    };
  },
  methods: {
    goToNextStep(event: any) {
      const vm = this;

      event.preventDefault();

      AccountDataService.login(
        this.form.inputs.username.value,
        this.form.inputs.password.value
      )
        .then((response) => {
          const token = response.data.token;

          if (token !== null) {
            localStorage.setItem('token', token);
            router.push("/");
          } else {
            console.log(vm.form.serverError);
          }
        })
        .catch((e: any) => {
          const errors = e.response.data.errors;
          let message = '';
          this.form.inputs.username.error = errors;
        });
    },
    goToNewAccount(event: any) {
      event.preventDefault();
      router.push("/register");
    },
  },
};
</script>