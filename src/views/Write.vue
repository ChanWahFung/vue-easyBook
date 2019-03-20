<template>
    <div class="write-page">
        <input type="text" class="title" v-model="title">
        <tinymce-text id="tinymce" @release="release"></tinymce-text>
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'

import TinymceText from '../components/TinymceText'

export default {
    name:'',
    data () {
        return {
            title:'无标题文章'
        };
    },
    computed: {
        ...mapState(['user'])
    },
    methods:{
        ...mapMutations(['pushArticle']),
        release(content){
            let articleObj = {
                object:{
                    data:{
                        commentable: true,
                        first_shared_at: new Date().getTime(),
                        id: 43338718,
                        likes_count: 338,
                        list_image_url: "http://upload-images.jianshu.io/upload_images/9280839-f29a18471c320c50.png",
                        paid: false,
                        public_abbr: content,
                        public_comments_count: 0,
                        slug: "e4cf74879e0b",
                        title: this.title,
                        total_fp_amount: 3742,
                        total_rewards_count: 0,
                        user: {
                            avatar: this.user.avatar,
                            nickname: this.user.nickname,
                            slug: this.user.slug
                        },
                        views_count: 1237
                    }
                }
            }
            this.pushArticle(articleObj)
            console.log(articleObj);
            this.$Message.success('发布成功')
        }
    },
    components:{
        'tinymce-text':TinymceText
    }
}

</script>

<style scoped>
.write-page{
    padding: 8px;
}
.title{
    padding: 5px 8px;
    font-size: 28px;
    font-weight: 600;
    color:#424242;
    border:none;
    outline: none;
}
</style>