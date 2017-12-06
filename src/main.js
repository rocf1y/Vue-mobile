// introduction of resources ------
import Vue from 'vue';

// global module ------
import MyUl from './components/Commons/MyUl.vue';
import MyLi from './components/Commons/MyLi.vue';
import NavBar from './components/Commons/NavBar.vue';
import CommentData from './components/Commons/Comment.vue';
import MySwipe from './components/Commons/MySwipe.vue';
Vue.component(MyUl.name,MyUl);
Vue.component(MyLi.name,MyLi);
Vue.component(NavBar.name,NavBar);
Vue.component(CommentData.name,CommentData);
Vue.component(MySwipe.name,MySwipe);

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
import GoodsList from './components/Goods/GoodsList.vue';
import GoodsDetail from './components/Goods/GoodsDetail.vue';


// global filter ------
import Moment from 'moment';
Vue.filter('convertTime',(value) => { 
  return Moment(value).format('YYYY-MM-DD');
})
Vue.filter('convertTitle',(value, limit) => {
  if (!value) return;
  if (value.length > limit) {
    return value.substr(0, limit) + '...';
  }
  return value;
})

// vue-router start ------
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
  {name:'photo.detail',path:'/photo/detail/:imgId',component:PhotoDetail},
  {name:'goods.list',path:'/goods/list',component:GoodsList},
  {name:'goods.detail',path:'/goods/detail/:goodsId',component:GoodsDetail}
]);

// MintUi start -------
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUi);

// global style ------
import './static/css/global.css';

// Axios start ------
import Axios from 'axios';
Vue.prototype.$axios = Axios;
Axios.defaults.baseURL = 'http://vue.studyit.io/api/';

new Vue({
  el:'#app',
  render: c => c(App),
  router
})