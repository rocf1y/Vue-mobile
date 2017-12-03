// introduction of resources ---
import Vue from 'vue';

// global module ---
import MyUl from './components/Commons/MyUl.vue';
import MyLi from './components/Commons/MyLi.vue';
Vue.component(MyUl.name,MyUl);
Vue.component(MyLi.name,MyLi);

// introduction of router module ---
import App from './components/App.vue';
import Home from './components/Home/Home.vue';
import Member from './components/Member/Member.vue';
import Shopcart from './components/Shopcart/Shopcart.vue';
import Search from './components/Search/Search.vue';

// vue-router start -<<<<<<
import VueRouter from 'vue-router';
Vue.use(VueRouter);
let router = new VueRouter();
router.addRoutes([
  {path:'/',redirect:{name:'home'}},
  {name:'home',path:'/home',component:Home},
  {name:'member',path:'/member',component:Member},
  {name:'shopcart',path:'/shopcart',component:Shopcart},
  {name:'search',path:'/search',component:Search}
]);
// vue-router end ->>>>>>

// MintUi start -<<<<<<
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUi);
// MintUi end ->>>>>>

// global style ---
import './static/css/global.css';

// Axios start -<<<<<<
import Axios from 'axios';
Vue.prototype.$axios = Axios;
Axios.defaults.baseURL = 'http://vue.studyit.io/api/';
// Axios end ->>>>>>

new Vue({
  el:'#app',
  render: c => c(App),
  router
})