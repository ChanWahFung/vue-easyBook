<template>
    <div v-if="entries" class="entries">
        <div class="entrie flex" v-for="(item,index) in entries" :key="index">
            <infoPart :item="item" type="special" :slug="item.slug"></infoPart>
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
            entries:null
        };
    },
    created() {
        this.$Loading.start()
        this.$axios('/api/search/collection').then(res=>{
            if(res.status == 200){
                this.entries = res.data.entries;
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
.entrie{
    align-items: center;
    padding: 20px 0;
    border-bottom:1px solid #f0f0f0;

    .btn{
        margin-left: auto;
    }
}
</style>