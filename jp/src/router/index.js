import Vue from 'vue'
import Router from 'vue-router'
import Index from "../components";
import Detail from "../components/Detail";
import Add from "../components/Add";
import Code from "../components/Code";
import Test from "../components/Test";
Vue.use(Router)


export default new Router({
  routes: [
    {path:'/', redirect:'/index'},
    {path:'/index', component:Index},
    {path:'/detail', component:Detail},
    {path:'/add', component:Add},
    {path:'/code/:id', component:Code},
    {path:'/test', component:Test},
  ]
})
