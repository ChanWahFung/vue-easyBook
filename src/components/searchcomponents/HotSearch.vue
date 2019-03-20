<template>
    <div class="hot-search">
        <div class="flex header">
            <span class="title">热门搜索</span>
            <span class="replace" @click="replaceTag">
                <i class="icon iconfont icon-huanyihuan"></i>
                <em>换一批</em>
            </span>
        </div>
        <div class="tags">
            <Tag class="tag" type="border" v-for="(item,index) in tagPart" :key="index">{{item}}</Tag>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name:'',
    data () {
        return {
            partNum:1,
        };
    },
    computed: {
        tagPart(){
            let len = this.partNum*10;
            return this.hotSearch.slice(len-10,len);
        },
        ...mapState(['hotSearch'])
    },
    methods:{
        replaceTag(){
            if(this.partNum==5){
                this.partNum = 1;
                return;
            }
            this.partNum++;
        },
    }
}

</script>

<style lang="less" scoped>
.hot-search{
    margin: 20px 0;
    padding: 20px 15px;
    border-top:1px solid #f3f3f3;
    border-bottom:1px solid #f3f3f3;

    .header{
        justify-content: space-between;
        padding-bottom:15px;
        font-size: 14px;
        color: #999;

        .replace{
            cursor: pointer;
        }

        .icon{
            margin-right: 5px;
            font-size: 12px;
        }
    }

    .tags{

        .tag{
            margin: 0 10px 10px 0;
        }
    }
}
</style>