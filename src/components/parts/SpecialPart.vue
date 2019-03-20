<template>
    <div class="recommend-special">
        <div class="flex header">
            <span class="title">热门专题</span>
            <span class="replace">
                <i class="icon iconfont icon-huanyihuan"></i>
                <em>换一批</em>
            </span>
        </div>
        <div class="tags">
            <Tag color="volcano" @click.native="goCollection(item.slug)" v-for="(item,index) in specials" :key="index">{{item.title}}</Tag>
        </div>
    </div>
</template>

<script>
export default {
    name:'',
    props:{
        specials:Array
    },
    data () {
        return {
        };
    },
    methods: {
        goCollection(slug){
            this.$router.push({path:'/collection/'+slug})
        }
    },
}

</script>

<style lang="less" scoped>
.recommend-special{
    margin-top: 30px;

    .header{
        justify-content: space-between;
        padding-bottom:15px;
        font-size: 14px;
        color: #999;

        .icon{
            margin-right: 5px;
            font-size: 12px;
        }
    }
}
</style>