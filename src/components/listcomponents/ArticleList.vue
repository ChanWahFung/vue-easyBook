<template>
    <div v-if="articles" class="article-list">
        <div class="flex article-item" v-for="(item,index) in articles" :key="index">
            <div class="flex-2 content">
                <p class="title" @click="goArticleDetail(item.object.data.slug,item.object.data.id)">{{item.object.data.title}}</p>
                <p class="desc" v-html="item.object.data.public_abbr"></p>
                <div v-if="type=='column'" class="meta flex">
                    <diamond-count>{{item.object.data.total_fp_amount}}</diamond-count>
                    <view-count>{{item.object.data.views_count}}</view-count>
                    <comment-count>{{item.object.data.public_comments_count}}</comment-count>
                    <like-count>{{item.object.data.likes_count}}</like-count>
                    <create-time :time="item.object.data.first_shared_at"></create-time>
                </div>
                <div v-if="type=='home'" class="meta flex">
                    <diamond-count v-if="item.object.data.total_fp_amount">{{item.object.data.total_fp_amount}}</diamond-count>
                    <author-name @click.native="goAuthor(item.object.data.user.slug)">{{item.object.data.user.nickname}}</author-name>
                    <comment-count>{{item.object.data.public_comments_count}}</comment-count>
                    <like-count>{{item.object.data.likes_count}}</like-count>
                </div>
                <div v-if="type=='recommend'" class="meta flex">
                    <author-avatar :url="item.object.data.user.avatar" @click.native="goAuthor(item.object.data.user.slug)"></author-avatar>
                    <author-name @click.native="goAuthor(item.object.data.user.slug)">{{item.object.data.user.nickname}}</author-name> 
                </div>
            </div>
            <div v-if="item.object.data.list_image_url" class="poster">
                <img :src="item.object.data.list_image_url" alt="">
            </div>
        </div>
        <LoadMoreBtn v-if="type!=='recommend'" @click.native="loadmore"></LoadMoreBtn>
        <EbFooter />
    </div>
</template>

<script>
import EbFooter from '../EbFooter'
import LoadMoreBtn from '../mycomponents/LoadMoreBtn'
import AuthorName from './articlePart/AuthorName'
import CommentCount from './articlePart/CommentCount'
import CreateTime from './articlePart/CreateTime'
import DiamondCount from './articlePart/DiamondCount'
import LikeCount from './articlePart/LikeCount'
import ViewCount from './articlePart/ViewCount'
import AuthorAvatar from './articlePart/AuthorAvatar'

export default {
    name:'article-list',
    props:{
        articles:Array,
        type:String,
    },
    data () {
        return {
        };
    },
    methods: {
        loadmore(){
            this.$emit('load-more')
        },
        goArticleDetail(slug,id){
            this.$router.push({path:'/article/'+slug,query:{id}})
        },
        goAuthor(slug){
            this.$router.push({path:'/author/'+slug})
        }
    },
    components:{
        EbFooter,
        LoadMoreBtn,
        'author-name':AuthorName,
        'comment-count':CommentCount,
        'create-time':CreateTime,
        'diamond-count':DiamondCount,
        'like-count':LikeCount,
        'view-count':ViewCount,
        'author-avatar':AuthorAvatar
    }
}

</script>

<style lang="less" scoped>
.article-list{
    margin-top: 15px;
    min-height: 500px;
}
.article-item{
    align-items: center;
    padding: 20px 0;
    border-top:1px solid #eee;

    .content{
        margin-right: 15px;

        .title{
            font-size:18px;
            font-weight: 600;
            transition: all .2s;
            cursor: pointer;

            &:hover{
                text-decoration: underline;
            }
        }

        .desc{
            padding: 10px 0;
            font-size: 14px;
            color:#777;
            line-height: 20px;
        }

        .meta{
            align-items: center;
        }
    }

    .poster{
        position: relative;
        flex:0 0 150px;
        height: 100px;
        border: 1px solid #eee;
        border-radius: 3px;
        overflow: hidden;

        >img{
            width: 100%;
        }
    }
}
</style>