<template>
    <div class="order">
        <div class="order__price">实付金额: ￥{{calculations.price}}</div>
        <div @click="handleShowConfirmChange" class="order__btn">提交订单</div>
    </div>
    <div class="mask" v-if="showConfirm">
        <div class="mask__content">
            <h3 class="mask__content__title">确认离开收银台</h3>
            <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
            <div class="mask__content__btns">
                <div @click="handleConfirmOrder(true)" class="mask__content__btn mask__content__btn--first">取消订单</div>
                <div @click="handleConfirmOrder(false)" class="mask__content__btn mask__content__btn--last">确认支付</div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { CommonUseCartEffect } from '../../effects/cartEffects'
import { $post } from '../../utils/request'

// 蒙层展示相关的逻辑
const useShowMaskEffect = () => {
  const showConfirm = ref(false)
  const handleShowConfirmChange = (status) => {
    showConfirm.value = status
  }
  return { showConfirm, handleShowConfirmChange }
}

const useMakeOrderEffect = (shopId, shopName, productList, address) => {
  const router = useRouter()
  const store = useStore()
  const handleConfirmOrder = async (isCanceled) => {
    const products = []
    for (const i in productList.value) {
      const product = productList.value[i]
      products.push({
        id: parseInt(product._id, 10),
        num: product.count
      })
    }
    try {
      //   请求后台订单接口 (2个接口提交和取消)
      const result = await $post('/api/order', {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products
      })
      console.log(result)
      if (result?.errno === 0) {
        store.commit('clearCartData', shopId)
        router.push({ name: 'OrderList' })
      }
    } catch (e) {

    }
  }
  return { handleConfirmOrder }
}

export default {
  name: 'Order',
  setup () {
    const route = useRoute()

    const shopId = parseInt(route.params.id)
    const { calculations, shopName, productList } = CommonUseCartEffect(shopId)

    const { handleConfirmOrder } = useMakeOrderEffect(shopId, shopName, productList, 'address')
    const { showConfirm, handleShowConfirmChange } = useShowMaskEffect()
    return { calculations, handleConfirmOrder, showConfirm, handleShowConfirmChange }
  }
}

</script>
<style scoped lang="scss">
@import '../../style/viriables.scss';
.order {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: .49rem;
  line-height: .49rem;
  background: $bgColor;
  &__price {
    flex: 1;
    text-indent: .24rem;
    font-size: .14rem;
    color: $content-fontcolor;
  }
  &__btn {
    width: .98rem;
    background: #4FB0F9;
    color: #fff;
    text-align: center;
    font-size: .14rem;
  }
}
.mask {
  z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, .5);
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.56rem;
    background: $bgColor;
    text-align: center;
    border-radius: .04rem;
    &__title {
      margin: .24rem 0 0 0;
      line-height: .26rem;
      font-size: .18rem;
      color: $content-fontcolor;
    }
    &__desc {
      margin: .08rem 0 0 0;
      font-size: .14rem;
      color: $medium-fontColor;
    }
    &__btns {
      display: flex;
      margin: .24rem .58rem;
    }
    &__btn {
      flex: 1;
      width: .8rem;
      line-height: .32rem;
      border-radius: .16rem;
      font-size: .14rem;
      &--first {
        margin-right: .12rem;
        border: .01rem solid $btn-bgColor;
        color: $btn-bgColor;
      }
      &--last {
        margin-left: .12rem;
        background: $btn-bgColor;
        color: #fff;
      }
    }
  }
}
</style>
