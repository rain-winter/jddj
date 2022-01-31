<template>
    <!-- 附近 -->
    <div class="shop">
        <div class="shop_item">
            <img :src="item.imgUrl" />
            <div :class="{ 'shop_content': true, 'shop_bordder': hideBorder ? true : false }">
                <div class="shop_content_title">{{ item.name }}</div>
                <div class="shop_content_tags">
                    <span class="shop_content_tag">月售: {{ item.sales }}&nbsp;</span>
                    <span class="shop_content_tag">起送: {{ item.expressLimit }}&nbsp;</span>
                    <span class="shop_content_tag">基础运费: {{ item.expressPrice }}&nbsp;</span>
                </div>
                <div class="shop_content_highlight">{{ item.slogan }}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'ShopInfo',
  props: ['item', 'hideBorder']
}
</script>
<style lang="scss" scoped>
@import "../style/viriables.scss";
.shop {
    box-sizing: border-box;
    img {
        width: 0.56rem;
        height: 0.56rem;
        margin-top: 0.08rem;
    }
    &_item {
        display: flex;
        margin-top: 0.15rem;
    }
    &_content {
        margin-left: 0.16rem;
        &_title {
            font-size: 0.16rem;
            line-height: 0.22rem;
        }
        &_tags {
            margin-top: 0.08rem;
            line-height: 0.18rem;
            font-size: 0.13rem;
            color: $content-fontcolor;
            &_tag {
                margin-right: 0.16rem;
            }
        }
        &_highlight {
            margin: 0.08rem 0 0 0;
            line-height: 0.18rem;
            font-size: 0.13rem;
            color: #e93b3b;
        }
    }
}
</style>
