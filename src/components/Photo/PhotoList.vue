<template>
  <div class="tmpl">
    <!-- 引入返回导航 -->
		<nav-bar title="图文分享"></nav-bar>
    <div class="photo-header">
      <ul>
        <li v-for="item in categoryInfo" :key="item.id">
          <a href="javascript:;" @click="getImgs(item.id)">{{item.title}}</a>
        </li>
      </ul>
    </div>
    <div class="photo-list">
      <ul>
        <li v-for="item in imgsInfo" :key="item.id">
          <router-link :to="{name:'photo.detail',params:{imgId:item.id}}">
            <img v-lazy="item.img_url">
            <p>
              <span>{{item.title}}</span>
              <br>
              <span>{{item.zhaiyao}}</span>
            </p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      categoryInfo: [],
      imgsInfo: []
    };
  },
  created() {
    // 获取路由参数
    let categoryId = this.$route.params.categoryId;
    // 发送和并请求
    this.$axios
      .all([
        // 获取类别
        this.$axios.get("getimgcategory"),
        // 获取图片信息
        this.$axios.get("getimages/" + categoryId)
      ])
      .then(
        this.$axios.spread((categoryRes, imgRes) => {
          this.categoryInfo = categoryRes.data.message;
          // 因没有全部分类这个选项需要手动添加
          this.categoryInfo.unshift({
            id: 0,
            title: "全部"
          });
          this.imgsInfo = imgRes.data.message;
          if (this.imgsInfo.length == 0) {
            this.$toast({
              message: "没有数据呀",
              duration: 5000
            });
          }
        })
      );
  },
  methods: {
    // 点击任意分类显示对应的数据
    getImgs(id) {
      this.$axios
        .get("getimages/" + id)
        .then(res => {
          this.imgsInfo = res.data.message;
          if (this.imgsInfo == 0) {
            this.$toast({
              message: "没有数据呀",
              duration: 5000
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
	},
	beforeRouteUpdate (to, from ,next) {
		// 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
		this.getImgs(to.params.categoryId);
		next();
	}
};
</script>
<style>
/* 图片懒加载 */
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}

.photo-header ul {
  /*强制不换行*/
  white-space: nowrap;
  overflow-x: auto;
  padding-left: 0px;
  margin: 5;
}

.photo-header li {
  list-style: none;
  display: inline-block;
  margin-left: 10px;
  height: 30px;
  line-height: 30px;
}

.photo-header li>a {
  color: #888;
}
/*下面的图片*/

.photo-list li {
  list-style: none;
  position: relative;
}

.photo-list li img {
  width: 100%;
  height: 230px;
  vertical-align: top;
}

.photo-list ul {
  padding-left: 0px;
  margin: 0;
}

.photo-list p {
  position: absolute;
  bottom: 0px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
  margin-bottom: 0px;
}

.photo-list p span:nth-child(1) {
  font-weight: bold;
  font-size: 16px;
}

</style>
