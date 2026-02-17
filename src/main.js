import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import FancyButton from "@/components/fancy.vue";

import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const vuetify = createVuetify({
  ssr:true,
  components,
  directives,
})

app.use(vuetify)
app.use(createPinia())
app.use(router)
app.component("FancyButton",FancyButton)

app.mount('#app')
