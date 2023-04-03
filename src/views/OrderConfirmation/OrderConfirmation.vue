<template>
    <div class="wrapper">
        <TopArea />
        <ProductList />
        <Order />
    </div>
</template>
<script>
import TopArea from './TopArea.vue'
import ProductList from './ProductList.vue'
import Order from './Order.vue'
export default {
  name: 'OrderConfirmation',
  components: { TopArea, ProductList, Order }
}
</script>
<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.wrapper {
    overflow-y: auto;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0.5rem;
    right: 0;
    background: $dark-bgColor;
}

</style>
