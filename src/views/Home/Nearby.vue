<template>
  <p class="gop">附近店铺</p>
  <router-link v-for="item in nearbyList" :to="`/shop/${item._id}`" :key="item._id">
    <ShopInfo :item="item" />
  </router-link>
</template>
<script>
import { reactive } from 'vue'
import { $get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'
/**
 * 处理 首页店铺的逻辑
 */
const useNearByEffect = () => {
  const nearbyList = reactive([])

  const getNearbyList = async () => {
    const res = await $get('/api/shop/hot-list')
    nearbyList.push(...res.data)
  }

  return { nearbyList, getNearbyList }
}

export default {
  name: 'Nearby',
  components: {
    ShopInfo
  },
  setup () {
    const { nearbyList, getNearbyList } = useNearByEffect()

    getNearbyList()

    return { nearbyList }
  }
}

</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.gop {
  font-size: 0.18rem;
  color: #333333;
  list-style: 0.25rem;
  padding: 0.2rem 0 0;
  font-weight: 800;
}
</style>
