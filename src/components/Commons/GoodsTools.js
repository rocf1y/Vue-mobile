let obj = {};
let store = window.localStorage;

// 设置
obj.saveGoods = function (obj) {
  store.setItem('goods', JSON.stringify(obj));
}

// 获取
obj.getGoods = function () {
  return JSON.parse(store.getItem('goods') || '{}');
}

obj.addOrUpdate = function (newGoods) {
  // 获取本地存储数据，没有数据是一个空对象
  let goodsObj = this.getGoods();
  // 判断添加的商品是否在goodsObj中
  if (goodsObj[newGoods.id]) {
    // 如果有追加到对应商品数量中
    goodsObj[newGoods.id] += newGoods.num;
  } else {
    // 没有新建一个key，给定一个值
    goodsObj[newGoods.id] = newGoods.num;
  }
  // 把新的数据保存在本地存储中 
  this.saveGoods(goodsObj)
}

// 获取商品总数
obj.getTotalCount = function () {
  let goodsList = this.getGoods();
  let sum = 0;

  // 获取商品数量
  let arr = Object.values(goodsList);
  arr.forEach(ele => {
    sum += ele;
  })
  return sum;
}

// 保存数对象
obj.saveArr = function (arr) {
  let obj = {};
  arr.forEach(ele => {
    obj[ele.id] = ele.pickNum;
  })
  this.saveGoods(obj);
}

export default obj;