import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

export default new vuex.Store({
    state:{
        collapsed:false,
        selectedKeys:[],
        selectedInfo:'',
    },
    mutations:{
        selectedKeys(state,data){
            state.selectedKeys = data
        },
        clikSiderbarIcon(state,data){
            state.collapsed = !state.collapsed
            console.log(data)
        }
        
    }
})