import Vue from "vue"
import Vuex from "vuex"
import actions from "./actions"
Vue.use(Vuex)
//状态管理的变量名固定为state
const state = {
    PerInfoAnswer:'',
    routesListFlag:false
}

const mutations = {
    storeAnswer(state,data){
        state.PerInfoAnswer = data
    },
    setRolesList(state,data){
        state.routesListFlag = data
    }
}

const store = new Vuex.Store({
    state,
	mutations,
	actions
})

export default store