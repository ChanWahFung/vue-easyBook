<template>
<div class="warp container">
    <div class="search flex">
        <div class="side flex-1">
            <div class="sticky-box">
                <route-list></route-list>
                <hot-search></hot-search>
                <recent-search></recent-search>
            </div>
        </div>
        <div class="mainBox flex-2">
            <router-view></router-view>
        </div>
    </div>
</div>
</template>

<script>
import RouteList from '../components/searchcomponents/RouteList'
import HotSearch from '../components/searchcomponents/HotSearch'
import RecentSearch from '../components/searchcomponents/RecentSearch'

export default {
    name:'',
    data () {
        return {
        };
    },
    components:{
        'route-list':RouteList,
        'hot-search':HotSearch,
        'recent-search':RecentSearch
    }
}

</script>

<style lang="less" scoped>
.search{
    position: relative;
}
.side{
    position:relative;
    margin-right: 35px;

    .sticky-box{
        position:sticky;
        top: 79px;
        left: 0;
    }
}

</style>