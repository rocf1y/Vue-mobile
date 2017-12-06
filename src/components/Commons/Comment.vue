<template>
  <div class="tmpl">
    <div class="photo-bottom">
      <ul>
        <li class="photo-comment">
          <div>
            <span>提交评论</span>
            <span><a >返回</a></span>
          </div>
        </li>
        <li class="txt-comment">
          <textarea cols="50" v-model="content"></textarea>
        </li>
        <li>
          <mt-button type="primary" size="large" @click="sendComment">提交评论</mt-button>
        </li>
        <li class="photo-comment">
          <div>
            <span>评论列表</span>
            <span>44条评论</span>
          </div>
        </li>
      </ul>
      <ul class="comment-list">
        <li v-for="(item,index) in commentInfo" :key="index">
          {{item.user_name}}：{{item.content}} {{item.add_time | convertTime}}
        </li>
      </ul>
      <mt-button type="danger" size="large" plain @click="loadMore">加载更多</mt-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "comment",
  props: ["comId"],
  data() {
    return {
      id: "", // 当前页面的图文id(路由参数)
      page: "", // 评论页数
      commentInfo: [], // 评论的数据
      content: "", // 提交的评论数据
      hasData: true // 判断响应的数据是否为空
    };
  },
  methods: {
    loadMore() {
      // 如果没有数据 直接return
      if (!this.hasData) return;
      this.$axios
        .get(`getcomments/${this.id}?pageindex=${this.page}`)
        .then(res => {
          // 现有的数据与响应的数据进行拼接
          this.commentInfo = this.commentInfo.concat(res.data.message);
          // 判断是否有数据
          if (res.data.message.length == 0) {
            this.$toast("没有更多的数据了");
            this.hasData = false;
            return;
          }
          // 页数自增
          this.page++;
        });
    },
    sendComment() {
      this.$axios
        .post(`postcomment/${this.id}`, `content=${this.content}`)
        .then(res => {
          // 提交完评论 显示第一页(最新)的数据
          this.loadByPage(1);
          // page=1 便于再次点击加载更多时显示第二页的数据
          this.page = 1;
          this.content = "";
        })
        .catch(err => console.log(err));
    },
    // 获取指定页数的数据函数
    loadByPage(page) {
      this.$axios
        .get(`getcomments/${this.id}?pageindex=${page}`)
        .then(res => {
          this.commentInfo = res.data.message;
          this.page++;
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    // 参数不传默认为1
    this.page = this.$route.query.pageindex || 1;
    // 接受父元素传递参数
    this.id = this.comId;
    // 调用加载评论数据的函数
    this.loadByPage(this.page);
  }
};
</script>
<style scoped>
.photo-comment > div span:nth-child(1) {
  float: left;
  font-weight: bold;
  margin-left: 5px;
}

.photo-comment > div span:nth-child(2) {
  float: right;
}

.photo-comment {
  height: 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  line-height: 30px;
  margin-bottom: 5px;
}

.txt-comment {
  padding: 5 5;
}

.txt-comment textarea {
  margin-bottom: 5px;
}

.comment-list li {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 5px;
  margin-bottom: 5px;
  padding-left: 5px;
}

li {
  list-style: none;
}

ul {
  margin: 0;
  padding: 0;
}
</style>
