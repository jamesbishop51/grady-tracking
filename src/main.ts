import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import routes from '~pages'

import { createPinia } from 'pinia'

const pinia = createPinia()
const router = createRouter({
  routes,
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 })
})

const app = createApp(App)

app
  .use(router)
  .use(pinia)
  .mount('#app')
  