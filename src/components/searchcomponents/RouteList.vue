<template>
    <div class="type-list">
        <router-link class="item" tag="li" :to="{name:'notes'}">
            <span class="icon iconfont icon-wenzhang1"></span>
            <span>文章</span>
        </router-link>
        <router-link class="item" exact tag="li" :to="{name:'users'}">
            <span class="icon iconfont icon-yonghu"></span>
            <span>用户</span>
        </router-link>
        <router-link class="item" exact tag="li" :to="{name:'collections'}">
            <span class="icon iconfont icon-zhuanti"></span>
            <span>专题</span>
        </router-link>
        <router-link class="item" exact tag="li" :to="{name:'notebook'}">
            <span class="icon iconfont icon-wenji"></span>
            <span>文集</span>
        </router-link>
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
.type-list{

    .item{
        padding: 12px 15px;
        border-radius: 5px;
        font-size: 15px;
        color:#424242;
        cursor: pointer;

        .icon{
            padding: 7px;
            margin-right: 20px;
            font-size: 19px;
            color:#fff;
            border-radius: 3px;
            background: #999;
        }
    }

    .router-link-active{
        background: #eee;
    }
}
</style>