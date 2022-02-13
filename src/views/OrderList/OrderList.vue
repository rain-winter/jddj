<template>
    <div class="wrapper">
        <div class="title">我的订单</div>
        <div class="orders">
            <div v-for="(item, index) in list" :key="index" class="order">
                <div class="order_title">
                    {{ item.shopName }}
                    <span class="order_status">{{item.isCanceled? '已下单': '已取消'}}</span>
                </div>
                <div class="order_content">
                    <div class="order_content_imgs">
                        <template v-for="(innerItem, innerIndex) in item.products" :key="innerIndex">
                           <!-- 商品图片小于3的时候才展示 -->
                           <img class="order_content_img" :src="innerItem.product.img" />
                        </template>
                    </div>
                    <div class="order_info">
                        <div class="order_info_price">￥{{item.totalPrice}}</div>
                        <div class="order_info_count">共{{item.totalNumber}}件</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <DockerVue :currentIndex="2" />
</template>
<script>
import { reactive, toRefs } from 'vue'
import { $get } from '../../utils/request'
import DockerVue from '../../components/Docker.vue'
// 调用订单接口
const useOrderListEffect = () => {
  // 定义数据
  const data = reactive({ list: [] })

  const getNearByList = async () => {
    const result = await $get('/api/order')
    const orderList = result.data
    // console.log(orderList) // [{…}]

    orderList.forEach(order => {
      console.log('order', order)
      const products = order.products || []
      let totalPrice = 0
      let totalNumber = 0
      products.forEach(productItem => {
        totalNumber += (productItem?.orderSales || 0)
        totalPrice += ((productItem?.product?.price * productItem?.orderSales) || 0)
      })
      order.totalPrice = totalPrice
      order.totalNumber = totalNumber
    })
    data.list = result.data
  }
  getNearByList()
  const { list } = toRefs(data)
  return { list }
}

export default {
  name: 'OrderList',
  components: { DockerVue },
  setup () {
    const { list } = useOrderListEffect()
    return { list }
  }
}
</script>
<style scoped lang="scss">
@import "../../style/viriables.scss";
.wrapper {
    overflow-y: scroll;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0.5rem;
    background-color: rgb(248, 248, 248);
}
.title {
    line-height: 0.44rem;
    background-color: #fff;
    text-align: center;
    color: #333;
    font-size: 0.16rem;
}

.order {
    padding: 0.16rem;
    background-color: #fff;
    margin: 0.16rem 0.18rem;
    &_title {
        line-height: 0.22rem;
        font-size: 0.16rem;
    }
    &_status {
        float: right;
        font-size: 0.14rem;
        color: $light-fontColor;
    }
    &_content {
        display: flex;
        &_imgs {
            flex: 1;
            display: flex;
        }
        &_img {
            width: 0.4rem;
            height: 0.4rem;
            margin-right: 0.12rem;
        }
    }
    &_info {
        width: 0.7rem;
        &_price {
            margin-bottom: 0.04rem;
            line-height: 0.2rem;
            font-size: 0.14rem;
            color: $hightlight-fontColor;
            text-align: right;
        }
        &_count {
            line-height: 0.14rem;
            font-size: 0.12rem;
            color: $content-fontcolor;
            text-align: right;
        }
    }
}
</style>
