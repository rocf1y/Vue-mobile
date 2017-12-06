<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(pic,index) in pics" :key="index">
        <a :href="pic.url">
          <img :src="pic.img || pic.src">
        </a>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  name: "my-swipe",
  props: ["url"],
  data() {
    return {
      pics: []
    };
  },
  created() {
    // 发送ajax请求获取图片等相关资源
    this.$axios.get(this.url).then(res => {
      // 得到的数组对象赋值给pics
      this.pics = res.data.message;
    });
  }
};
</script>

<style scoped>
/*轮播图样式*/
.mint-swipe-item img {
  width: 100%;
  height: 100%;
}
.mint-swipe {
  height: 30%;
}
</style>