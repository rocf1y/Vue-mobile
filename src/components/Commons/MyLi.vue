<template>
  <div>
    <li>
      <!-- 图片分享或者首页九宫格的组件 -->
      <slot></slot>
    </li>
  </div>
</template>

<script>
export default {
  name: 'my-li'
};
</script>

<style scoped>
li {
  float: left;
  height: 20%;
  line-height: 210px;
  width: 33%;
  margin: 1 1 0 0;
  text-align: center;
  position: relative;
}
</style>