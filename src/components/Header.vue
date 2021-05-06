<template>
  <div class="header-box">
    <!-- 组件名要求大驼峰 -->
    <!-- 到源代码中 hearder.html的代码 粘贴到此处 -->
    <header class="header container">
      <h1 class="logo"><a href="index.html" class="link"></a></h1>
      <div class="h_con">
        <ul class="clearfloat">
          <li class="phone">4000-585-116</li>
          <li><a href="#">中文</a></li>
          <li><em>|</em></li>
          <li><a href="#">English</a></li>
          <li><a href="#" class="weixin"></a></li>
          <li><a href="#" class="weibo"></a></li>

          <li v-if="!uid">
            <router-link to="/login" class="h_login">登录</router-link>
          </li>
          <li v-if="!uid"><em>|</em></li>
          <li v-if="!uid">
            <router-link to="/register" class="h_register">注册</router-link>
          </li>

          <li v-if="uid" class="top_user">
            <a href="">{{ uname }}</a>
          </li>
          <li v-if="uid" class="top_quit"><a @click="logout">退出</a></li>
        </ul>
        <div class="search clearfloat">
          <button type="button"></button>
          <input type="text" />
        </div>
      </div>
    </header>
    <!--nav-->
    <nav class="navbar">
      <div class="container">
        <div class="nav">
          <ul>
            <li>
              <!-- vue中的跳转:使用router-link代替a标签,to代替href -->
              <router-link to="/"
                ><span class="icon_home"></span>首页</router-link
              >
            </li>
            <li><router-link to="/about">关于净美仕</router-link></li>
            <!-- 做一个动态的class判断,当this.$route.name=='NewsDetail'时,有这个样式 router-link-exact-active-->
            <li>
              <router-link
                to="/news"
                :class="{
                  'router-link-exact-active': this.$route.name == 'NewsDetail',
                }"
                >公司动态</router-link
              >
            </li>
            <li class="nav_pd">
              <router-link
                to="/product/1"
                :class="{
                  'router-link-exact-active':
                    this.$route.name == 'ProductDetail',
                }"
                >产品中心<span class="icon_pd"></span
              ></router-link>
              <div class="pd_dropdown">
                <router-link to="/product/1">净美仕净化器</router-link>
                <router-link to="/product/2">净美仕滤网</router-link>
              </div>
            </li>
            <li><router-link to="/contact">联系我们</router-link></li>
          </ul>
        </div>
        <div class="s_cart" v-if="uid">
          <router-link to="/cart">
            <span class="icon_cart"></span>购物车(<strong id="cart_sum"
              >0</strong
            >)<span class="icon_sj"></span>
          </router-link>
          <div class="cart_dropdown">
            <!--<h3>您的购物车为空~</h3>-->
            <ul>
              <!--<li>-->
              <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
              <!--<div>-->
              <!--<span>-</span><input type="text" value="2"/><span>+</span>-->
              <!--</div>-->
              <!--<strong>¥1599.00</strong>-->
              <!--<em></em>-->
              <!--</li>-->
              <!--<li>-->
              <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
              <!--<div>-->
              <!--<span>-</span><input type="text" value="2"/><span>+</span>-->
              <!--</div>-->
              <!--<strong>¥1599.00</strong>-->
              <!--<em></em>-->
              <!--</li>-->
            </ul>
            <div class="cd_js clearfloat">
              <span>共计：<strong>0.00</strong></span>
              <a href="#">结算</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
// 读取 vuex 中的值有两种方式
// 1. this.$store.state.xxx
// 2. 类似于语法糖 ...mapState
import { mapState } from "vuex";

export default {
  methods: {
    logout() {
      //退出,清除登录状态的依赖条件,uid和uname
      this.$store.commit("updateUser", { uid: "", uname: "" });
    },
  },
  //计算属性
  computed: {
    //使用vuex辅助函数,mapState 来读取vuex 的state中的值
    ...mapState(["uid", "uname"]),
  },
};
</script>

<style>
/* router-link 激活时的样式 */
/* router-link-active: 模糊匹配样式,例如 /about 路由可以匹配  / /a /ab /abo... */
/* 因为首页的path是/,所有无论点击哪个,首页都会变橘色 */
/* .router-link-active {
  background-color: orange;
} */

/* 精确匹配 */
.nav .router-link-exact-active {
  background-color: orange;
}

.nav .router-link-exact-active:hover {
  background-color: orange !important;
}
</style>