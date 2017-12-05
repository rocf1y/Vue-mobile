<template>
  <div>
    <h3 @click="back">&nbsp< 返回</h3>
    <h3 class="title">{{title}}</h3>
  </div>
</template>
<script>
export default {
  name: "nav-bar",
  props: ["title"],
  methods: {
    back() {
      this.$router.go(-1);
    }
	}
};
</script>

<style scoped>
div {
  background-color: #f7f7f7;
  width: 100%;
  height: 50px;
	overflow: hidden;
}
h3 {
  float: left;
  height: 50px;
  line-height: 50px;
  margin: 0;
  padding: 0;
  color: #555;
  font-style: normal;
}

.title {
  margin-left: 25%;
}
</style>


