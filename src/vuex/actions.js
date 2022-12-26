
const actions = {
    storeAnswer({ commit },data) {
        commit('storeAnswer',data)
    },
    setRolesList({ commit },data){
        commit('setRolesList',data)
    }
}

export default actions