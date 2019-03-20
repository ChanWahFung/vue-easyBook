<template>
    <div class="login-page">
        <div class="logo">
            <a href="/">
                <img class="auto-img" src="../../public/img/nav-logo.png" alt="">
            </a>
        </div>
        <div class="form">
            <h2 class="title">登录</h2>
            <Form ref="formInline" :model="formInline" :rules="ruleInline" >
                <FormItem prop="user">
                    <Input type="text" size="large" autofocus v-model="formInline.user" placeholder="用户名">
                        <Icon custom="iconfont icon-yonghu" size="20" color="#999" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" size="large" v-model="formInline.password" placeholder="密码" @keydown.enter.native="handleSubmit">
                        <Icon custom="iconfont icon-mima" size="20" color="#999" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button class="login-btn" type="primary" @click="handleSubmit" size="large" long >登录</Button>
                </FormItem>
            </Form>
            <Divider class="desc">社交账号登录</Divider>
            <div class="flex other-logins">
                <span class="flex-1 iconfont icon-qq"></span>
                <span class="flex-1 iconfont icon-weixin"></span>
                <span class="flex-1 iconfont icon-weibo"></span>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name:'',
    inject:['app'],
    data () {
        return {
            from:'',
            formInline: {
                user: '',
                password: ''
            },
            ruleInline: {
                user: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        handleSubmit() {
            let username_isAdopt = this.formInline.user == this.user.username
            let psw_isAdopt = this.formInline.password == this.user.psw;
            if(!username_isAdopt){
                this.$Message.error('用户名错误!');
                return
            }
            if(!psw_isAdopt){
                this.$Message.error('密码错误!');
                return
            }
            if(username_isAdopt && psw_isAdopt){
                this.$store.commit('login')
                this.$Message.success('登录成功!')
                this.$router.replace(this.from)
            }          
        }
    },
    beforeRouteEnter: (to, from, next) => {
        next(vm=>{
            vm.from = from.fullPath;
            vm.app.showHeader = false;
        })
    },
    beforeRouteLeave (to, from, next) {
        this.app.showHeader = true;
        next();
    }
}

</script>

<style lang="less" scoped>
.login-page{
    position: absolute;
    top: 0;
    left:0;
    bottom:0;
    right:0;
    background: #f5f5f5;

    .logo{
        position:absolute;
        top: 30px;
        left: 10px;
        width: 180px;
        height: 96px;
    }

    .form{
        position: absolute;
        top: 110px;
        left: calc(50% - 200px);
        width: 400px;
        padding: 50px 50px 30px;
        background: #fff;
        border-radius: 5px;
        box-shadow: 0 0 7px 0 #ccc;
        box-sizing: border-box;

        .title{
            display: block;
            width: 80px;
            padding-bottom: 10px;
            margin: 0 auto 30px auto;
            text-align:center;
            font-size: 18px;
            font-weight: 600;
            border-bottom:2px solid @red;
            color:@red;
        }

        .desc{
            margin-top: 50px;
            font-weight: 13px;
            color:#999;
        }

        .other-logins{
            margin-top:15px;
            
            >span{
                font-size: 30px;
                text-align: center;
            }
            
            .icon-qq{
                color:@blue;
            }

            .icon-weixin{
                color:@green;
            }

            .icon-weibo{
                color:@red;
            }
        }
    }
}
</style>