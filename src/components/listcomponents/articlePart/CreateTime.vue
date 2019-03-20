<template>
    <span class="time">
        <Time :time="time" :type="type"></Time>
    </span>
</template>

<script>
export default {
    name:'',
    props:{
        time:[Number,Date,String],
        type:{
            type:String,
            default:'relative'
        }
    },
    filters:{
        formatDate(val){
            return new Date(val).getTime();
        }
    },
    data () {
        return {
        };
    },
}

</script>

<style scoped>
.time{
    margin-right: 10px;
    font-size: 12px;
    color:#999;
}
</style>