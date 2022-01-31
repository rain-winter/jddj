<template>
  <div class="docker">
    <div
      v-for="(item,index) in dockerList"
      :key="item.icon"
      :class="{'docker_item': true,'docker_item-active':index===0}"
    >
      <div class="iconfont" v-html="item.icon"></div>
      <div class="docker_title">{{item.text}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Doccker',
  setup () {
    const dockerList = [
      { icon: '&#xe6f3;', text: '首页' },
      { icon: '&#xe7e5;', text: '购物车' },
      { icon: '&#xe61e;', text: '订单' },
      { icon: '&#xe660;', text: '我的' }
    ]
    return { dockerList }
  }
}
</script>
<style lang="scss">
.docker {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0.49rem;
  border-top: 1px solid #f1f1f1;
  display: flex;
  &_item {
    flex: 1;
    text-align: center;
    .iconfont {
      margin: 0.07rem 0 0.02rem 0;
      font-size: 0.2rem;
    }
    &-active {
      color: #1fa4fc;
    }
  }
  &_title {
    font-size: 20px;
    transform: scale(0.5, 0.5); // 缩放 横向纵向缩放
    transform-origin: center top;
  }
}
</style>
