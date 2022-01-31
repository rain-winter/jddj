<template>
  <!-- 地址 -->
  <div class="position">
    <span class="iconfont position_icon">&#xe619;</span>
    <span class="position_location">北京理工大学国防科技园2号楼10层</span>
    <span class="iconfont position_notice">&#xe60b;</span>
  </div>
  <!-- 搜索 -->
  <div class="search">
    <span class="iconfont">&#xe62d;</span>
    <span class="search__text">山姆会员商店优惠商品</span>
  </div>
  <!-- banner -->
  <div class="banner">
    <img class="banner_img" src="http://www.dell-lee.com/imgs/vue3/banner.jpg" />
  </div>
  <!-- icons -->
  <div class="icon">
    <figure class="icon_item" v-for="item in iconList" :key="item.desc">
      <img :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`" />
      <figcaption>{{ item.desc }}</figcaption>
    </figure>
  </div>
  <!-- 灰色条 -->
  <div class="greyLine"></div>
</template>
<script>
export default {
  name: 'StaticPart',
  setup () {
    const iconList = [
      { imgName: '超市', desc: '超市便利' },
      { imgName: '菜市场', desc: '菜市场' },
      { imgName: '水果店', desc: '水果店' },
      { imgName: '鲜花', desc: '鲜花绿植' },
      { imgName: '医药健康', desc: '医药健康' },
      { imgName: '家居', desc: '家居时尚' },
      { imgName: '蛋糕', desc: '烘培蛋糕' },
      { imgName: '签到', desc: '签到' },
      { imgName: '大牌免运', desc: '大牌免运' },
      { imgName: '红包', desc: '红包套餐' }
    ]
    return { iconList }
  }
}
</script>
<style scoped lang="scss">
@import "../../style/viriables.scss";
.position {
  display: flex;
  font-size: 0.16rem;
  padding: 0.2rem 0;
  &_icon {
    padding-right: 0.08rem;
  }
  &_notice {
    right: 0.18rem;
  }
  &_location {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
  }
}
// 搜索
.search {
  margin-bottom: 0.12rem;
  line-height: 0.32rem;
  background: #f5f5f5;
  color: #b7b7b7;
  border-radius: 0.16rem;
  .iconfont {
    display: inline-block;
    padding: 0 0.08rem 0 0.16rem;
    font-size: 0.16rem;
  }
  &__text {
    display: inline-block;
    font-size: 0.14rem;
  }
}
// banner
.banner {
  &_img {
    width: 100%;
  }
}
// icon
.icon {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  padding-bottom: 0.15rem;
  &_item {
    width: 20%;
    text-align: center;
    margin-top: 0.15rem;
    font-size: 0.12rem;
    line-height: 0.17rem;
  }
  img {
    width: 0.4rem;
    height: 0.4rem;
  }
}
.greyLine {
  height: 0.1rem;
  background: $content-bgColor;
  margin: 0 -0.18rem; // 给它负值，向外扩展点
}
</style>
