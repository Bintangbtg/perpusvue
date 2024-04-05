import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store  from './store'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'

const app = createApp(App);

app.component('navbar-component', Navbar);
app.component('sidebar-component', Sidebar);

// Menggunakan Vue Router dan Vuex Store
app.use(router).use(store).mount('#app');