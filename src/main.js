import Vue from 'vue'
import App from './App.vue'
import vueTap from 'v-tap'
import store from './store/index'
import fastClick from 'fastclick';

Vue.use(vueTap)
fastClick.attach(document.body);

const app = new Vue({
  store,
  ...App
})

app.$mount('#app')
