import Vue from 'vue';
import Router from 'vue-router';

//一级路由
import EbFind from './views/EbFind.vue'
import EbFollow from './views/EbFollow.vue'
import ArticleDetail from './views/ArticleDetail.vue'

//二级路由
import Note from './views/search/Note.vue'
import Users from './views/search/Users.vue'
import Collection from './views/search/Collection.vue'
import NoteBook from './views/search/NoteBook.vue'


Vue.use(Router);

const routes = [
    {path:'/',name:'ebfind',component:EbFind},
    {path:'/follow',name:'ebfollow',component:EbFollow},
    {path:'/article/:slug',name:'article',component:ArticleDetail},
    {path:'/author/:slug',name:'author',component:() => import('./views/AuthorDetail.vue')},
    {path:'/collection/:slug',name:'collection',component:() => import('./views/CollectionDetail.vue')},
    {path:'/search',name:'search',component:() => import('./views/Search.vue'),
        // redirect属性 设置默认显示的二级路由页面    
        redirect:'/search/notes',
        // 通过一级路由的 children 属性设置二级路由
        children:[
            {path:'/search/notes',name:'notes',component:Note},
            {path:'/search/users',name:'users',component:Users},
            {path:'/search/collections',name:'collections',component:Collection},
            {path:'/search/notebook',name:'notebook',component:NoteBook}
    ]},
    {path:'/login',name:'login',component:() => import('./views/Login.vue')},
    {path:'/write',name:'write',component:() => import('./views/Write.vue')},
]

export default new Router({
    routes,
    mode:'history',
});
