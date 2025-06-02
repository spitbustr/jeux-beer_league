import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/styles/site.scss"

Vue.config.productionTip = false
Vue.prototype.$events = new Vue()
// Add library components
const getComponent = require.context("@/views", true, /\.vue$/)
getComponent.keys().forEach(key => {
    Vue.component(key.split("/").pop().split(".")[0], getComponent(key).default)
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

store.dispatch("initialize")
