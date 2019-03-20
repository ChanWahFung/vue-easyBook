<template>
    <div>
        <textarea class="tinymce" :id="id"></textarea>
        <button class="btn" @click="release">发布文章</button>
    </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'

export default {
    name:'',
    props:{
        id:String
    },
    data () {
        return {
            init:{
                selector: '#'+this.id,
                language_url: 'tinymce/langs/zh_CN.js',
                language: 'zh_CN',
                skin_url: 'tinymce/skins/ui/oxide',
                height: 500,
                plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
                toolbar:
                'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
                branding: false,
                body_class: 'my_class'
            }
        };
    },
    methods:{
        release(){
            let content = tinymce.get(this.id).getContent()
            this.$emit('release',content)
        }
    },
    mounted () {
        tinymce.init(this.init)
    },
    beforeDestroy() {
        tinymce.get(this.id).destroy();
    },
}

</script>

<style lang="less" scoped>
.btn{
    float:right;
    margin-top: 20px;
    padding: 8px 25px;
    font-size: 16px;
    color:#fff;
    background: @red;
    border-radius: 18px;
    border: none;
    outline: none;
    cursor: pointer;
}
</style>