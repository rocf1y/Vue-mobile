<template>
  <div>
    <nav-bar :title="title"></nav-bar>
    <div class="news-title">
      <p>{{newsInfo.title}}</p>
      <div>
        <span>{{newsInfo.click}}次点击</span>
        <span>分类:民生经济</span>
        <span>添加时间:{{newsInfo.add_time | convertTime}}</span>
      </div>
    </div>
    <div class="news-content" v-html="newsInfo.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsInfo: {},
      title: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    let title = "详情列表";
    switch (from.name) {
      case "goods.detail":
        title = "商品图文介绍";
        break;
      case 'list.detail':
        title = '新闻详情';
        break;
    }
    next(vm => {
      vm.title = title;
    })
  },
  created() {
    // 获取锚点newsId
    let newsId = this.$route.query.newsId;
    // 根据newsId发送请求
    this.$axios
      .get("getnew/" + newsId)
      .then(res => {
        this.newsInfo = res.data.message[0];
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>


<style>
.news-title p {
  color: #0a87f8;
  font-size: 20px;
  font-weight: bold;
}

.news-title span {
  margin-right: 20px;
}

.news-title {
  margin-top: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

/*主体文章的左右距离*/

.news-content {
  padding: 10 5;
}
</style>

