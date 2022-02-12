import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/Login.vue'),
    beforeEnter (to, from, next) {
      const {
        isLogin
      } = localStorage
      console.log('Login---', isLogin)
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register/Register.vue'),
    beforeEnter (to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/shop/:id', // http://localhost:8080/#/shop/2
    name: 'Shop',
    component: () => import('../views/Shop/Shop.vue')
  },
  {
    path: '/cartList',
    name: 'CartList',
    component: () => import('../views/CartList/CartList.vue')
  },
  {
    path: '/orderConfirmation/:id',
    name: 'OrderConfirmation',
    component: () => import('../views/OrderConfirmation/OrderConfirmation.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

/**
 * 路由导航守卫
 * 每次执行跳转时都执行这个方法
 * to 即将调整到的页面
 * from 从哪个页面跳过来的
 */
router.beforeEach((to, from, next) => {
  // isLogin 有值就是true，有字段也是true
  const {
    isLogin
  } = localStorage
  console.log('beforeEach--', isLogin)
  const { name } = to
  const isLoginOrRegister = (name === 'Login' || name === 'Register');
  (isLogin || isLoginOrRegister) ? next() : next({ name: 'Login' })
})

export default router
