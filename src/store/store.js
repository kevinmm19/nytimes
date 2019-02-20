import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        posts: [],
        loading: true,
        error429: false,
        errorFetch: false
    },
    mutations: {
        setFlags(state, payload) {
            state.errorFetch = payload.errorFetch;
            state.error429 = payload.error429;
            state.loading = payload.loading;
        },
        setPosts(state, payload) {
            state.posts = payload.list;
        }
    }
});