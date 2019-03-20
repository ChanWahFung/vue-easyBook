<template>
    <span class="author">
        <slot></slot>
    </span>
</template>

<script>
export default {
    name:'',
    data () {
        return {
        };
    },
}

</script>

<style scoped>
.author{
    margin-right: 10px;
    font-size: 12px;
    color:#999;
    cursor: pointer;
}
</style>