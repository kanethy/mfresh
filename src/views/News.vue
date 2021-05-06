<template>
  <div>
    <!-- 公司动态 -->
    <!-- 到源代码中 news.html的代码 粘贴到此处 -->

    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2><a href="">首页</a>&gt;<a href="">公司动态</a></h2>
      </div>
    </div>
    <!--页面主体-->
    <!-- 网络请求的数据是异步的，在未加载完成前不应该使用，否则后台会报错。需要判断 -->
    <div class="main container" v-if="data">
      <div class="news">
        <ul>
          <!--<li><span>2016-02-21</span><a href="">空气净化器要逆天？ “玫瑰金”“土豪金”齐上阵</a></li>-->
          <!--<li><span>2016-02-21</span><a href="">净美仕新风净化系统　助力校园新风行动</a></li>-->
          <!--<li><span>2016-02-21</span><a href="">全国新风行动全面启动 助推净美仕战略升级</a></li>-->
          <!--<li><span>2016-02-21</span><a href="">智能空气净化器翻盘：净美仕能否领衔?</a></li>-->
          <li v-for="(item, index) in data.data" :key="index">
            <!-- :to  全称:v-bind:to="js代码" -->
            <router-link :to="`/news_detail/${item.nid}`">{{
              item.title
            }}</router-link>
            <span>{{ item.pubTime | date }}</span>
          </li>
        </ul>
      </div>
      <!-- 分页导航-->
      <div class="pages">
        <a @click="getNews(data.pageNum - 1)" class="" v-if="data.pageNum > 1"
          >上一页</a
        >
        <a class="default" v-else>上一页</a>
        <!-- :class="{样式名:true/false}" -->
        <!-- 在当前页面时,class='cur'才生效 -->
        <!-- 点击哪页就出现那页的数据 -->
        <a
          @click="getNews(item)"
          :class="{ cur: item == data.pageNum }"
          v-for="(item, index) in data.pageCount"
          :key="index"
          >{{ item }}</a
        >
        <!--<a href="">2</a>-->
        <!--<a href="">3</a>-->
        <!--<a href="">4</a>-->
        <!--<a href="">5</a>-->
        <a
          @click="getNews(data.pageNum + 1)"
          v-if="data.pageNum < data.pageCount"
          >下一页</a
        >
        <a class="default" v-else>下一页</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
    };
  },
  mounted() {
    this.getNews(1);
  },

  methods: {
    getNews(pno) {
      let url = "news_select.php?pageNum=" + pno;
      this.axios
        .get(url)
        .then((res) => {
          console.log(res);
          this.data = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style>
/* 分页页数:双击不能选中 */
.pages {
  user-select: none;
  cursor: pointer;
}
</style>