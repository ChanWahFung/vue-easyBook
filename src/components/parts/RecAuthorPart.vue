<template>
    <div v-if="authors" class="recauthor-list">
        <div class="flex header">
            <span class="title">推荐作者</span>
            <span class="replace" @click="replaceAuthor">
                <i class="icon iconfont icon-huanyihuan"></i>
                <em>换一批</em>
            </span>
        </div>
        <div class="list">
            <div class="author-item flex" v-for="(item,index) in authorPart" :key="index">
                <div class="author flex">
                    <div class="avatar" @click="goAuthor(item.slug)">
                        <img class="auto-img" :src="item.avatar_source" alt="">
                    </div>
                    <div class="info">
                        <p class="name" @click="goAuthor(item.slug)">{{item.nickname}}</p>
                        <p class="desc">
                            <span>写了{{item.total_wordage | k}}字</span>
                            <span>{{item.total_likes_count | k}}喜欢</span>
                        </p>
                    </div>
                </div>
                <div class="follow">
                    <span class="iconfont icon-guanzhu"></span>
                    <span>关注</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'',
    data () {
        return {
            partNum:1,
            authors:null
        };
    },
    computed: {
        authorPart(){
            let len = this.partNum*5;
            return this.authors.slice(len-5,len);
        }
    },
    methods:{
        replaceAuthor(){
            if(this.partNum==3){
                this.partNum = 1;
                return;
            }
            this.partNum++;
        },
        goAuthor(slug){
            this.$router.push({path:'/author/'+slug})
        }
    },
    created() {
        this.$axios('/api/recauthor').then(res=>{
            if(res.status == 200){
                this.authors = res.data.users;
            }else{
                // eslint-disable-next-line
                console.error('请求失败：'+res.status)
            }
        })
    },
}

</script>

<style lang="less" scoped>
.recauthor-list{
    margin-top: 30px;

    .header{
        justify-content: space-between;
        padding-bottom:15px;
        font-size: 14px;
        color: #999;

        .replace{
            cursor: pointer;
        }

        .icon{
            margin-right: 5px;
            font-size: 12px;
        }
    }
}
.author-item{
    align-items: center;
    margin: 20px 0;

    .avatar{
        width: 50px;
        height: 50px;
        margin-right: 8px;
        border:1px solid #f0f0f0;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
    }

    .name{
        font-size: 14px;
        margin-top: 3px;
        cursor: pointer;
    }

    .desc{
        font-size: 12px;
        color:#999;

        >span{
            margin-right: 8px;
        }
    }

    .follow{
        margin-left: auto;
        color:@green;
        font-size: 14px;
        cursor: pointer;
    }
}
</style>