<template>
  <div class="content">
    <div class="category">
      <div
        v-for="item in categories"
        :class="{ 'category_item': true, 'category_item-active': (currentTab === item.tab) }"
        :key="item.name"
        @click="handleCateClick(item.tab)"
      >{{ item.name }}</div>
    </div>
    <div class="product">
      <div class="product_item" v-for="(item, index) in list" :key="index">
        <img class="product_item_img" :src="item.imgUrl" />
        <div class="product_item_detail">
          <h4 class="product_item_title">{{ item.name }}</h4>
          <p class="product_item_sales">{{ item.sales }}</p>
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
          {{item.count || 0}}
          <!-- {{ cartList?.[shopId]?.[item._id]?.count || 0 }} -->
          <span
            @click="() => { changeCartItemInfo(shopId, item._id, item, 1) }"
            class="product_number_plus"
          >+</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { $get } from '../../utils/request'
import { CommonUseCartEffect } from './commonCartEffect'

const categories = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit' }
]

/**
 * 和tab切换相关的
 */
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleCateClick = (tab) => {
    currentTab.value = tab
    // console.log(currentTab.value)
  }
  return { currentTab, handleCateClick }
}

/**
 * 获取列表内容相关
 * @param {*} currentTab 让watchEffect依赖与currentTab
 */
const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({
    list: []
  })

  const getContentData = async (tab) => {
    const result = await $get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value
    })
    content.list = result.data
  }

  watchEffect(() => {
    getContentData()
  })

  const { list } = toRefs(content)
  return { list }
}

export default {
  name: 'Content',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { currentTab, handleCateClick } = useTabEffect()

    const { list } = useCurrentListEffect(currentTab, shopId)

    const { changeCartItemInfo } = CommonUseCartEffect()
    return { list, categories, currentTab, changeCartItemInfo, shopId, handleCateClick }
  }
}
</script>
<style lang="scss" scoped>
.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: 0.5rem;
  display: flex;
}
.category {
  width: 0.76rem;
  height: 100%;
  overflow-y: scroll;
  background-color: #f5f5f5;
  &_item {
    line-height: 0.4rem;
    text-align: center;
    color: #333;
    &-active {
      background-color: #ffffff;
    }
  }
}
.product {
  flex: 1;
  overflow-y: scroll;
  &_item {
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid #f0f0f0;
    position: relative;
    &_img {
      width: 0.68rem;
      height: 0.68rem;
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
