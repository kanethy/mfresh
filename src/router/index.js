import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Contact from '../views/Contact.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
  {
    path: '/about',
    name: 'About',
    // 懒加载写法,用到的时候再引入
    component: () => import('../views/About.vue')
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('../views/News.vue')
  },
  {
    //:代表是参数
    path: '/news_detail/:nid',
    name: 'NewsDetail',
    component: () => import('../views/NewsDetail.vue')
  },
  {
    path: '/product/:type',
    name: 'Product',
    component: () => import('../views/Product.vue')
  },
  {
    //:代表是参数
    path: '/product_detail/:pid',
    name: 'ProductDetail',
    component: () => import('../views/ProductDetail.vue'),
    //此属性代表可以通过属性来接收路由参数
    props:true,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
   {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue')
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
