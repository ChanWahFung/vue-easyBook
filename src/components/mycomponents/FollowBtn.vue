<template>
    <div class="follow-btn flex-1" :class="{follow:follow}" @click="follow=!follow">
        <div v-if="follow">
            <span>已关注</span>
        </div>
        <div v-else>
            <span class="icon iconfont icon-guanzhu"></span>
            <span>关注</span>
        </div>
        
    </div>
</template>

<script>
export default {
    name:'',
    data () {
        return {
            follow:false
        };
    },
}

</script>

<style lang="less" scoped>
.follow-btn{
    flex:0 0 100px;
    padding: 8px 15px;
    font-size: 17px;
    color:#fff;
    text-align: center;
    border-radius: 20px;
    background: #42c02e;
    cursor: pointer;

    &.follow{
        background: #ccc;
    }

    .icon{
        padding-right: 3px;
    }
}
</style>