<template>
    <div class="comment-input">
        <div v-if="isLogin" class="comment-input flex">
            <author-avatar :url="user.avatar" size="large"></author-avatar>
            <div class="flex-1">
                <textarea @focus="focus" @keydown.ctrl.exact.enter="addFatherComment" v-model="val" class="text" placeholder="写下你的评论"></textarea>
                <transition name="fade">
                    <div v-show="show" class="control flex">
                        <span class="desc">Ctrl+Enter发表</span>
                        <span class="cancel" @click="cancel">取消</span>
                        <button class="send" @click="addFatherComment">发送</button>
                    </div>
                </transition>
            </div>
        </div>
        <div v-else class="input-container flex">
            <div class="login-btn" @click="login">登录</div>
            <span class="desc">后发表评论</span>
        </div>
    </div>
</template>

<script>
import AuthorAvatar from '../listcomponents/articlePart/AuthorAvatar'
import {mapState} from 'vuex'

export default {
    name:'',
    data () {
        return {
            val:'',
            show:false
        };
    },
    computed: {
        ...mapState(['isLogin','user'])
    },
    methods: {
        login(){
            this.$router.push('/login');
        },
        focus(){
            this.show = true;
        },
        cancel(){
            this.show = false;
        },
        addFatherComment(){
            let obj = {
                children: [],
                children_count: 0,
                compiled_content: this.val,
                created_at: new Date().getTime(),
                images: [],
                images_count: 0,
                liked: false,
                likes_count: 0,
                parent_id: null,
                self:true,
                user:{
                    avatar:this.user.avatar,
                    nickname:this.user.nickname,
                    slug:this.user.slug
                }
            }
            this.val = ''
            this.$emit('add-father-comment',obj)
        }
    },
    components:{
        'author-avatar':AuthorAvatar
    }
}

</script>

<style lang="less" scoped>
.input-container{
    justify-content: center;
    align-items: center;
    padding: 25px 0;
    margin-top: 80px;
    background: #f5f5f5;
    border: 1px solid #d9d9d9;
    border-radius: 3px;

    .login-btn{
        margin-right: 8px;
        padding: 8px 25px;
        font-size: 15px;
        color:#fff;
        background: #3194d0;
        border-radius: 20px;
        cursor: pointer;
    }

    .desc{
        font-size: 14px;
    }
}
.comment-input{
    margin-top: 80px;

    .text{
        width: 100%;
        height: 100px;
        padding: 8px;
        background: #fafafa;
        border-radius: 5px;
        border:1px solid #f0f0f0;
        outline: none;
        resize:none;
    }

    .control{
        align-items: center;
        padding: 12px 0;
        color:#777;

        .desc{
            font-size: 14px;
        }

        .cancel{
            margin-left: auto;
            margin-right: 20px;
            cursor: pointer;
        }

        .send{
            padding: 8px 25px;
            background: @green;
            border-radius: 20px;
            color:#fff;
            border:none;
            outline: none;
            cursor: pointer;
        }
    }
}
.fade-enter,
.fade-leave-to{
    opacity: 0;
}
.fade-enter-active,
.fade-leave-active{
    transition: opacity .5s;
}
</style>