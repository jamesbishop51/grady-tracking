import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import './style.css'
import App from './App.vue'

import generatedRoutes from '~pages'

const routes = setupLayouts(generatedRoutes)

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
  