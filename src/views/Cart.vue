<template>
  <div>
    <!-- cart.html 12-69 -->
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2><a href="">首页</a>&gt;<a href="">产品中心</a></h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container">
      <div class="cart">
        <div class="cart_header">
          <span
            >已选商品<em>{{ checkNum }}</em
            >件</span
          >
          <span
            >总金额：<strong>{{ totalPrice }}</strong></span
          >
          <button type="button">结算</button>
        </div>
        <div class="cart_con">
          <div class="cartcon_title">
            <span
              ><input type="checkbox" v-model="isCheckAll" @change="checkAll" />
              全选</span
            >
            <span>商品信息</span>
            <span>单价</span>
            <span>数量</span>
            <span>金额</span>
            <span>操作</span>
          </div>
          <ul>
            <h2 v-if="products.length == 0">购物车中没有任何商品！</h2>
            <li v-for="(item, index) in products" :key="index">
              <input
                type="checkbox"
                class="cart_checkbox"
                v-model="item.checked"
                @change="checkOne"
              />
              <a href="" class="cart_img">
                <img
                  :src="'http://101.96.128.94:9999/mfresh/' + item.pic"
                  alt=""
                />
              </a>
              <a href="" class="cart_title">{{ item.title1 }}</a>
              <i>¥{{ item.price }}</i>
              <div>
                <span @click="updateCount(index, -1)">-</span>
                <input type="text" :value="item.count" />
                <span @click="updateCount(index, 1)">+</span>
              </div>
              <strong>¥{{ item.price * item.count }}</strong>
              <em @click="doDel(index)"></em>
            </li>
            <!--<li>-->
            <!--<input type="checkbox" class="cart_checkbox"/>-->
            <!--<a href="" class="cart_img"><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
            <!--<a href="" class="cart_title">家用除甲醛静音M-8088A</a>-->
            <!--<i>¥1599</i>-->
            <!--<div>-->
            <!--<span>-</span><input type="text" value="2"/><span>+</span>-->
            <!--</div>-->
            <!--<strong>¥1599.00</strong>-->
            <!--<em></em>-->
            <!--</li>-->
          </ul>
        </div>
        <div class="cart_header">
          <span
            >已选商品<em>{{ checkNum }}</em
            >件</span
          >
          <span
            >总金额：<strong>{{ totalPrice }}</strong></span
          >
          <button type="button">结算</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      isCheckAll: false, //全选按钮的状态
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    checkAll() {
      //全选按钮
      this.products.forEach((item) => {
        item.checked = this.isCheckAll;
      });
    },
    checkOne() {
      // 单个按钮选中时, 关联全选按钮的状态
      if (this.products.length == this.checkNum) {
        this.isCheckAll = true;
      } else {
        this.isCheckAll = false;
      }
    },

    updateCount(index, delta) {
      //数量加减
      let { count, did, pid } = this.products[index];

      if (count == 1 && delta == -1) {
        alert("数量最少为1");
        return;
      }

      this.products[index].count = parseInt(count) + delta;

      let url = "cart_detail_update.php";
      let params = `did=${did}&pid=${pid}&count=${this.products[index].count}`;

      this.axios.post(url, params).then((res) => {
        console.log(res);
      });
    },
    doDel(index) {
      //删除购物车的某个商品
      let did = this.products[index].did;

      let url = "cart_detail_delete.php?did=" + did;

      this.axios.get(url).then((res) => {
        console.log(res);

        let { code } = res.data;
        if (code == 1) {
          alert("删除成功");
          this.products.splice(index, 1);
        } else {
          alert("删除失败");
        }
      });
    },
    getData() {
      let url = "cart_detail_select.php?uid=" + this.$store.state.uid;

      this.axios.get(url).then((res) => {
        console.log(res);
        // 把请求下来的数据 每一条 添加一个 是否勾选的属性
        res.data.products.forEach((item) => {
          // checked是自定义属性
          item.checked = false;
        });

        this.products = res.data.products;
      });
    },
  },
  computed: {
    // 计算属性: 值是实时计算的
    checkNum() {
      let num = 0;

      this.products.forEach((item) => {
        if (item.checked) num++;
      });

      return num;
    },
    totalPrice() {
      let total = 0;

      this.products.forEach((item) => {
        if (item.checked) total += item.price * item.count;
      });

      return total;
    },
  },
};
</script>

<style></style>
