<template>
    <div v-if="users" class="users">
        <div class="user flex" v-for="(item,index) in users" :key="index">
            <author-avatar @click.native="goAuthor(item.slug)" :url="item.avatar_url" size="large"></author-avatar>
            <div>
                <span class="name"  @click="goAuthor(item.slug)">{{item.nickname}}</span>
                <p class="have">
                    <span>关注 {{item.following_users_count}}</span>
                    <span>粉丝 {{item.followers_count}}</span>
                    <span>文章 {{item.public_notes_count}}</span>
                </p>
                <p class="desc">
                    <span>写了 {{item.total_wordage}} 字, </span>
                    <span>获得了 {{item.total_likes_count}} 个喜欢</span>
                </p>
            </div>
            <FollowBtn class="btn"></FollowBtn>
        </div>
    </div>
</template>

<script>
import AuthorAvatar from '../../components/listcomponents/articlePart/AuthorAvatar'
import FollowBtn from '../../components/mycomponents/FollowBtn'

export default {
    name:'',
    data () {
        return {
            users:null
        };
    },
    methods: {
        goAuthor(slug){
            this.$router.push({path:'/author/'+slug})
        }
    },
    created() {
        this.$Loading.start()
        this.$axios('/api/search/users').then(res=>{
            if(res.status == 200){
                this.users = res.data.entries;
                this.$Loading.finish()
            }else{
                this.$Loading.error()
                // eslint-disable-next-line
                console.error(res.status)
            }
        })
    },
    components:{
        'author-avatar':AuthorAvatar,
        FollowBtn
    }
}

</script>

<style lang="less" scoped>
.user{
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid #f0f0f0;
    font-size: 11px;
    color:#999;

    .name{
        font-size: 15px;
        font-weight: 600;
        color:#333;
        cursor: pointer;
    }

    .have{

        >span:not(:last-child)::after{
            content: '|';
            margin: 0 5px;
        }
    }

    .btn{
        margin-left: auto;
    }
}
</style>