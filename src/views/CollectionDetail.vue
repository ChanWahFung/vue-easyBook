<template>
<div class="warp container">
    <div v-if="collectionData" class="author-detail flex">
        <div class="mainBox flex-2">
            <CollectionInfo :collData="collectionData"></CollectionInfo>
            <div class="columns flex">
                <div class="column" :class="{active:currColIndex==index}" @click="changeColumn(index,item.type)" v-for="(item,index) in CollectionColumns" :key="index">
                    <span class="iconfont" :class="item.icon"></span>
                    <span class="title">{{item.title}}</span>
                </div>
            </div>
            <ArticleList v-if="columnData.length" :articles="columnData" type="home" @load-more="loadMore"></ArticleList>
            <div v-else class="nothing">
                <img class="auto-img" src="../../public/img/nothing.png" alt="">
                <p>空空如也~</p>
            </div>
        </div>
        <div class="side flex-1">
            <div v-if="collectionData.content_without_html" class="introduce">
                <p class="title">专题介绍</p>
                <p class="content" v-html="collectionData.content_without_html"></p>
            </div>
            <div v-else>
                暂无专题介绍
            </div>
            <div class="owner">
                <p class="title">管理员</p>
                <p class="name">
                    <a :href="'/author/'+collectionData.owner.slug">{{collectionData.owner.nickname}}</a>
                </p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {mapState} from 'vuex'
import ArticleList from '../components/listcomponents/ArticleList'
import CollectionInfo from '../components/collectioncomponents/CollectionInfo'

export default {
    name:'',
    data () {
        return {
            currColIndex:0,
            page:1,
            type:'commented_at',
            slug:this.$route.params.slug,
            collectionData:null,
            columnData:null
        };
    },
    computed: {
        ...mapState(['CollectionColumns'])
    },
    methods: {
        changeColumn(index,type){
            this.currColIndex = index;
            this.type = type;
            this.page = 1;
            this.getColumnData(this.type,this.page).then(res=>{
                if(res.status == 200){
                    this.columnData = res.data
                }else{
                    // eslint-disable-next-line
                    console.error(res.status)
                }
            })
        },
        getCollectionData(){
            return this.$axios(`/api/asimov/collections/slug/${this.slug}`);
        },
        getColumnData(type=this.type,page=this.page){
            return this.$axios(`/api/asimov/collections/slug/${this.slug}/public_notes?page=${page}&count=10&order_by=${type}`);
        },
        loadMore(){
            this.page++;
            this.getColumnData(this.type,this.page).then(res=>{
                if(res.status == 200){
                    if(res.data.length==0){
                        this.$Message.warning({
                            content:'已经没有更多内容啦',
                            duration: 3
                        })
                    }else{
                        this.columnData.push(...res.data)
                    }
                }else{
                    // eslint-disable-next-line
                    console.error(res.status)
                }
            })
        }
    },
    created() {
        this.$Loading.start()
        this.$axios.all([this.getCollectionData(), this.getColumnData()])
        .then(this.$axios.spread((coll, col) => {
            if(coll.status == 200 && col.status == 200){
               this.collectionData = coll.data;
               this.columnData = col.data;
                this.$Loading.finish()
            }else{
                this.$Loading.error()
            }
        }));
    },
    components:{
        ArticleList,
        CollectionInfo
    }
}

</script>

<style lang="less" scoped>
.mainBox{
    margin-right: 35px;

    .columns{
        margin-top: 25px;
        font-size: 15px;
        font-weight: 600;
        color:#999;

        .column{
            padding: 10px 15px;
            cursor: pointer;

            &.active{
                color:@red;
            }

            .title{
                padding-left: 8px;
            }
        }
    }
}
.side{

    .title{
        font-size: 14px;
        color:#999;
    }

    .content{
        padding-right: 35px;
        margin: 15px 0;
        line-height: 1.5;
        font-size: 15px;
    }

    .name{
        margin-top: 8px;
    }

    .owner{
        padding: 20px 0;
        border-top:1px solid #f5f5f5;
    }
}
.nothing{
    width: 180px;
    height: 164px;
    margin: 100px 0 0 100px;
    text-align: center;
    font-weight: 600;
    color:#666;
}
</style>