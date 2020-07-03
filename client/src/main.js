import Vue from 'vue'
import App from './App.vue'
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";

import VueRouter from 'vue-router'
import router from './router'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import IconsPlugin from 'bootstrap-vue'

import RumahFormVue from './components/RumahForm.vue'
import MapVue from './components/Map.vue'

// import x5GMaps from 'x5-gmaps'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueFormWizard)
// Vue.use(x5GMaps, { key:'AIzaSyBhwmRyn2gXpj8U4yCbmj8ZHSi3tYQJOiE', libraries:['visualization']})

const routes =[
  { path: '/form', components: RumahFormVue},
  { path: '/map', components: MapVue}
]
const routers = new VueRouter({
  routes,
  mode: 'history'
})

const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

Vue.use(VueApollo);



new Vue({
  apolloProvider,
  router,
  routers,
  render: h => h(App)
}).$mount('#app')