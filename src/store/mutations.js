export default {
    login (state) {
        state.isLogin = true;
    },
    logout(state) {
        state.isLogin = false;
    },
    pushArticle(state,payload){
        this.state.myArticleList.push(payload)
    }
}