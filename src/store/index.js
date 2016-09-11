
import Vue from 'vue';

import Vuex from 'vuex';

import { request, decrypt } from '../methods';

const Fingerprint2 = require('fingerprintjs2');

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        visited:null,
        user:null,
        sessionUser:null,
        messageUser:null
    },
    actions: {
        FETCH_MESSAGE_USER: ({ commit, dispatch, state }, curr) => {
            commit('SET_MESSAGE_USER', { curr });
        },
        FETCH_VISITED: ({ commit, dispatch, state }, curr) => {
            commit('SET_VISITED', { curr });
        },
        FETCH_UPVOTE: ({ commit, dispatch, state }, Obj) => {
            return new Promise(function(resolve, reject){
                request({
                    url:'/api/upvote/?token=' + Obj.token + '&content=' + Obj.content + '&score=' + Obj.score,
                    onComplete:function(curr){resolve(curr);}
                });
            })
        },
        FETCH_LOGOUT: ({ commit, dispatch, state }, data) => {
            new Fingerprint2().get(function(deviceHash, components){
                request({
                    url:'/api/sessionDestroy/?device=' + deviceHash,
                    onComplete:function(curr){}
                });
                commit('SET_LOGIN', {null});//we don't need to wait on the request
            });
        },
        FETCH_LOGIN_SESSION: ({ commit, dispatch, state }, data) => {
            new Fingerprint2().get(function(deviceHash, components){
                request({
                    url:'/api/sessionUsers/?device=' + deviceHash,
                    onComplete:function(curr){
                        if(typeof curr == 'object') {
                            curr['status'] = true;
                            curr.p = decrypt(JSON.parse(curr.p));
                            commit("SET_SESSION_LOGIN", {curr});
                        } else {
                            curr = {};
                            curr['status'] = false;
                            commit("SET_SESSION_LOGIN", {curr});
                        }
                    }
                });
            });
        },
        FETCH_LOGIN_ASYNC: ({ commit, dispatch, state }, data) => {
            new Fingerprint2().get(function(deviceHash, components){
                request({
                    url:'/api/login/?username=' + data.username + '&password=' + data.password + '&device=' + deviceHash,
                    onComplete:function(curr){
                        if(curr.data) {
                            curr['status'] = {status:true};
                            curr.password = decrypt(curr.password);
                            if(!(curr.token.length > 0)){
                                var verifyUrl = "https://www.reddit.com/api/v1/authorize?client_id=Cd9I1cNvacR6Vw&response_type=code&state=" + curr.device + "&redirect_uri=http://reddit.evanjon.es/&duration=permanent&scope=vote";
                                location.href = verifyUrl;
                            }
                            commit('SET_LOGIN', {curr});
                        } else { //logins incorrect
                            curr = {status:false, message:'Creds incorrect'};
                            commit('SET_LOGIN', {curr});
                        }
                    }
                });
            });
        }
    },
    mutations: {
        SET_MESSAGE_USER: (state, { curr }) => {state.messageUser = curr;},
        SET_VISITED: (state, { curr }) => {state.visited = curr;},
        SET_LOGIN: (state, { curr }) => {state.user = curr;},
        SET_SESSION_LOGIN: (state, { curr }) => {state.sessionUser = curr;}
    },
    getters: {
        getSessionUser (state) {
            const { sessionUser } = state;
            return sessionUser;
        },
        getMessageUser (state) {
            const { messageUser } = state;
            return messageUser;
        },
        getVisited (state) {
            const { visited } = state;
            return visited;
        },
        getLogin (state){
            const { user } = state;
            return user;
        }
    }
});

export default store
