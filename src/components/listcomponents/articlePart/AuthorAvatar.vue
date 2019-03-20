<template>
    <span class="avatar">
        <img v-if="!url" class="avatar-large-square" src="../../../assets/logo.png" >
        <img v-else-if="size=='large' && shape=='square'" class="avatar-large-square" :src="url">
        <img v-else-if="size=='default'" class="avatar-default" :src="url">
        <img v-else-if="size=='large'" class="avatar-large" :src="url">
    </span>
</template>

<script>
export default {
    name:'',
    props:{
        url:{
            type:String,
        },
        size:{
            type:String,
            default:'default'
        },
        shape:String
    },
    data () {
        return {
        };
    },
}

</script>

<style lang="less" scoped>
.avatar{
    display: inline-block;
}
.avatar-default{
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border: 1px solid #f0f0f0;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
}
.avatar-large{
    width: 50px;
    height: 50px;
    margin-right: 8px;
    border: 1px solid #f0f0f0;    
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
}
.avatar-large-square{
    width: 50px;
    height: 50px;
    margin-right: 8px;
    border: 1px solid #f0f0f0;    
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;
}
</style>