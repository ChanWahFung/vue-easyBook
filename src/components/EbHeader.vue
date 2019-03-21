<template>
    <header class="EbHeader">
        <div class="warp flex">
            <div @click="goHome" class="flex-1 flex logo">
                <img src="../../public/img/nav-logo.png" height="56" alt="">
            </div>
            <div class="flex flex-container">
                <ul v-if="isLogin" class="flex-1 flex nav-list">
                    <li class="flex-1">
                        <router-link class="link" exact tag="span" to="/">发现</router-link>
                    </li>
                    <li class="flex-1">
                        <router-link class="link" exact tag="span" to="/follow">关注</router-link>
                    </li>
                    <li class="flex-1">
                       
                    </li>
                </ul>
                <ul  v-else class="flex-1 flex nav-list">
                    <li class="flex-1">
                        <router-link class="link" exact tag="span" to="/">首页</router-link>
                    </li>
                </ul>
                <div class="flex-2 flex search">
                    <input @keydown.enter="goSearch" @focus="focus" @blur="blur" :class="{active:show}" v-model="val" type="text" class="search-input" placeholder="搜索">
                    <span @click="goSearch" class="icon iconfont icon-sousuo" :class="{active:show}"></span>
                </div>
                <div v-if="!isLogin" class="flex flex-1 user">
                    <router-link class="login" tag="span" to="/login">登录</router-link>
                    <span class="register">注册</span>
                </div>
                <div v-else class="flex flex-1 user">
                    <Dropdown style="margin-left: 50px;">
                        <div class="avatar" @click="goMyHome">
                            <img class="auto-img" :src="user.avatar" alt="">
                            <i class="icon iconfont icon-below-s"></i>
                        </div>
                        <DropdownMenu slot="list">
                            <DropdownItem class="list-item" @click.native="goMyHome">我的主页</DropdownItem>
                            <DropdownItem class="list-item">收藏的文章</DropdownItem>
                            <DropdownItem class="list-item">喜欢的文章</DropdownItem>
                            <DropdownItem class="list-item" @click.native="logout" divided>退出</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <div class="write">
                <div class="write-btn" @click="goWrite">
                    <span class="icon iconfont icon-fankuitianxie"></span>
                    <span>写文章</span>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name:'EbHeader',
    data () {
        return {
            val:'',
            show:false
        };
    },
    computed: {
        ...mapState(['isLogin','user'])
    },
    methods:{
        goHome(){
            this.$router.push('/')
        },
        goSearch(e){
            this.val = ''
            e.target.blur()
            this.$router.push('/search')
        },
        goMyHome(){
            this.$router.push('/author/'+this.user.slug)
        },
        goWrite(){
            if(this.isLogin == false){
                this.$router.push('/login')
                return;
            }
            this.$router.push('/write')
        },
        logout(){
            this.$store.commit('logout');
            this.$router.push('/login');
            this.$Message.success('退出成功')
        },
        focus(){
            this.show = true;
        },
        blur(){
            this.show = false;
        }
    }
}

</script>

<style lang="less" scoped>
.EbHeader{
    z-index: 99;
    position:sticky;
    top:0;
    left:0;
    background: #fff;
    border-bottom: 1px solid #f2f2f2;
    box-shadow: 0 0 5px 0 #eee;

    .logo{
        align-items: center;
        cursor: pointer;
    }

    .nav-list{
        align-items: center;
        font-size: 19px;

        >li{
            display: flex;
            align-items: center;
            height: 100%;
        }

        .link{
            cursor: pointer;
        }
    }

    .search{
        align-items: center;

        .search-input{
            width: 160px;
            padding: 8px 40px 8px 20px;
            font-size: 14px;
            color:#424242;
            background: #f3f3f3;
            outline: none;
            border: none;
            border-radius: 20px;
            transition: all .5s;

            &.active{
                width: 250px;
            }
        }

        .icon{
            width: 30px;
            height: 30px;
            text-align: center;
            margin-left: -35px;
            font-size: 18px;
            color:#999;
            border-radius: 50%;
            transition: all .3s;

            &.active{
                background: #999;
                color:#fff;
            }
        }
    }

    .user{
        align-items: center;
        justify-content: space-around;
        color:#999;
        font-size: 15px;

        >span{
            cursor: pointer;
        }

        .register,
        .login{
            padding: 6px 25px;
            color:@red;
            border-radius: 20px;
            border: 1px solid @red;
        }

        .avatar{
            position: relative;
            width: 40px;
            height: 40px;
            cursor: pointer;
            
            >img{
                border-radius: 50%;
                overflow: hidden;
            }

            .icon{
                position: absolute;
                top: 10px;
                right: -20px;
                font-size: 14px;
            }
        }

        .list-item{
            padding: 10px 16px;
            font-size: 16px !important;
        }
    }

    .write{
        flex:0 0 150px;
    }

    .write-btn{
        display: inline-block;
        background: @red;
        padding: 6px 15px;
        margin:8px 15px 0;
        line-height: 24px;
        border-radius: 20px;
        color:#fff;
        cursor: pointer;

        .icon{
            margin-right: 5px;
        }
    }
}
.router-link-active {
    color:@red;
}
</style>