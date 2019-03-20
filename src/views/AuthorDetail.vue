<template>
<div class="warp container">
    <div v-if="authorData" class="author-detail flex">
        <div class="mainBox flex-2">
            <Author-Info :author="authorData"></Author-Info>
            <div class="columns flex">
                <div class="column" :class="{active:currColIndex==index}" @click="changeColumn(index,item.type)" v-for="(item,index) in authorColumns" :key="index">
                    <span class="iconfont" :class="item.icon"></span>
                    <span class="title">{{item.title}}</span>
                </div>
            </div>
            <div v-if="isLogin && slug=='93c832013775'">
                <ArticleList v-if="myArticleList.length" :articles="myArticleList" type="column" ></ArticleList>
            </div>
            <div v-else>
                <ArticleList v-if="columnData.length" :articles="columnData" type="column" @load-more="loadMore"></ArticleList>
                <div v-else class="nothing">
                    <img class="auto-img" src="../../public/img/nothing.png" alt="">
                    <p>空空如也~</p>
                </div>
            </div>
        </div>
        <div class="side flex-1">
            <div v-if="authorData.intro_compiled" class="introduce">
                <p class="title">个人介绍</p>
                <p class="content" v-html="authorData.intro_compiled"></p>
            </div>
            <div v-else>
                暂无个人介绍
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {mapState} from 'vuex'
import AuthorInfo from '../components/authorcomponents/AuthorInfo'
import ArticleList from '../components/listcomponents/ArticleList'

export default {
    name:'',
    data () {
        return {
            currColIndex:0,
            page:1,
            type:'shared_at',
            slug:this.$route.params.slug,
            authorData:null,
            columnData:null,
        };
    },
    computed: {
        ...mapState(['authorColumns','isLogin','myArticleList'])
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
        getAuthorData(){
            return this.$axios(`/api/asimov/users/slug/${this.slug}`);
        },
        getColumnData(type=this.type,page=this.page){
            return this.$axios(`/api/asimov/users/slug/${this.slug}/public_notes?page=${page}&count=10&order_by=${type}`);
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
        this.$axios.all([this.getAuthorData(), this.getColumnData()])
        .then(this.$axios.spread((aut, col) => {
            if(aut.status == 200 && col.status == 200){
                this.authorData = aut.data;
                this.columnData = col.data;
                this.$Loading.finish()
            }else{
                this.$Loading.error()
            }
        }));
    },
    components:{
        ArticleList,
        'Author-Info':AuthorInfo
    },
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
.introduce{

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