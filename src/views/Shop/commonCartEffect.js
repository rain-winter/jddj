import { useStore } from 'vuex'

export const CommonUseCartEffect = () => {
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

  return {
    changeCartItemInfo, cartList
  }
}
