export default {
    login (state) {
        state.isLogin = true;
    },
    logout(state) {
        state.isLogin = false;
    },
    pushArticle(state,payload){
        this.state.myArticleList.push(payload)
    },
    pushFollowList(state,payload){
        let index = 0;
        let isExist = this.state.followList.some((item,i)=>{
            index = i;
            return item.slug == payload.slug
        })
        if(isExist){
            this.state.followList.splice(index,1)
            return;
        }
        this.state.followList.push(payload)
    }
}