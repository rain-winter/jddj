import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    cartList: {
      // 第一级 店铺的id
      // shopId: {
      //   // 第二级  商品id 商品内容
      //   productId: {
      //     title: '番茄250元/份'
      //   }
      // }
      // 1：{
      //   1：{
      //    }
      // }
    }
  },
  mutations: {
    changeCartItemInfo (state, payload) {
      const {
        shopId,
        productId,
        productInfo
      } = payload

      let shopInfo = state.cartList[shopId] // 获取店铺
      if (!shopInfo) {
        shopInfo = {}
      }
      let product = shopInfo[productId] // 获取商品
      if (!product) {
        product = productInfo // 商品不存在，就把传递来的商品赋值给它
        product.count = 0
      }
      product.count = product.count + payload.num
      if (payload.num > 0) {
        product.check = true // 选中状态
      }
      if (product.count < 0) {
        product.count = 0
      }
      shopInfo[productId] = product // 重新给商品赋值
      state.cartList[shopId] = shopInfo
      console.log(shopId, productId, productInfo)
    },
    // 选中方法
    changeCartItemCheck (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId][productId]
      product.check = !product.check
    },
    cleanCartProducts (state, payload) {
      const { shopId } = payload
      state.cartList[shopId] = {}
    }
  },
  actions: {},
  modules: {}
})
