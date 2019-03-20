<template>
    <div class="recent-search">
        <div class="header">
            <span>最近搜索</span>
        </div>
        <div>
            <p>
                <Tag type="dot">vue</Tag>
            </p>
        </div>
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
.recent-search{
    padding: 0 15px;
}
.header{
    padding-bottom:15px;
    font-size: 14px;
    color: #999;
}
</style>