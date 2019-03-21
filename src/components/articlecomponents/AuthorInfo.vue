<template>
    <div class="author-info">
        <div class="main flex">
            <div class="avatar">
                <img class="auto-img" :src="user.avatar" alt="">
            </div>
            <div class="info flex-1">
                <p class="author-name">{{user.nickname}}</p>
                <p class="meta">
                    <span v-if="user.wordage">写了 {{user.wordage | k}} 字</span>
                    <span v-if="user.likes_count">获得了 {{user.likes_count}} 个喜欢</span>
                </p>
            </div>
            <FollowBtn @click.native="pushFollowList"></FollowBtn>
        </div>
        <div class="line"></div>
        <div v-if="user.intro" class="intro">
            {{user.intro}}
        </div>
        <div v-else class="intro">
            微信公众号 {{user.nickname}}
        </div>
    </div>
</template>

<script>
import FollowBtn from '../mycomponents/FollowBtn'

export default {
    name:'',
    props:['user'],
    data () {
        return {
        };
    },
    methods:{
        pushFollowList(){
            if(!this.$store.state.isLogin){
                this.$router.push('/login')
                return;
            }
            let item = {
                avatar:this.user.avatar,
                title:this.user.nickname,
                slug:this.user.slug,
                type:'User'
            }
            this.$store.commit('pushFollowList',item)
        }
    },
    components:{
        FollowBtn
    }
}

</script>

<style lang="less" scoped>
.author-info{
    margin: 60px 0;
    padding: 20px;
    font-size: 13px;
    color:#777;
    border: 1px solid #ccc;
    border-radius: 3px;
    background: #f5f5f5;

    .main{
        align-items: center;
    }

    .avatar{
        flex:0 0 55px;
        height: 55px;
        margin-right: 8px;
        border-radius: 50%;
        overflow: hidden;
        border:1px solid #f3f3f3;
    }

    .author-name{
        font-size: 16px;
        color:#333;
    }

    .meta{
        font-size: 12px;
    
        span{
            margin-right: 8px;
        }
    }

    .intro{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .line{
        height: 1px;
        margin:20px 0;
        border-top: 1px solid #d7d7d7;
    }
}
</style>