<template>
    <span class="view-count">
        <i class="icon iconfont icon-chakanyanjingshishifenxi2"></i>
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

<style scoped>
.view-count{
    margin-right: 10px;
    font-size: 12px;
    color:#999;
}
.icon{
    font-size: 10px;
    margin-right: 3px;
}
</style>