<template>
    <div class="user-item flex">
        <author-avatar @click.native="goAuthor(source.slug)" :url="source.avatar_source" size="large"></author-avatar>
        <div class="info">
            <p class="nickname" @click="goAuthor(source.slug)">{{source.nickname}}</p>
            <p class="intro">{{source.intro}}</p>
            <p class="have" @click="goAuthor(source.slug)">
               <span class="recent_note" v-for="(item,index) in source.recent_notes" :key="index">
                   <i class="icon iconfont icon-wenzhang1"></i>
                   <em>{{item.title}}</em>
               </span>
            </p>
        </div>
        <FollowBtn @click.native="pushFollowList" class="btn"></FollowBtn>
    </div>
</template>

<script>
import AuthorAvatar from '../listcomponents/articlePart/AuthorAvatar'
import FollowBtn from '../mycomponents/FollowBtn'

export default {
    name:'',
    props:{
        source:Object
    },
    data () {
        return {
        };
    },
    components:{
        'author-avatar':AuthorAvatar,
        'FollowBtn':FollowBtn
    },
    methods:{
        goAuthor(slug){
            this.$router.push('/author/'+slug);
        },
        pushFollowList(){
            if(!this.$store.state.isLogin){
                this.$router.push('/login')
                return;
            }
            let item = {
                avatar:this.source.avatar_source,
                title:this.source.nickname,
                slug:this.source.slug,
                type:'User'
            }
            this.$store.commit('pushFollowList',item)
        }
    }
}

</script>

<style lang="less" scoped>
.user-item{
    align-items: center;
}
.info{
    font-size: 12px;
    color:#999;

    .nickname{
        font-size: 15px;
        color:#333;
        font-weight: 600;
        cursor: pointer;
    }

    .have{
        cursor: pointer;
    }

    .recent_note{
        margin-right: 10px;

        .icon{
            margin-right: 3px;
            font-size: 14px;
        }
    }
}
.btn{
    margin-left: auto;
}
</style>