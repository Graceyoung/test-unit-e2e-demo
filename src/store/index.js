import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = {
    state: {
        user: [{name: 'username1'}],
        userName: ''
    },
    mutations: {
        setUsers(state,user) {
            if (state.user.length > 3){
                state.user.splice(0,state.user.length - 2);
            }
            state.user.push(user);
        }
    }
};


export default new Vuex.Store(store);
// export {store};
