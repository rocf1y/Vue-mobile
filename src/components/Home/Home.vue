<template>
  <div>
    <!-- 轮播图 -->
    <my-swipe url="getlunbo"></my-swipe>
    <!-- 九宫格 -->
    <my-ul>
      <my-li v-for="(item,index) in homeRouters" :key="index">
        <router-link :to="item.router">
          <div :class="'bgImg ' + item.className">
            {{item.title}}
          </div>
        </router-link>
      </my-li>
    </my-ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pics: [],
      homeRouters: [
        { title: "新闻列表", className: "new", router: {name: 'news.list'} },
        { title: "图文分享", className: "picShare", router: {name: 'photo.list',params: {categoryId: 0}} },
        { title: "商品列表", className: "goodShow", router: {name: 'goods.list'} },
        { title: "留言反馈", className: "feedback", router: {name: 'news.list'} },
        { title: "搜索资讯", className: "search", router: {name: 'news.list'} },
        { title: "联系我们", className: "callme", router: {name: 'news.list'} }
      ]
    };
  }
};
</script> 

<style scoped>
/* 轮播图样式 */
.mint-swipe-item img {
  width: 100%;
}
.mint-swipe {
  height: 33%;
}
/* 九宫格样式 */
.bgImg {
  background-size: 50px;
  background-repeat: no-repeat;
  background-position: 28px 35px;
  font-size: 14px;
  font-family: "Microsoft YaHei";
}

li a {
  color: black;
  display:block;
}
.new {
  background-image: url("../../static/img/news.png");
}
.picShare {
  background-image: url("../../static/img/picShare.png");
}
.goodShow {
  background-image: url("../../static/img/goodShow.png");
}
.feedback {
  background-image: url("../../static/img/feedback.png");
}
.search {
  background-image: url("../../static/img/search.png");
}
.callme {
  background-image: url("../../static/img/callme.png");
}
</style>