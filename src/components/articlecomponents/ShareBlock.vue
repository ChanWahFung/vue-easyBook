<template>
    <div class="share-blcok flex">
        <div class="btn like-btn">
            <i class="iconfont icon-aixin1"></i>
            <span class="like-text">喜欢</span>
            <span>{{likeConut}}</span>
        </div>
        <div class="btn share share-wx">
            <Tooltip content="分享到微信" placement="top">
                <i class="iconfont icon-weixin"></i>
            </Tooltip>
        </div>
        <div class="btn share share-wb">
            <Tooltip content="分享到微博" placement="top">
                <i class="iconfont icon-weibo"></i>
            </Tooltip>
        </div>
        <div class="btn share share-qq">
            <Tooltip content="分享到QQ" placement="top">
                <i class="iconfont icon-qq"></i>
            </Tooltip>
        </div>
        <div class="btn share-more">更多分享</div>
    </div>
</template>

<script>
export default {
    name:'',
    props:['likeConut'],
    data () {
        return {
        };
    },
}

</script>

<style lang="less" scoped>
.share-blcok{
    align-items: center;

    .btn{
        cursor: pointer;
    }

    .like-btn{
        padding: 12px 20px;
        margin-right:auto; 
        border: 1px solid @red;
        border-radius: 25px;
        font-size: 19px;
        color:@red;

        &:hover{
            background: #fdf2f1;
        }

        .like-text{
            padding: 0 10px;
        }
    }

    .share{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        margin-right: 10px;
        border:1px solid #d9d9d9;
        border-radius: 50%;

        i{
            padding: 5px;
            font-size: 28px;
        }
    }

    .share-wx{
        color:#00bb29;
    }

    .share-wb{
        color:#e05244;
    }

    .share-qq{
        color:#3194d0;
    }

    .share-more{
        padding: 12px 15px;
        border:1px solid #d9d9d9;
        border-radius: 25px;
        font-size: 14px;
        color:#999;

        &:hover{
            background: #fafafa;
        }
    }
}
</style>