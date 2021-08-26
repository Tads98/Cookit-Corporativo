const state = {
    user: {
        username: ''
    },
    isAuthenticated: false,
    token: ''
}

const getters = {
    userData: state => state.user,
    isAuthenticated: state => state.isAuthenticated,
    getToken: state => state.token,
}

const mutations = {
    initializeStore(state){
        console.log(localStorage.getItem('token'))
        if(localStorage.getItem('token')){
            state.token = localStorage.getItem('token')
            state.isAuthenticated = true
        }
        else{
            state.token = ''
            state.isAuthenticated = false
        }
    },
    setToken(state, token) {
        state.token = token
        state.isAuthenticated = true
    },
    removeToken(state){
        state.token = ''
        state.isAuthenticated = false
    }
}

export default {
    state,
    getters,
    mutations,
}