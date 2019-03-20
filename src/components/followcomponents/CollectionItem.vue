<template>
    <div class="coll-item flex">
        <author-avatar @click.native="goCollection(source.slug)" :url="source.avatar_url" size="large" shape='square'></author-avatar>
        <div class="info">
            <p class="title" @click="goCollection(source.slug)">{{source.title}}</p>
            <p class="content">{{source.content}}</p>
            <p class="have" @click="goCollection(source.slug)">
                <span class="icon iconfont icon-zhuanti"></span>
                <span class="notes-count">{{source.public_notes_count}}篇文章</span>
                <span class="like-count">{{source.likes_count}}人关注</span>
            </p>
        </div>
        <FollowBtn class="btn"></FollowBtn>
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
        goCollection(slug){
            this.$router.push('/collection/'+slug)
        }
    }
}

</script>

<style lang="less" scoped>
.coll-item{
    align-items: center;
}
.info{
    font-size: 12px;
    color:#999;

    .title{
        font-size: 15px;
        color:#333;
        font-weight: 600;
        cursor: pointer;
    }

    .notes-count::after{
        content:'·';
        margin: 0 5px;
    }

    .have{
        cursor: pointer;
    }

    .icon{
        margin-right: 3px;
        font-size: 10px;
    }
}
.btn{
    margin-left: auto;
}
</style>