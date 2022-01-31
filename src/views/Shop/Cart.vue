<template>
  <div class="cart">
    <div class="product">
      <!-- template 占位符 -->
      <template v-for="(item, index) in productList" :key="index">
        <div class="product_header"></div>

        <div v-if="item.count > 0" class="product_item">
          <!-- 选中 -->
          <div
            @click="() => changeCartItemCheck(shopId, item._id)"
            class="product_item_check iconfont"
            v-html="item.check ? '&#xe652;' : '&#xe667;'"
          ></div>
          <img class="product_item_img" :src="item.imgUrl" />
          <div class="product_item_detail">
            <h4 class="product_item_title">{{ item.name }}</h4>
            <p class="product_item_price">
              <span class="product_item_yen">&yen;</span>
              {{ item.price }}
              <span class="product_item_origin">&yen;</span>
              <span style="color:#999;text-decoration: line-through;">{{ item.oldPrice }}</span>
            </p>
          </div>
          <div class="product_number">
            <span
              @click="() => { changeCartItemInfo(shopId, item._id, item, -1) }"
              class="product_number_minus"
            >-</span>
            <!-- {{ cartList?.[shopId]?.[item._id]?.count || 0 }} -->
            {{ item.count || 0 }}
            <span
              @click="() => { changeCartItemInfo(shopId, item._id, item, 1) }"
              class="product_number_plus"
            >+</span>
          </div>
        </div>
      </template>
    </div>
    <div class="check">
      <div class="check_icon">
        <img src="http://www.dell-lee.com/imgs/vue3/basket.png" class="check_icon_img" />
        <div class="check_icon_tag">{{ total }}</div>
      </div>
      <div class="check_info">
        总计:
        <span class="check_info_price">&yen;{{ price }}</span>
      </div>
      <div class="check_btn">去结算</div>
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

import { CommonUseCartEffect } from './commonCartEffect'

const useCartEffect = (shopId) => {
  const { changeCartItemInfo } = CommonUseCartEffect() // 添加减少的方法

  const store = useStore()
  // 获取 store 里的购物车列表
  const cartList = store.state.cartList

  // 选中
  const changeCartItemCheck = (shopId, productId) => {
    store.commit('changeCartItemCheck', {
      shopId,
      productId
    })
  }

  // 计算 总数量
  const total = computed(() => {
    const productList = cartList[shopId]
    let count = 0
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        count += product.count
      }
    }
    return count
  })

  // 计算 总价格
  const price = computed(() => {
    const productList = cartList[shopId]
    let count = 0
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        if (product.check) {
          count += product.count * product.price
        }
      }
    }
    return count.toFixed(2)
  })

  const productList = computed(() => {
    const productList = cartList[shopId] || []
    return productList
  })

  return { total, price, productList, cartList, changeCartItemInfo, changeCartItemCheck }
}

export default {
  name: 'Cart',
  setup () {
    const route = useRoute()
    const shopId = route.params.id // 获取路由传过来的shopId

    // 从useCartEffect() 里获取总数量、总价格、商品列表、添加/删除商品的方法
    const { total, price, productList, changeCartItemInfo, changeCartItemCheck } = useCartEffect(shopId)

    return { total, price, productList, shopId, changeCartItemInfo, changeCartItemCheck }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $bgColor;
  border: 0.01rem solid $dark-bgColor;
}
.check {
  display: flex;
  line-height: 0.5rem;
  height: 0.49rem;
  &_icon {
    width: 0.84rem;
    position: relative;
    &_img {
      width: 0.28rem;
      height: 0.26rem;
      margin: 0.12rem auto;
    }
    &_tag {
      position: absolute;
      right: 0.2rem;
      left: 0.46rem;
      top: 0.04rem;
      padding: 0 0.04rem;
      min-width: 0.2rem;
      height: 0.2rem;
      line-height: 0.2rem;
      transform: scale(0.5);
      transform-origin: left center;
      border-radius: 0.1rem;
      background-color: $hightlight-fontColor;
      font-size: 0.12rem;
      text-align: center;
      color: $bgColor;
    }
  }
  &_info {
    flex: 1;
    color: $content-fontcolor;
    font-size: 0.12rem;
    &_price {
      font-size: 0.18rem;
      color: $hightlight-fontColor;
    }
  }
  &_btn {
    width: 0.98rem;
    background-color: $btn-bgColor;
    color: $bgColor;
    font-size: 0.14rem;
    text-align: center;
    line-height: 0.5rem;
  }
}
.product {
  flex: 1;
  overflow-y: scroll;
  background-color: #fff;
  &_header {
    height: 0.52rem;
    border-bottom: 0.01rem solid #f1f1f1;
  }
  &_item {
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid #f0f0f0;
    position: relative;
    &_check {
      color: #0091ff;
      font-size: 0.2rem;
      line-height: 0.5rem;
      margin-right: 0.1rem;
    }
    &_img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &_title {
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: #333;
    }
    &_sales {
      margin: 0.06rem 0;
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: #333;
    }
    &_price {
      margin: 0.06rem 0 0 0;
      color: red;
      line-height: 0.2rem;
      font-size: 0.14rem;
    }
    &_yen {
      font-size: 0.12rem;
    }
    &_origin {
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: #999;
      text-decoration: line-through;
    }
    .product_number {
      position: absolute;
      bottom: 0.12rem;
      right: 0;
      &_minus,
      &_plus {
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        line-height: 0.2rem;
        border-radius: 50%;
        font-size: 0.2rem;
        text-align: center;
      }
      &_minus {
        border: 0.01rem solid #666;
        color: #666;
        margin-right: 0.05rem;
      }
      &_plus {
        background-color: #0091ff;
        color: #ffffff;
        margin-left: 0.05rem;
      }
    }
  }
}
</style>
