<template>
<div class="warp container">
    <div v-if="articles" class="EbFind">
        <div class="warp flex">
            <div class="mainBox flex-2">
                <div class="banner">
                    <Carousel v-model="carouseIndex" :radius-dot="true" arrow="hover" loop>
                        <CarouselItem v-for="(item,index) in carouselArr" :key="index">
                            <div class="banner-warp">
                                <img class="auto-img" :src="item" alt="">
                            </div>
                        </CarouselItem>
                    </Carousel>
                </div>
                <ArticleList :articles="articles" type="home" @load-more="loadmore"></ArticleList>
            </div>
            <div class="side flex-1">
                <div class="banner-club">
                    <a :href="index==5?'/collection/e048f1a72e3d':'javascript:void(0)'" v-for="(item,index) in bannerClubArr" :key="index">
                        <img class="auto-img" :src="item" >
                    </a>
                </div>
                <div class="download flex">
                    <div class="show-ewm">
                        <img class="auto-img" src="../..//public/img/download-ewm.png" alt="">
                    </div>
                    <div class="ewm">
                        <img class="auto-img" src="../..//public/img/download-ewm.png">
                    </div>
                    <div class="flex-2 content">
                        <p class="title">下载简书手机App</p>
                        <p class="desc">随时随地发现和创作内容</p>
                    </div>
                </div>
                <special-part :specials="specials"></special-part>
                <recommend-author ></recommend-author>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {mapState} from 'vuex'

import ArticleList from '../components/listcomponents/ArticleList'
import SpecialPart from '../components/parts/SpecialPart'
import RecAuthorPart from '../components/parts/RecAuthorPart'

export default {
    name:'EbFind',
    data () {
        return {
            carouseIndex:0,
            articles:null,
            specials:null,
            authors:null
        };
    },
    computed: {
        ...mapState(['bannerClubArr','carouselArr'])
    },
    methods: {
        getArtcles(){
            return this.$axios('/api/asimov/trending/now?count=15&note_ids=')
        },
        getSpecial(){
            return this.$axios('/api/asimov/subscriptions/recommended_collections')
        },
        loadmore(){
            this.$Loading.start();
            this.getArtcles().then(res=>{
                if(res.status == 200){
                    this.articles.push(...res.data);
                    this.$Loading.finish();
                    this.$Message.success({
                        content:'已经为您添加20篇新文章',
                        duration: 3
                    });
                }else{
                    // eslint-disable-next-line
                    console.error('articles请求失败：'+res.status);
                    this.$Loading.error();
                }
            })
        }
    },
    filters: {
        imgUrl(val){
            return require('../../public/img/banner-club-'+val+'.png');
        }
    },
    created() {
        this.$Loading.start();
        this.getArtcles().then(res=>{
            if(res.status == 200){
                this.articles = res.data;
                this.$Loading.finish();
            }else{
                // eslint-disable-next-line
                console.error('articles请求失败：'+res.status)
                this.$Loading.error();
            }
        })
        this.getSpecial().then(res=>{
            if(res.status == 200){
                this.specials = res.data;
            }else{
                // eslint-disable-next-line
                console.error('specials请求失败：'+res.status)
            }
        })
    },
    components:{
        ArticleList,
        'special-part':SpecialPart,
        'recommend-author':RecAuthorPart
    }
}

</script>

<style lang="less" scoped>

.side{
    margin-left: 40px;

    .download{
        position: relative;
        align-items: center;
        padding: 10px 20px;
        margin-top: 10px;
        border:1px solid #ddd;
        border-radius: 10px;
        cursor: pointer;

        &:hover .show-ewm{
            visibility: visible;
            opacity: 1;
        }

        .show-ewm{
            position:absolute;
            top: -220px;
            left: calc(50% - 100px);
            width: 200px;
            padding: 15px;
            background: #fff;
            border:1px solid #999;
            border-radius: 10px;
            box-sizing: border-box;
            box-shadow: 0 5px 15px 0 #999;
            opacity: 0;
            visibility: hidden;
            transition: all .2s;

            // &::after{
            //     content: '';
            //     display: block;
            //     position: absolute;
            //     bottom: -15px;
            //     left:0;
            //     border-width:15px;
            //     border-style:solid;
            //     border-color:#fff transparent transparent;
            // }
        }

        .ewm{
            flex:0 0 60px;
            margin-right: 10px;
            font-size: 0px;
        }

        .title{
            font-size: 17px;
            margin-bottom: 5px;
        }

        .desc{
            font-size: 14px;
            color:#999;
        }
    }
}
</style>