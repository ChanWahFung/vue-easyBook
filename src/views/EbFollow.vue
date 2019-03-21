<template>
<div class="warp container">
    <div v-if="recommendList" class="EbFollow">
        <div class="flex">
            <div class="side flex-1">
                <div class="sticky-box">
                    <div class="title">全部关注</div>
                    <div class="list">
                        <div v-if="followList.length == 0" class="tip">
                            暂无关注
                        </div>
                        <div v-else>
                            <div class="follow-item flex" @click="goDetail(item)" v-for="(item,index) in followList" :key="index">
                                <author-avatar :url="item.avatar" size="large" shape='square'></author-avatar>
                                <span>{{item.title}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mainBox flex-2">
                <div class="tags flex">
                    <li class="tagItem" :class="{active:currTagIndex==index}" @click="activeTag(index,item.type)" v-for="(item,index) in recommendTags" :key="index">{{item.title}}</li>
                </div>
                <RecommendList :type="currType" :list="recommendList"></RecommendList>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {mapState} from 'vuex'
import AuthorAvatar from '../components/listcomponents/articlePart/AuthorAvatar'
import RecommendList from '../components/listcomponents/RecommendList'
export default {
    name:'',
    data () {
        return {
            currTagIndex:0,
            currType:'all',
            recommendList:null
        };
    },
    computed: {
        ...mapState({
            recommendTags:'recommendTags',
            followList:'followList'
        })
    },
    methods: {
        getRecommendList(type){
            //@params type : all || user || collection
            return this.$axios(`/api/subscriptions/${type}`)
        },
        activeTag(i,type){
            this.currTagIndex = i;
            this.currType = type;
            this.getRecommendList(this.currType).then(res=>{
                if(res.status==200){
                    this.recommendList = res.data.recommendations
                }else{
                    // eslint-disable-next-line
                    console.error(res.status);
                }
            })
        },
        goDetail({slug,type}){
            if(type == 'User'){
                this.$router.push('/author/'+slug)
            }else if(type == 'Collection'){
                this.$router.push('/collection/'+slug)
            }
        }
    },
    created() {
        this.$Loading.start();
        this.getRecommendList('all').then(res=>{
                if(res.status==200){
                    this.recommendList = res.data.recommendations;
                    this.$Loading.finish();
                }else{
                    // eslint-disable-next-line
                    console.error('articles请求失败：'+res.status);
                    this.$Loading.error();
                }
            })
    },
    components:{
        RecommendList,
        'author-avatar':AuthorAvatar
    }
}

</script>

<style lang="less" scoped>
.side{
    position: relative;

    .sticky-box{
        position:sticky;
        top: 79px;
        left:0;
    }

    .title{
        padding: 10px;
        border-bottom:1px solid #f5f5f5;
    }

    .list{
        
        .tip{
            padding: 15px 0;
            text-align:center;
            font-weight: 600;
            color:#999;
        }
    }

    .follow-item{
        align-items: center;
        padding: 10px;
        font-size: 15px;
        border-radius: 3px;
        cursor: pointer;

        &:hover{
            background: #f6f6f6;
        }
    }
}
.mainBox{
    padding-left: 35px;
    border-left:1px solid #f3f3f3; 

    .tags{
        border-bottom: 1px solid #f3f3f3;

        .tagItem{
            padding: 12px 15px;
            font-size: 15px;
            font-weight: 600;
            color:#999;
            transition: all .2s;
            cursor: pointer;

            &:hover{
                color:#555;
                border-bottom: 2px solid #555;
            }

            &.active{
                color:#555;
                border-bottom: 2px solid #555;
            }
        }
    }
}
</style>