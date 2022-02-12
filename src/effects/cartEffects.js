import { computed } from 'vue'
import { useStore } from 'vuex'

export const CommonUseCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemInfo', {
      shopId,
      productId,
      productInfo,
      num
    })
  }

  // 获取购物车商品列表
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || []
    return productList
  })
  // 获取店铺名字
  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || ''
    return shopName
  })

  // 计算总价
  const calculations = computed(() => {
    const productList = cartList[shopId]?.productList
    const result = { total: 0, price: 0, allChecked: true }
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        result.total += product.count
        if (product.check) {
          result.price += (product.count * product.price)
        }
        if (product.count > 0 && !product.check) {
          result.allChecked = false
        }
      }
    }
    result.price = result.price.toFixed(2)
    return result
  })

  return {
    changeCartItemInfo, cartList, productList, shopName, calculations
  }
}
