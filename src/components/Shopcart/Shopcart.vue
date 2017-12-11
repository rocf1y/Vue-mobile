<template>
    <div>
        <nav-bar title="购物车"></nav-bar>
        <div class="pay-detail">
            <ul>
                <li class="p-list" v-for="goods in shopcart" :key="goods.id">
                    <mt-switch v-model="goods.isSelected"></mt-switch>
                    <img :src="goods.thumb_path">
                    <div class="pay-calc">
                        <p>商品标题</p>
                        <div class="calc">
                            <span>￥{{goods.sell_price}}</span>
                            <span @click="substract(goods)">-</span>
                            <span>{{goods.pickNum}}</span>
                            <span @click="add(goods)">+</span>
                            <a href="javascript:;" @click="del(goods)">删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="show-price">
            <div class="show-1">
                <p>总计(不含运费):</p>
                <span>已经选择商品{{payment.count}}件，总价￥{{payment.total}}元</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large">去结算</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
// 1:先使用$set来设置新增的两个属性,pickNum,isSelected
// 2:更改一下方式，自定义添加属性
// 3:创建组件的时候，发起请求
// 4:拼接ID URL:/api/goods/getshopcarlist/87,88,89
// 5:引入商品工具对象，获取到goodsObj
// 6:生成ids

import GoodsTools from "../Commons/GoodsTools.js";
import VueBus from "../Commons/VueBus.js";

export default {
  data() {
    return {
      shopcart: []
    };
  },
  created() {
    let goodsObj = GoodsTools.getGoods(); // 获取内存中商品以及对应的数量
    let ids = Object.keys(goodsObj).join(","); // 获取商品id
    let url = `goods/getshopcarlist/${ids}`; // 把商品id拼接到url中
    this.$axios
      .get(url)
      .then(res => {
        this.shopcart = res.data.message; // 要实现自定义属性的数据双向绑定 要提前赋值 然后再更改
        this.shopcart.forEach(ele => {
          this.$set(ele, "pickNum", goodsObj[ele.id]); // 设置自定义属性商品数量
          this.$set(ele, "isSelected", true); // 设置自定义属性 用来判断商品是否选中
        });
      })
      .catch(err => console.log(err));
  },
  methods: {
    // 减
    substract(obj) {
      obj.pickNum--;
    },
    // 加
    add(obj) {
      obj.pickNum++;
    },
    // 删除
    del(obj) {
      if (confirm("亲确定要删除吗？")) {
        // 找到删除的那个元素 从数组中删除
        let index = this.shopcart.findIndex(ele => ele.id == obj.id);
        this.shopcart.splice(index, 1);
      }
    }
  },
  computed: {
    payment: function() {
      let count = 0;
      let total = 0;
      this.shopcart.forEach(ele => {
        // 根据isSelected的值判断 商品总数与总价格
        if (ele.isSelected) {
          count += ele.pickNum; // 商品总数
          total += ele.pickNum * ele.sell_price; // 商品总价格
        }
      });
      return {
        count,
        total
      };
    }
  },
  beforeRouteLeave(to, from, next) {
    if (confirm('亲，确定要离开吗？')) {
      // 把最新的数据保存在本地存储中
      GoodsTools.saveArr(this.shopcart);
      // 通知app接受参数
      VueBus.$emit('changeTotalCount',GoodsTools.getTotalCount());
      next();
    } else {
      next(false)
    }
  }
};
</script>
<style scoped>
.pay-detail ul li {
  list-style: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 3px;
}

.pay-detail ul {
  padding-left: 5px;
  margin-top: 5px;
}

.pay-detail ul li img {
  width: 80px;
  height: 80px;
  display: inline-block;
  vertical-align: top;
  margin-top: 10px;
}

.pay-detail ul li > :nth-child(1),
.pay-detail ul li > :nth-child(3) {
  display: inline-block;
}

.pay-calc p {
  display: inline-block;
  width: 250px;
  overflow: hidden;
  color: blue;
  font-size: 15px;
  margin-bottom: 10px;
}

.pay-detail ul li > :nth-child(1) {
  line-height: 80px;
}

.calc:nth-child(1) {
  color: red;
  font-size: 20px;
}

.calc span:not(:nth-child(1)) {
  border: 1px solid rgba(0, 0, 0, 0.3);
  display: inline-block;
  width: 20px;
  text-align: center;
}

.calc a {
  margin-left: 20px;
}

.show-1,
.show-2 {
  display: inline-block;
}

.show-1,
.show-2 {
  margin-left: 30px;
}

.show-price {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
