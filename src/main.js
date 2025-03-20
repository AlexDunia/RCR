import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import tooltipDirective from './directives/tooltip'
import { setupAuthGuard } from './auth/roleChecks'

const app = createApp(App)
const pinia = createPinia()

// Register global directives
app.directive('tooltip', tooltipDirective)

// Set up router guards for authentication
setupAuthGuard(router)

app.use(pinia)
app.use(router)
app.mount('#app')
