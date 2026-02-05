import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import FancyButton from "@/components/fancy.vue";

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component("FancyButton",FancyButton)

app.mount('#app')
