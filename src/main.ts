
import App from './App.vue'
import { createApp } from 'vue'
import { router } from './router'
import { createPinia } from 'pinia'
// Vuetify plugin
import vuetify from './plugins/vuetify'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')