
import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import App2 from './App2.vue'
// import './assets/main.css'
library.add(fas)
import './styles/index.css'

createApp(App2)
.mount('#app')
