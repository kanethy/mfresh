<template>
  <div>
    <!-- 新浪云服务器上线地址:http://mfresh.applinzi.com -->
    <!-- 产品详情页 -->
    <!-- 到源代码中 product_details.html的代码 粘贴到此处 -->

    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2>
          <a href="">首页</a>&gt;<a href="">产品中心</a>&gt;<a href=""
            >净美仕净化器</a
          >
        </h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container" v-if="data">
      <div class="pd_info clearfloat">
        <div class="pdinfo_img">
          <img :src="'http://101.96.128.94:9999/mfresh/' + data.pic" alt="" />
        </div>
        <div class="pdinfo_text">
          <h2>{{ data.title1 }}</h2>
          <ul>
            <li>型号：{{ data.model }}</li>
            <li>功能：{{ data.func }}</li>
            <li>噪音：{{ data.noise }}</li>
            <li>风量：{{ data.wind }}</li>
            <li>适用对象：{{ data.applyTo }}</li>
            <li>适用面积：{{ data.size }}</li>
            <li>空气净化能效等级：{{ data.level }}</li>
          </ul>
          <p>
            价格：<span>¥{{ data.price }}</span
            ><strong id="price"></strong>
          </p>
          <a @click="addCart" id="addCart"
            ><span class="icon_cart"></span>加入购物车</a
          >
        </div>
      </div>
      <div class="details_box">
        <h2 class="title">产品详情</h2>
        <div class="pd_details" v-html="transHTML(data.detail)">
          <!--<p>家用除甲醛静音M-8088A，带大脑的空气净化器。家用除甲醛静音M-8088A，带大脑的空气净化器。家用除甲醛静音M-8088A，带大脑的空气净化器。家用除甲醛静音M-8088A，带大脑的空气净化器。家用除甲醛静音M-8088A，带大脑的空气净化器。家用除甲醛静音M-8088A，带大脑的空气净化器。家用除甲醛静音M-8088A，带大脑的空气净化器。</p>-->
          <!--<img src="product-imgs/m8088a/01.jpg" alt=""/>-->
          <!--<img src="product-imgs/m8088a/02.jpg" alt=""/>-->
          <!--<img src="product-imgs/m8088a/03.jpg" alt=""/>-->
          <!--<img src="product-imgs/m8088a/04.jpg" alt=""/>-->
          <!--<img src="product-imgs/m8088a/05.jpg" alt=""/>-->
          <!--<img src="product-imgs/m8088a/06.jpg" alt=""/>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //props: 正常是用来接收属性传参的,例:<product name="xxx" />
  //此处就要写: props['name']
  //路由配置中,书写 props:true 属性,则 此处就可以利用props来接收路由参数
  props: ["pid"],
  data() {
    return {
      data: {},
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let url = "product_detail.php?pid=" + this.pid;
      this.axios.get(url).then((res) => {
        console.log(res);
        this.data = res.data;
      });
    },
    transHTML(html) {
      if (!html) return "";

      return html.replace(
        /src="product-imgs/g,
        'src="http://101.96.128.94:9999/mfresh/product-imgs'
      );
    },
    //添加到购物车
    addCart() {
      //能够添加到购物车，表明已经登录，就可以拿到uid
      let uid = this.$store.state.uid;
      if (uid) {
        let url = "cart_detail_add.php";
        let params = `uid=${uid}&pid=${this.pid}`;
        this.axios.post(url, params).then((res) => {
          console.log(res);
        });
      } else {
        alert("很抱歉您还未登录,请登录后再执行此操作!");
        this.$router.push({ path: "/login" });
      }
    },
  },
};
</script>

<style>
</style>

