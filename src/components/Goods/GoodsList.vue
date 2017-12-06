<template>
  <div :style="'height:' + height">
    <nav-bar title="商品列表"></nav-bar>
    <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :auto-fill="isAutoFill" :bottom-all-loaded="allLoaded">
    <ul>
      <li v-for="goods in goodsInfo" :key="goods.id">
        <router-link :to="{name:'goods.detail',params:{goodsId:goods.id}}">
          <img :src="goods.img_url">
          <div class="title">{{goods.title | convertTitle(10)}}</div>
          <div class="desc">
            <div class="sell">
              <span>￥{{goods.sell_price}}</span>
              <s>￥{{goods.market_price}}</s>
            </div>
            <div class="detail">
              <div class="hot">
                热卖中
              </div>
              <div class="count">
                剩{{goods.stock_quantity}}件
              </div>
            </div>
          </div>
        </router-link>
      </li> 
    </ul>
    </mt-loadmore>
  </div>
</template>
<script>
export default {
  props: ["appRefs"],
  data() {
    return {
      page: "", // 页数
      goodsInfo: [], // 商品列表
      isAutoFill: false, // 是否自动检测，并调用loadBottom
      allLoaded: false, // 数据是否全部加载完毕，如果是，禁止函数调用
      height: ""
    };
  },
  created() {
    // 发送请求页数默认为1
    this.page = this.$route.query.page || 1;
    this.$axios
      .get(`getgoods?pageindex=${this.page}`)
      .then(res => {
        this.goodsInfo = res.data.message;
        // 页数自增 为上拉加载更多做准备
        this.page++;
      })
      .catch(err => console.log(err));
  },
  methods: {
    // 触发上拉函数
    loadBottom() {
      if (this.allLoaded) return;
      this.$axios
        .get(`getgoods?pageindex=${this.page}`)
        .then(res => {
          // 判断是否还有数据
          if (res.data.message.length == 0) {
            this.$toast({
              message: "没有更多的数据了",
              duration: 2000
            });
            // 禁止下拉刷新函数调用
            this.allLoaded = true;
            return;
          }
          // 追加下一页的数据
          this.goodsInfo = this.goodsInfo.concat(res.data.message);
          this.page++;
          // 从loading状态通知回到pull初始状态
          this.$refs.loadmore.onBottomLoaded();
        })
        .catch(err => console.log(err));
    },
    changeHeight() {
      // 改变父盒子高度
      this.height =
        document.documentElement.clientHeight -
        this.appRefs.header.$el.offsetHeight -
        this.appRefs.footer.$el.offsetHeight;
    }
  },
  mounted() {
    // 操作DOM设置高度
    this.changeHeight();
  }
};
</script>
<style scoped>
ul {
  overflow: hidden;
}
li {
  width: 50%;
  float: left;
  padding: 6px;
  box-sizing: border-box;
}

li > a:not(.mui-btn) {
  margin: 0px;
  padding: 0px;
  border: 1px solid #5c5c5c;
  box-shadow: 0 0 4px #666;
  width: 100%;
  display: block;
}

li > a:not(.mui-btn) img {
  width: 100%;
}

.sell > span {
  float: left;
  color: red;
  text-align: left;
}

.detail > .hot {
  float: left;
  text-align: left;
  font-size: 15px;
}

.detail > .count {
  float: right;
  text-align: right;
  font-size: 15px;
}

/*撑开，去除浮动没有的高度*/

.detail {
  overflow: hidden;
}

.desc {
  color: rgba(92, 92, 92, 0.8);
  background-color: rgba(0, 0, 0, 0.2);
}

img {
  height: 200px;
}
</style>
