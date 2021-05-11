import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import VueMeta from 'vue-meta'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from "./filters/date.filter";
import localizeFilter from './filters/localize.filter'
import currencyFilter from "./filters/currency.filter";
import tooltipDirective from './directives/tooltip.directive'
import Loader from "./components/app/Loader";
import messagePlugin from './utils/message.plugin'
import titlePlugin from './utils/title.plugin'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

firebase.initializeApp({
  apiKey: "AIzaSyDwkYhN7bnl0ngkXaa1fBpf01M_VlXe8cE",
  authDomain: "vue--crm-1ee4d.firebaseapp.com",
  projectId: "vue--crm-1ee4d",
  storageBucket: "vue--crm-1ee4d.appspot.com",
  messagingSenderId: "407875841949",
  appId: "1:407875841949:web:2f2d45da6e67e642d38974",
  measurementId: "G-R9HYKQCZ3D"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }

})

