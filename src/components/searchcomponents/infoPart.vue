<template>
    <div class="info-item flex">
        <author-avatar v-if="type=='special'" size="large" shape="square" :url="item.image_url" @click.native="goCollection(slug)"></author-avatar>
        <div v-if="type=='special'" class="info">
            <p v-if="item.title" class="name" @click="goCollection(slug)">{{item.title}}</p>
            <p v-if="item.name" class="name" @click="goCollection(slug)">{{item.name}}</p>
            <p class="desc">
                <span>{{item.public_notes_count}} 文章</span>
                <span v-if="item.likes_count != undefined">{{item.likes_count}} 关注</span>
                <span v-if="item.subscribers_count != undefined">{{item.subscribers_count}} 关注</span>
            </p>
        </div>

        <author-avatar v-if="type=='user'" size="large" :url="item.avatar_url" @click.native="goAuthor(slug)"></author-avatar>
        <div v-if="type=='user'" class="info">
            <p class="name" @click="goAuthor(slug)">{{item.nickname}}</p>
            <p class="desc">
                <span>写了 {{item.total_wordage}} 字</span>
                <span>{{item.total_likes_count}} 喜欢</span>
            </p>
        </div>
    </div>
</template>

<script>
import AuthorAvatar from '../listcomponents/articlePart/AuthorAvatar'
export default {
    name:'',
    props:{
        item:Object,
        type:String,
        slug:String
    },
    data () {
        return {
        };
    },
    methods: {
        goAuthor(slug){
            if(slug){
                this.$router.push({path:'/author/'+slug})
            }
        },
        goCollection(slug){
            if(slug){
                this.$router.push({path:'/collection/'+slug})
            }
        }
    },
    components:{
        'author-avatar':AuthorAvatar,
    }
}

</script>

<style lang="less" scoped>
.info-item{
    align-items: center;

    .name{
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
    }

    .desc{
        font-size: 13px;
        color:#999;

        >span:first-child::after{
            content: '·';
            margin: 0 3px;
            font-weight:600;
        }
    }
}
</style>