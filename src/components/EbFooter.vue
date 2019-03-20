<template>
    <footer class="EbFooter">
        <p class="service">
            <a href="#">关于简书</a>
            <a href="#">联系我们</a>
            <a href="#">加入我们</a>
            <a href="#">简书出版</a>
            <a href="#">品牌与徽标</a>
            <a href="#">帮助中心</a>
            <a href="#">合作伙伴</a>
        </p>
        <p class="copyright">
            ©2012-2019 上海佰集信息科技有限公司 / 简书 / 沪ICP备11018329号-5 / 沪公网安备31010402002252号 /
        </p>
    </footer>
</template>

<script>
export default {
    name:'EbFooter',
    data () {
        return {
        };
    },
}

</script>

<style lang="less" scoped>
.EbFooter{
    padding: 50px 0 20px 0;

    .service{
        font-size: 14px;
        color:#888;

        a{
            color:inherit;

            &:not(:last-child)::after{
                content: '|';
                margin: 0 8px;
            }

            &:hover{
                color:#333;
            }
        }
    }
    .copyright{
        margin-top: 15px;
        font-size: 12px;
        color:#999;
    }
}

</style>