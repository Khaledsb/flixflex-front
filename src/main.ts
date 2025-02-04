import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Notifications from "@kyvg/vue3-notification";
import App from './App.vue'
import router from './router'
import './index.css'
// import Echo from 'laravel-echo'

const app = createApp(App)

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: '5369a03090f40c3b6346',
//     cluster : 'eu',
//     forceTLS: true,
//     encryptions: true,
// })

app.use(createPinia())
app.use(router)
app.use(Notifications)
app.mount('#app')
