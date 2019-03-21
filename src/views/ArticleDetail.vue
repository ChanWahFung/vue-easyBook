<template>
<div class="warp container">
    <div v-if="detailData" class="newDetail">
        <div class="article-warp">
            <div class="article">
                <p class="title">{{detailData.public_title}}</p>
                <div class="user-info flex">
                    <div class="avatar" @click="goAuthor(detailData.user.slug)">
                        <img class="auto-img" :src="detailData.user.avatar" alt="">
                    </div>
                    <div class="flex-1 info">
                        <span class="user-name" @click="goAuthor(detailData.user.slug)">{{detailData.user.nickname}}</span>
                        <p class="meta">
                            <diamond-count v-if="detailData.total_fp_amount">{{detailData.total_fp_amount}}</diamond-count>
                            <create-time :time="detailData.first_shared_at" type="datetime"></create-time>
                            <span>字数 {{detailData.wordage}}</span>
                            <span>阅读 {{detailData.total_fp_amount}}</span>
                            <span>评论 {{detailData.public_comment_count}}</span>
                            <span>喜欢 {{detailData.likes_count}}</span>
                        </p>
                    </div>
                </div>
                <div class="article-content" v-html="dealContentImg(detailData.free_content)">
                </div>
            </div>
            <SupportAuthor />
            <AuthorInfo :user="detailData.user" />
            <ShareBlock :likeConut="detailData.likes_count" />
            <CommentInput @add-father-comment="addFatherComment" />
            <CommentList :commentList="commentList" @reverse-list="reverseList" @add-child-comment="addChildComment" @del-child-comment="delChildComment" @del-father-comment="delFatherComment" />
            <div v-if="recommendList && recommendList.length != 0">
                <p class="recommend-title">推荐阅读</p>
                <ArticleList :articles="recommendList" type="recommend" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import SupportAuthor from '../components/articlecomponents/SupportAuthor'
import AuthorInfo from '../components/articlecomponents/AuthorInfo'
import ShareBlock from '../components/articlecomponents/ShareBlock'
import CommentInput from '../components/articlecomponents/CommentInput'
import CommentList from '../components/articlecomponents/CommentList'
import ArticleList from '../components/listcomponents/ArticleList'
import DiamondCount from '../components/listcomponents/articlePart/DiamondCount'
import CreateTime from '../components/listcomponents/articlePart/CreateTime'

export default {
    name:'newDetail',
    data () {
        return {
            detailData:null,
            commentList:null,
            recommendList:null
        };
    },
    filters:{
        getTime(val){
            return new Date(val).getTime();
        },
    },
    methods:{
        getDeatial(){
            let slug = this.$route.params.slug;
            return this.$axios(`/api/asimov/p/${slug}`)
        },
        getComments(){
            let id = this.$route.query.id;
            let count = this.detailData.public_comment_count;
            //author_only=false page=1
            return this.$axios(`/api/asimov/notes/${id}/comments?count=${count}&author_only=true`)
        },
        getRecommend(){
            ///asimov/notes/:slug/recommendations
            let slug = this.$route.params.slug;
            // return this.$axios(`/api/asimov/notes/${slug}/recommendations`)
            return this.$axios(`/api/asimov/notes/seo_recommendations?slug=${slug}`)
        },
        goAuthor(slug){
            this.$router.push({path:'/author/'+slug})
        },
        axiosData(){
            this.$Loading.start();
            this.getDeatial().then(res=>{
                if(res.status == 200){
                    this.detailData = res.data;
                    this.$Loading.finish();
                    this.getComments().then(res=>{
                        if(res.status == 200){
                            this.commentList = res.data;
                        }else{
                            // eslint-disable-next-line
                            console.error('articles请求失败：'+res.status);
                        }
                    })
                }else{
                    // eslint-disable-next-line
                    console.error('articles请求失败：'+res.status);
                    this.$Loading.error();
                }
            })
            this.getRecommend().then(res=>{
                if(res.status == 200){
                    this.recommendList = res.data;
                }else{
                    // eslint-disable-next-line
                    console.error('articles请求失败：'+res.status);
                }
            })
        },
        dealContentImg(val){
            let result = val.replace(/data-original-src/g,'src');
           return result;
        },
        reverseList(){
            this.commentList.reverse();
        },
        addFatherComment(obj){
            let myfloor = 1;
            if(this.commentList.length != 0){
                myfloor = this.commentList[0].floor + 1
            }
            this.commentList.unshift({...obj,floor:myfloor});
            this.$Message.success('评论发表成功')
        },
        addChildComment({index,child}){
            this.commentList[index].children.push(child);
            this.$Message.success('回复成功')
        },
        delChildComment({index,i}){
            this.commentList[index].children.splice(i,1);
            this.$Message.success('删除成功')
        },
        delFatherComment(index){
            this.commentList.splice(index,1);
            this.$Message.success('删除成功')
        }
    },
    created() {
        this.axiosData();
    },
    components:{
        SupportAuthor,
        AuthorInfo,
        ShareBlock,
        CommentInput,
        CommentList,
        ArticleList,
        'diamond-count':DiamondCount,
        'create-time':CreateTime
    },
    beforeRouteUpdate (to, from, next) {
        next();
        window.scrollTo(0,0);
        this.axiosData();
    }
}

</script>

<style lang="less">
.article-warp{
    width: 650px;
    margin:0 auto;
    overflow: hidden;
}
.article{

    .title{
        font-size: 32px;
        font-weight: 700;
        color:#333;
    }

    .user-info{
        margin: 30px 0;

        .avatar{
            flex:0 0 50px;
            height: 50px;
            margin-right: 10px;
            border: 1px solid #f3f3f3;
            border-radius: 50%;
            overflow: hidden;
            cursor: pointer;
        }

        .info{
            align-items: center;
        }

        .user-name{
            font-size: 15px;
            margin-bottom: 5px;
            cursor: pointer;
        }

        .meta{

            >span{
                margin-right: 10px;
                font-size: 12px;
                color:#999;
            }
        }
    }
}
.article-content{
    

    p{
        line-height: 1.5;
        margin: 20px;
    }
}
.image-package{
    text-align: center;
}
.image-container{
    margin: 0 auto;

    .image-container-fill{
        padding-bottom: 0 !important;
    }

    img{
        width: 100%;
    }
}
.recommend-title{
    margin: 30px 0;
    padding-left: 8px;
    font-size: 16px;
    border-left: 2px solid @red;
}
</style>