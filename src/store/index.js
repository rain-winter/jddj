import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    cartList: {
      // 第一级 店铺的id
      // shopId: {
      //   shopName: '沃尔玛',
      //   productList: {
      //     productId: {
      //       title: '番茄250元/份'
      //     }
      //   }
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

      const shopInfo = state.cartList[shopId] || { shopName: '', productList: {} } // 获取店铺

      let product = shopInfo.productList[productId] // 获取商品
      if (!product) { // 商品不存在
        productInfo.count = 0
        product = productInfo // 传递过来的商品赋值给当前的product
      }
      // 商品存在就执行
      product.count = product.count + payload.num;
      // 传递过来的数量>0，就执行
      (payload.num > 0) && (product.check = true);
      (product.count < 0) && (product.count = 0)

      shopInfo.productList[productId] = product // 重新给商品赋值
      state.cartList[shopId] = shopInfo
      console.log(shopId, productId, productInfo)
    },
    // 选中方法
    changeCartItemCheck (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
    },
    // 清空购物车
    cleanCartProducts (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
    },
    // 处理全部的选中
    selectCartItemChecked (state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId].productList
      if (products) {
        for (const i in products) {
          const product = products[i]
          product.check = true
        }
      }
    },
    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || { shopName: '', productList: {} }

      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
    }
  },
  actions: {},
  modules: {}
})
