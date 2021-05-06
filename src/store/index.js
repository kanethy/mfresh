import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //存放使用vueX管理的变量
  state: {
    uid: sessionStorage.getItem("uid"),
    uname:sessionStorage.getItem("uname"),
  },
  //保存操作state 值的方法
  mutations: {
    //用于更新state数据的值
    updateUser(state, args) {
      //获取到的值
      state.uid =args.uid;
      state.uname = args.uname;

      //浏览器不关闭,让数据一直存在,刷新不消失
      sessionStorage.setItem('uid', args.uid);
      sessionStorage.setItem('uname', args.uname);
    }
  },
  //相当于计算属性,可以把state的值变化之后进行反馈
  getters: {
    
  },
  //异步操作
  actions: {
  },
  //拆分 vuex 为多个模块
  modules: {
  }
})
