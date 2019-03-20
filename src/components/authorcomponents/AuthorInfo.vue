<template>
    <div v-if="author" class="author flex">
        <div class="avatar">
            <img class="auto-img" :src="author.avatar" alt="">
        </div>
        <div class="info flex-3">
            <div class="name-block">
                <span class="name">{{author.nickname}}</span>
                <span :class="author.gender | gender"></span>
            </div>
            <div class="possess flex">
                <div class="possess-item following-users-count">
                    <span class="count">{{author.following_users_count}}</span>
                    <span class="desc">关注</span>
                </div>
                <div class="possess-item followers-count">
                    <span class="count">{{author.followers_count}}</span>
                    <span class="desc">粉丝</span>
                </div>
                <div class="possess-item total-wordage">
                    <span class="count">{{author.total_wordage}}</span>
                    <span class="desc">字数</span>
                </div>
                <div class="possess-item total-likes-count">
                    <span class="count">{{author.total_likes_count}}</span>
                    <span class="desc">收获喜欢</span>
                </div>
                <div class="possess-item jsd-balance">
                    <span class="count">{{author.jsd_balance}}</span>
                    <span class="desc">简书钻</span>
                </div>
            </div>
        </div>
        <div class="flex-1">
            <FollowBtn></FollowBtn>
        </div>
    </div> 
</template>

<script>
import FollowBtn from '../mycomponents/FollowBtn'

export default {
    name:'',
    props:['author'],
    filters:{
        gender(val){
            if(val === 0){
                return ''
            }else if(val === 1){
                return 'iconfont icon-nan nan'
            }else if(val === 2){
                return 'iconfont icon-nv nv'
            }
        }
    },
    data () {
        return {
        };
    },
    components:{
        FollowBtn
    }
}

</script>

<style lang="less" scoped>
.author{
    align-items: center;

    .avatar{
        flex:0 0 80px;
        height: 80px;
        margin-right: 20px;
        border-radius: 50%;
        overflow: hidden;
    }

    .name-block{
        margin-bottom: 8px;

        .name{
            margin-right: 5px;
            font-size: 18px;
            font-weight: 600;
        }

        .nan{
            color:@blue;
        }

        .nv{
            color:@red;
        }
    }

    .possess{

        .possess-item{
            padding: 0 10px;

            &:first-child{
                padding-left: 0;
            }

            &:not(:last-child){
                border-right:1px solid #f0f0f0;
            }

            .count{
                font-size: 15px;
            }

            .desc{
                display: block;
                font-size: 12px;
                color:#999;
            }
        }
    }
}
</style>