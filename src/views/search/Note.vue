<template>
    <div v-if="users&&collections" class="note-box">
        <div class="note">
            <div class="part-one">
                <div class="users">
                    <p class="title flex">
                        <span>相关用户</span>
                        <router-link :to="{name:'users'}">查看全部</router-link>
                    </p>
                    <div class="flex">
                        <div class="flex-1" v-for="(item,index) in users" :key="index"> 
                            <infoPart :item="item" type="user" :slug="item.slug"></infoPart>
                        </div>
                    </div>
                </div>
                <div class="collections">
                    <p class="title flex">
                        <span>相关专题</span>
                        <router-link :to="{name:'collections'}">查看全部</router-link>
                    </p>
                    <div class="flex">
                        <div class="flex-1" v-for="(item,index) in collections" :key="index"> 
                            <infoPart :item="item" type="special" :slug="item.slug"></infoPart>
                        </div>
                    </div>
                </div>
            </div>
            <div class="part-two">
                <div class="entrie-list">
                    <div class="entrie" v-for="(item,index) in entries" :key="index">
                        <p class="user-info flex">
                            <author-avatar @click.native="goAuthor(item.user.slug)" :url="item.user.avatar_url"></author-avatar>
                            <author-name @click.native="goAuthor(item.user.slug)" class="name">{{item.user.nickname}}</author-name>
                            <create-time :time="item.first_shared_at"></create-time>
                        </p>
                        <p class="title" @click="goArticleDetail(item.slug,item.id)" v-html="item.title"></p>
                        <p class="content" v-html="item.content"></p>
                        <p class="meta">
                            <view-count>{{item.views_count}}</view-count>
                            <comment-count>{{item.public_comments_count}}</comment-count>
                            <like-count>{{item.likes_count}}</like-count>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import infoPart from '../../components/searchcomponents/infoPart'
import AuthorAvatar from '../../components/listcomponents/articlePart/AuthorAvatar'
import AuthorName from '../../components/listcomponents/articlePart/AuthorName'
import CreateTime from '../../components/listcomponents/articlePart/CreateTime'
import ViewCount from '../../components/listcomponents/articlePart/ViewCount'
import CommentCount from '../../components/listcomponents/articlePart/CommentCount'
import LikeCount from '../../components/listcomponents/articlePart/LikeCount'

export default {
    name:'',
    data () {
        return {
            entries:null,
            collections:null,
            users:null
        };
    },
    methods: {
        goArticleDetail(slug,id){
            this.$router.push({path:'/article/'+slug,query:{id}})
        },
        goAuthor(slug){
            this.$router.push({path:'/author/'+slug})
        }
    },
    created() {
        this.$Loading.start()
        this.$axios('/api/search/note').then(res=>{
            if(res.status == 200){
                this.entries = res.data.entries
                this.collections = res.data.related_collections
                this.users = res.data.related_users
                this.$Loading.finish()
            }else{
                this.$Loading.error()
                // eslint-disable-next-line
                console.error(res.status)
            }
        })
    },
    components:{
        infoPart,
        'author-avatar':AuthorAvatar,
        'author-name':AuthorName,
        'create-time':CreateTime,
        'view-count':ViewCount,
        'comment-count':CommentCount,
        'like-count':LikeCount,
    }
}

</script>

<style lang="less" scoped>
.part-one{
    background: #f5f5f5;
    border: 1px solid #d9d9d9;
    border-radius: 5px;

    .title{
        justify-content: space-between;
        margin-bottom: 10px;
        font-size: 14px;
    }

    .users{
        padding: 15px 12px;
        border-bottom:1px solid #eee;
    }

    .collections{
        padding: 15px 12px;
    }
}
.entrie-list{
    margin-top: 30px;

    .entrie{
        padding: 20px;
        border-bottom:1px solid #f3f3f3;

        .user-info{
            align-items: center;
        }

        .name{
            color:#333;
        }

        .title{
            font-size: 18px;
            font-weight: 700;
            margin: 10px 0;
            cursor: pointer;

            &:hover{
                text-decoration: underline;
            }
        }

        .content{
            font-size: 14px;
            line-height: 1.5;
            color:#999;
        }

        .meta{
            margin-top: 10px;
        }
    }
}
</style>
<style lang="less">
.search-result-highlight{
    color:@red;
}
</style>