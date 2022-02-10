<template>
    <div class="wrapper">
        <div class="top">
            <div class="top_header">
                <div class="iconfont top_header_back">&#xe6f2;</div>确认订单
            </div>
            <div class="top_receiver">
                <div class="top_receiver_title">收获地址</div>
                <div class="top_receiver_address">北京理工大学国防科技园2号楼10层</div>
                <div class="top_receiver_info">
                    <span class="top_receiver_info_name">瑶妹（先生）</span>
                    <span class="top_receiver_info_phone">18911024266</span>
                </div>
                <div class="iconfont top_receiver_enter">&#xe6f2;</div>
            </div>
        </div>
        <div class="products">
            <div class="products_title"></div>
            <div class="products_list">
            </div>
        </div>
    </div>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
@import "../../style/viriables.scss";
.wrapper {
    overflow-y: auto;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0.5rem;
    right: 0;
    background: $dark-bgColor;
}
.top {
    height: 1.96rem;
    position: relative;
    background-image: linear-gradient(
        0deg,
        rgba(0, 145, 255, 0) 4%,
        #0091ff 50%
    );
    background-color: 100% 1.59rem;
    background-repeat: no-repeat;
    &_header {
        padding-top: 0.4rem;
        line-height: 0.24rem;
        color: #ffffff;
        text-align: center;
        position: relative;
        font-size: 0.16rem;
        &_back {
            position: absolute;
            left: 0.18rem;
            font-size: 0.22rem;
        }
    }
    &_receiver {
        position: absolute;
        left: 0.18rem;
        right: 0.18rem;
        bottom: 0;
        background-color: #ffffff;
        height: 1.11rem;
        border-radius: 0.04rem;
        &_title {
            padding: 0.16rem 0 0.14rem 0.16rem;
            line-height: 0.22rem;
            font-size: 0.16rem;
            color: #333;
        }
        &_address {
            line-height: 0.2rem;
            padding: 0 0.4rem 0 0.16rem;
            font-size: 0.14rem;
            color: #333;
        }
        &_info {
            line-height: 0.18rem;
            padding: 0.06rem 0 0 0.16rem;
            color: #666;
            font-size: 0.12rem;
        }
        &_enter {
            position: absolute;
            right: 0.16rem;
            top: 0.5rem;
            color: #666;
            font-size: 0.16rem;
            transform: rotate(180deg);
        }
    }
}
</style>
