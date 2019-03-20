<template>
    <div v-if="notebooks" class="notebooks">
        <div class="notebook flex" v-for="(item,index) in notebooks" :key="index">
            <infoPart :item="item" type="special" slug="item.user.slug"></infoPart>
            <FollowBtn class="btn"></FollowBtn>
        </div>
    </div>
</template>

<script>
import infoPart from '../../components/searchcomponents/infoPart'
import FollowBtn from '../../components/mycomponents/FollowBtn'

export default {
    name:'',
    data () {
        return {
            notebooks:null
        };
    },
    created() {
        this.$Loading.start()
        this.$axios('/api/search/notebook').then(res=>{
            if(res.status == 200){
                this.notebooks = res.data.entries
                console.log(res.data);
                this.$Loading.finish()
            }else{
                this.$Loading.error()
                // eslint-disable-next-line
                console.error(res.status)
            }
        })
    },
    components:{
        infoPart,
        FollowBtn
    }
}

</script>

<style lang="less" scoped>
.notebook{
    align-items: center;
    padding: 20px 0;
    border-bottom:1px solid #f0f0f0;

    .btn{
        margin-left: auto;
    }
}
</style>