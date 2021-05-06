<template>
  <div>
    <!-- 根组件:单页应用实际呈现出来的页面 -->
    <!-- 具体加载流程:index.html->main.js->App.vue -->
    <Header />
    <!-- router-view:会根据URL地址中的路径变化,显示为不同的组件 -->
    <!-- 路径和组件对应关系的配置:router/index.js中 -->
    <router-view />
    <Footer />
  </div>
</template>

<script>
//组件的使用分3步:引入->注册->使用
//1,引入
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  //2,注册
  // components{Header:Header}
  components: { Header, Footer },
};
</script>

<style>
/* 复制源代码的CSS文件夹,和image文件夹,到此文件的assets文件中,因为这些都是静态文件,所以放 assets中*/
/* 引入css文件 */
/* 在css里面引入其他的css文件,用@import */
@import "./assets/css/common.css";
@import "./assets/css/mycss.css";
</style>