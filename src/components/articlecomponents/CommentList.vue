<template>
    <div v-if="commentList" class="comment-container">
        <div class="list-header flex">
            <div class="comment-count">{{commentList.length}}条评论</div>
            <div class="author-only">只看作者</div>
            <div class="sort">
                <span :class="{active:currSort==-1}" @click="commentSort(-1)">按时间倒序</span>
                <span :class="{active:currSort==1}" @click="commentSort(1)">按时间正序</span>
            </div>
        </div>
        <div class="comment-list">
            <div class="comment" v-for="(item,index) in comments" :key="index">
                <div class="user flex">
                    <div class="avatar" @click="goAuthor(item.user.slug)">
                        <img class="auto-img" :src="item.user.avatar" alt="">
                    </div>
                    <div class="info">
                        <p class="name" @click="goAuthor(item.user.slug)">{{item.user.nickname}}</p>
                        <span class="floor">{{item.floor}}楼</span>
                        <create-time :time="item.created_at"></create-time>
                    </div>
                    <span v-if="item.self" @click="delFatherComment(index)" class="f-delete">删除</span>
                </div>
                <div class="comment-content" v-html="item.compiled_content">
                </div>
                <div class="interaction">
                    <span class="praise">
                        <i class="iconfont icon-zan"></i>
                        <em>{{item.likes_count?item.likes_count+'人':''}}赞</em>
                    </span>
                    <span class="reply">
                        <i class="iconfont icon-huifu"></i>
                        <em @click="showInput(index)">回复</em>
                    </span>
                </div>
                <div class="comment-region">
                    <div class="comment-child" v-for="(it,i) in item.children" :key="i">
                        <p class="content flex">
                            <a :href="'/author/'+it.user.slug">{{it.user.nickname}} : </a>
                            <span v-html="dealUrl(it.compiled_content)"></span>
                            <span v-if="it.self" @click="delChildComment(index,i)" class="c-delete">删除</span>
                        </p>
                        <p>
                            <create-time :time="it.created_at"></create-time>
                            <span class="reply">
                                <i class="iconfont icon-huifu"></i>
                                <em @click="showInput(index,it.user)">回复</em>
                            </span>
                        </p>
                    </div>
                    <transition name="fade">
                        <div v-show="currShowInput==index" class="comment-input">
                            <textarea class="text" v-model="val" placeholder="写下你的评论" @keydown.ctrl.exact.enter="addChildComment(index)"></textarea>
                            <div class="control flex">
                                <span class="desc">Ctrl+Enter发表</span>
                                <span class="cancel" @click="cancel">取消</span>
                                <button class="send" @click="addChildComment(index)">发送</button>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
        <Page class="pageControl" @on-change="pageChange" :total="commentList.length" :page-size="5" prev-text="上一页" next-text="下一页" />
    </div>
</template>

<script>
import CreateTime from '../listcomponents/articlePart/CreateTime'
import {mapState} from 'vuex'

export default {
    name:'',
    props:{
        commentList:Array,
    },
    computed: {
        comments(){
            return this.commentList.slice((this.currPage-1)*5,this.currPage*5)
        },
        ...mapState(['user','isLogin'])
    },
    data () {
        return {
            currSort:-1,
            currPage:1,
            currShowInput:-1,
            val:'',
            childUser:null  //回复哪个用户
        };
    },
    methods: {
        dealUrl(val){
            return val.replace(/\/u\//,'/author/')
        },
        pageChange(num){
            this.currPage = num;
        },
        goAuthor(slug){
            this.$router.push({path:'/author/'+slug})
        },
        commentSort(type){
            if(type == this.currSort)return;
            if(type == -1){
                this.currSort = type;
                this.$emit('reverse-list') 
            }else if(type == 1){
                this.currSort = type;
                this.$emit('reverse-list')
            }
        },
        showInput(i,user=null){
            if(!this.isLogin){
                this.$router.push('/login');
                return;
            }
            this.childUser = user;
            this.currShowInput = i;
        },
        cancel(){
            this.currShowInput = -1;
            this.childUser = null;
        },
        addChildComment(index){
            index = index + (this.currPage - 1) * 5
            let childUser = this.childUser;
            let content = this.val;
            if(childUser){
                content = `<a href="/author/${childUser.slug}">@${childUser.nickname}</a> ${this.val}`
            }
            let child = {
                compiled_content: content,
                created_at: new Date().getTime(),
                images: [],
                images_count: 0,
                self:true,
                user:{
                    avatar:this.user.avatar,
                    nickname:this.user.nickname,
                    slug:this.user.slug
                }
            }
            this.$emit('add-child-comment',{index,child})
            this.val = ''
            this.currShowInput = -1
            this.childUser = null
        },
        delChildComment(index,i){
            this.$emit('del-child-comment',{index,i})
        },
        delFatherComment(index){
            this.$emit('del-father-comment',index)
        }
    },
    components:{
        "create-time":CreateTime
    }
}

</script>

<style lang="less" scoped>
.comment-container{

    .list-header{
        padding: 30px 0;
        align-items: center;
    }

    .comment-count{
        margin-right: 10px;
        font-size: 18px;
        font-weight: 600;
    }

    .author-only{
        padding:3px 10px;
        font-size: 12px;
        color:#999;
        border:1px solid #d9d9d9;
        border-radius: 20px;
    }

    .sort{
        margin-left: auto;
        font-size: 14px;
        color:#666;

        >span{
            margin: 0 5px;
            cursor: pointer;
        }

        .active{
            font-weight: 600;
            color:#333;
        }
    }
}
.comment{
    padding: 25px;
    border-top:1px solid #f3f3f3;

    .user{
        align-items: center;

        .f-delete{
            font-size: 14px;
            color:#ccc;
            margin-left: auto;
            cursor: pointer;
        }
    }

    .avatar{
        width: 40px;
        height:40px;
        margin-right: 10px;
        border:1px solid #d9d9d9;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
    }

    .name{
        font-size: 14px;
        cursor: pointer;
    }

    .floor{
        margin-right: 5px;
        font-size: 12px;
        color:#999;

        &:after{
            content:'·';
            margin-left: 5px;
        }
    }

    .comment-content{
        margin: 15px 0;
    }

    .interaction{
        font-size: 15px;
        color:#999;

        .praise,
        .reply{
            margin-right: 15px;
            cursor: pointer;

            i{
                margin-right: 3px;
            }
        }
    }
}
.comment-region{
    padding-left: 20px;
    margin-top: 15px;
    border-left: 2px solid #ccc;

    .comment-child{
        padding:15px 0;
        border-bottom:1px dashed #eee;
    }

    .content{
        font-size: 14px;

        .c-delete{
            margin-left: auto;
            color:#ccc;
            cursor: pointer;
        }
    }

    .reply{
        margin-right: 15px;
        font-size: 12px;
        color:#999;
        cursor: pointer;

        i{
            vertical-align: middle;
            font-size: 14px;
            margin-right: 3px;
        }
    }
}
.comment-input{
    margin-top: 20px;

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
.praise:hover{
    color:@red;
}

.reply:hover{
    color:#333;
}
.pageControl{
    text-align: center;
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

<style>
.emoji{
    vertical-align: top;
}
</style>