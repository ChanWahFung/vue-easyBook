<template>
    <div v-if="collData" class="collection-info flex">
        <div class="avatar">
            <img class="auto-img" :src="collData.image" alt="">
        </div>
        <div class="info">
            <p class="title">{{collData.title}}</p>
            <p class="desc">
                <span class="notes-count">收录了 {{collData.notes_count}} 文章</span>
                <span>{{collData.subscribers_count}} 人关注</span>
            </p>
        </div>
        <FollowBtn class="btn"></FollowBtn>
    </div>
</template>

<script>
import FollowBtn from '../mycomponents/FollowBtn'
export default {
    name:'',
    props:['collData'],
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
.collection-info{
    align-items: center;

    .avatar{
        flex:0 0 80px;
        height: 80px;
        margin-right: 20px;
        border-radius: 5px;
        border: 1px solid #f0f0f0;
        overflow: hidden;
    }

    .info{

        .title{
            font-size: 20px;
            font-weight: 600;
        }

        .desc{
            font-size: 14px;
            color:#999;
        }

        .notes-count::after{
            content: '·';
            font-weight: 600;
            margin: 0 5px;
        }
    }

    .btn{
        margin-left: auto;
    }
}
</style>