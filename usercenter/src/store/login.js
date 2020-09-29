import * as types from "./mutation-type"
const login = {
    state: {
        user: JSON.parse(localStorage.getItem('userInfo')) || {}
    },
    mutations: {
        [types.SAVE_USER_INFO](state, data) {
            state.user = data
            console.log('vux    data',data)
        },
    },
    actions: {
        saveUserInfo({ commit }, obj) {
            localStorage.setItem('userInfo', JSON.stringify(obj))
            commit(types.SAVE_USER_INFO, obj)
        }
    },
};
console.log('login state', login.state.user)

export default login;