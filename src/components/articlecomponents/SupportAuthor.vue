<template>
    <div class="support-author">
        <p class="support-content">小礼物走一走，来简书关注我</p>
        <div class="support-btn">赞赏支持</div>
    </div>
</template>

<script>
export default {
    name:'',
    data () {
        return {
        };
    },
}

</script>

<style lang="less" scoped>
.support-author{
    margin-top: 80px;
    text-align: center;

    .support-content{
        margin-bottom: 15px;
        font-size: 17px;
        font-weight: 600;
        color:#999;
    }

    .support-btn{
        display: inline-block;
        padding: 8px 25px;
        border-radius: 20px;
        color:#fff;
        background: @red;
    }
}
</style>