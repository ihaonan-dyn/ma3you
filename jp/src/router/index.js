import Vue from 'vue'
import Router from 'vue-router'
import Index from "../components";
import Detail from "../components/Detail";
Vue.use(Router)


export default new Router({
  routes: [
    {path:'/', redirect:'/index'},
    {path:'/index', component:Index},
    {path:'/detail', component:Detail},
  ]
})
