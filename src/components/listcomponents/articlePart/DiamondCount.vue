<template>
    <span class="amount">
        <i class="icon iconfont icon-zuanshi"></i>
        <em>
            <slot></slot>
        </em>
    </span>
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
.amount{
     margin-right: 10px;
    font-size: 12px;
    color:@red !important;
}
.icon{
    font-size: 10px;
    margin-right: 3px;
}
</style>