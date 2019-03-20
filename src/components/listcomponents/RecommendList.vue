<template>
    <div class="recommendList">
        <div class="item" v-for="(item,index) in list" :key="index">
            <div v-if="type=='all'" class="title">
                <span class="icon iconfont icon-huizhang"></span>
                <span v-if="item.subscription.source_type=='Collection'">
                    简书推荐专题
                </span>
                <span v-if="item.subscription.source_type=='User'">
                    简书推荐作者
                </span>
            </div>
            <collection-item v-if="item.subscription.source_type=='Collection'" :source="item.subscription.source"></collection-item>
            <user-item v-if="item.subscription.source_type=='User'" :source="item.subscription.source"></user-item>
        </div>
    </div>
</template>

<script>
import UserItem from '../followcomponents/UserItem'
import CollectionItem from '../followcomponents/CollectionItem'
export default {
    name:'recommendList',
    props:{
        type:String,
        list:Array
    },
    data () {
        return {
        };
    },
    components:{
        'user-item':UserItem,
        'collection-item':CollectionItem
    }
}

</script>

<style lang="less" scoped>
.recommendList{

    .item{
        padding: 20px 0;
        border-bottom:1px solid #f3f3f3;

        .title{
            font-size: 13px;
            color:@red;
            margin-bottom: 10px;
        }

        .icon{
            margin-right: 5px;
            font-size: 20px;
            vertical-align: middle;
        }
    }
}
</style>