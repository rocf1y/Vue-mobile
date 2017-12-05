// introduction of resources ------
import Vue from 'vue';

// global module ------
import MyUl from './components/Commons/MyUl.vue';
import MyLi from './components/Commons/MyLi.vue';
import NavBar from './components/Commons/NavBar.vue';
Vue.component(MyUl.name,MyUl);
Vue.component(MyLi.name,MyLi);
Vue.component(NavBar.name,NavBar);

// vue-preview ------
import VuePreview from 'vue-preview';
Vue.use(VuePreview)

// introduction of router module ------
import App from './components/App.vue';
import Home from './components/Home/Home.vue';
import Member from './components/Member/Member.vue';
import Shopcart from './components/Shopcart/Shopcart.vue';
import Search from './components/Search/Search.vue';
import NewsList from './components/News/NewsList.vue';
import NewsDetail from './components/News/NewsDetail.vue';
import PhotoList from './components/Photo/PhotoList.vue';
import PhotoDetail from './components/Photo/PhotoDetail.vue';

// global filter -<<<<<<
import Moment from 'moment';
// time
Vue.filter('convertTime',(value) => { 
  return Moment(value).format('YYYY-MM-DD');
})
// title
Vue.filter('convertTitle',(value, limit) => {
  if (!value) {return};
  if (value.length > limit) {
    return value.substr(0, limit) + '...';
  }
  return value;
})
// global filter ->>>>>>

// vue-router start -<<<<<<
import VueRouter from 'vue-router';
Vue.use(VueRouter);
let router = new VueRouter();
router.addRoutes([
  {path:'/',redirect:{name:'home'}},
  {name:'home',path:'/home',component:Home},
  {name:'member',path:'/member',component:Member},
  {name:'shopcart',path:'/shopcart',component:Shopcart},
  {name:'search',path:'/search',component:Search},
  {name:'news.list',path:'/news/list',component:NewsList},
  {name:'list.detail',path:'/news/detail',component:NewsDetail},
  {name:'photo.list',path:'/photo/list/:categoryId',component:PhotoList},
  {name:'photo.detail',path:'/photo/detail/:imgId',component:PhotoDetail}
]);
// vue-router end ->>>>>>

// MintUi start -<<<<<<
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUi);
// MintUi end ->>>>>>

// global style ------
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