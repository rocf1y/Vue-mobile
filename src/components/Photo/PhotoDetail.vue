<template>
    <div>
      <nav-bar title="图文详情"></nav-bar>
        <div class="photo-title">
            <p>{{imgsInfo.title | convertTitle(17)}}</p>
            <span>发起日期：{{imgsInfo.add_time | convertTime}}</span>
            <span>{{imgsInfo.click}}次浏览</span>
            <span>分类：民生经济</span>
        </div>
        <my-ul>
          <my-li v-for="(item,index) in imgs" :key="index">
            <img class="preview-img" :src="item.src" @click="$preview.open(index, imgs)">
          </my-li>
        </my-ul>
        <div class="photo-desc">
          <p v-html="imgsInfo.content"></p>
        </div>
        <comment :comId="this.$route.params.imgId"></comment>
    </div>
</template>
<script>
export default {
  data() {
    return {
      imgsInfo: {},
      imgs: []
    };
  },
  created() {
    // 获取路由参数
    let imgId = this.$route.params.imgId;
    // 获取图文详情
    this.$axios.get("getimageInfo/" + imgId).then(res => {
      this.imgsInfo = res.data.message[0];
    });
    // 缩略图
    this.$axios.get("getthumimages/" + imgId).then(res => {
      this.imgs = res.data.message;
      // 手动添加图片的宽高属性
      this.imgs.forEach(ele => {
        ele.h = 400,
        ele.w = 600
      })
    });
  }
};
</script>
<style scoped>
li {
  list-style: none;
}

ul {
  margin: 0;
  padding: 0;
}

img {
  width: 100%;
}
.photo-title {
  overflow: hidden;
}

.photo-title,
.photo-desc {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 5px;
  margin-bottom: 5px;
  padding-left: 5px;
}

.photo-title p {
  color: #13c2f7;
  font-size: 20px;
  font-weight: bold;
}

.photo-title span {
  margin-right: 10px;
}

.photo-desc p {
  font-size: 18px;
}
</style>
