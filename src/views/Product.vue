<template>
  <div>
    <!-- 产品中心接口 -->
    <!-- 到源代码中 product.html的代码 粘贴到此处 -->

    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2><a href="">首页</a>&gt;<a href="">产品中心</a></h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container" v-if="data">
      <div class="pl_header">
        <router-link to="/product/1" :class="{ cur: type == 1 }"
          >净美仕净化器</router-link
        >
        <router-link to="/product/2" :class="{ cur: type == 2 }"
          >净美仕滤网</router-link
        >
      </div>
      <!-- 产品列表-->
      <ul class="product_list clearfloat">
        <li v-for="(item, index) in data.data" :key="index">
          <router-link :to="`/product_detail/${item.pid}`">
            <img :src="'http://101.96.128.94:9999/mfresh/' + item.pic" alt="" />
          </router-link>
          <div class="pdlist_text clearfloat">
            <h3>
              <p>{{ item.model }}</p>
              <span>{{ item.title2 }}</span>
            </h3>
            <router-link :to="`/product_detail/${item.pid}`"
              >查看详情</router-link
            >
          </div>
        </li>

        <!--<li>-->
        <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
        <!--<div class="pdlist_text clearfloat">-->
        <!--<h3>-->
        <!--<p>M-8088A</p>-->
        <!--<span>带“大脑”的空气净化器</span>-->
        <!--</h3>-->
        <!--<a href="">查看详情</a>-->
        <!--</div>-->
        <!--</li>-->
        <!--<li>-->
        <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
        <!--<div class="pdlist_text clearfloat">-->
        <!--<h3>-->
        <!--<p>M-8088A</p>-->
        <!--<span>带“大脑”的空气净化器</span>-->
        <!--</h3>-->
        <!--<a href="">查看详情</a>-->
        <!--</div>-->
        <!--</li>-->
        <!--<li>-->
        <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
        <!--<div class="pdlist_text clearfloat">-->
        <!--<h3>-->
        <!--<p>M-8088A</p>-->
        <!--<span>带“大脑”的空气净化器</span>-->
        <!--</h3>-->
        <!--<a href="">查看详情</a>-->
        <!--</div>-->
        <!--</li>-->
        <!--<li>-->
        <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
        <!--<div class="pdlist_text clearfloat">-->
        <!--<h3>-->
        <!--<p>M-8088A</p>-->
        <!--<span>带“大脑”的空气净化器</span>-->
        <!--</h3>-->
        <!--<a href="">查看详情</a>-->
        <!--</div>-->
        <!--</li>-->
        <!--<li>-->
        <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
        <!--<div class="pdlist_text clearfloat">-->
        <!--<h3>-->
        <!--<p>M-8088A</p>-->
        <!--<span>带“大脑”的空气净化器的空气净化器的空气净化器</span>-->
        <!--</h3>-->
        <!--<a href="">查看详情</a>-->
        <!--</div>-->
        <!--</li>-->
      </ul>
      <!-- 分页导航-->
      <div class="pages">
        <a @click="getData(data.pageNum - 1)" v-if="data.pageNum > 1" class=""
          >上一页</a
        >
        <a href="" class="default" v-else>上一页</a>
        <a
          @click="getData(item)"
          v-for="(item, index) in data.pageCount"
          :key="index"
          :class="{ cur: item == data.pageNum }"
          >{{ item }}</a
        >
        <!--<a href="">1</a>-->
        <!--<a href="" class="cur">2</a>-->
        <!--<a href="">3</a>-->
        <!--<a href="">4</a>-->
        <!--<a href="">5</a>-->
        <a
          @click="getData(data.pageNum + 1)"
          class=""
          v-if="data.pageNum < data.pageCount"
          >下一页</a
        >
        <a href="" class="default" v-else>下一页</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 监听路由参数的变化, 发送不同请求
  // 两种方式监听: watch,  路由的生命周期
  data() {
    return {
      //类型的默认值从路由中读取
      type: this.$route.params.type,
      data: {},
    };
  },
  // 路由参数变更, 不会重新出发 挂载 操作
  // /product/1  -> /product/2:  参数从1->2  页面还是product: 不会重新出发 mounted
  mounted() {
    this.getData(1);
  },
  beforeRouteUpdate(to, from, next) {
    // https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    console.log(to, from);
    //路由变化时, 不会初始化当前组件, 在此处更新路由参数!
    this.type = to.params.type;

    //参数发生变化时更新页面
    this.getData(1);

    // next: 下一个
    // 当重写了 某个路由的周期时, 如果不调用next() 则路由就会停在此处. 路由就无法正常运作.
    // next(): 代表继续向下进行

    next();
  },
  methods: {
    getData(pno) {
      let url = `product_select.php?type=${this.type}&pageNum=${pno}`;
      this.axios.get(url).then((res) => {
        console.log(res);
        this.data = res.data;
      });
    },
  },
};
</script>

<style>
.pages {
  user-select: none;
  cursor: pointer;
}
</style>