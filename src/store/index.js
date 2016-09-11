
import Vue from 'vue';

import Vuex from 'vuex';

const Fingerprint2 = require('fingerprintjs2');

const aesjs = require('aes-js');

const encryptionKey = require("../creds/encryption.js");

const decrypt = function(text){
    var key = aesjs.util.convertStringToBytes(encryptionKey);
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var decryptedBytes = aesCtr.decrypt(text);
    return aesjs.util.convertBytesToString(decryptedBytes);
};

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

                let url = window.location.href;
                let arr = url.split("/");
                let resultUrl = arr[0] + "//" + arr[2];
                let toGet = resultUrl + '/api/upvote/?token=' + Obj.token + '&content=' + Obj.content + '&score=' + Obj.score;

                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        let curr = JSON.parse(this.responseText);
                        resolve(curr);
                    }
                };
                xhttp.open("GET", toGet, true);
                xhttp.send();
            })
        },
        FETCH_LOGOUT: ({ commit, dispatch, state }, data) => {

            new Fingerprint2().get(function(deviceHash, components){

                let url = window.location.href;
                let arr = url.split("/");
                let resultUrl = arr[0] + "//" + arr[2];
                let toGet = resultUrl + '/api/sessionDestroy/?device=' + deviceHash;

                var xhttp = new XMLHttpRequest();
                xhttp.open("GET", toGet, true);
                xhttp.send();

                commit('SET_LOGIN', {null});
            });
        },
        FETCH_LOGIN_SESSION: ({ commit, dispatch, state }, data) => {

            new Fingerprint2().get(function(deviceHash, components){

                let url = window.location.href;
                let arr = url.split("/");
                let resultUrl = arr[0] + "//" + arr[2];
                let toGet = resultUrl + '/api/sessionUsers/?device=' + deviceHash;

                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        if(this.responseText.length > 0) {
                            let curr = JSON.parse(this.responseText);
                            curr['status'] = true;
                            curr.p = decrypt(JSON.parse(curr.p));
                            commit("SET_SESSION_LOGIN", {curr});
                        } else {
                            let curr = {};
                            curr['status'] = false;
                            commit("SET_SESSION_LOGIN", {curr});
                        }
                    }
                };
                xhttp.open("GET", toGet, true);
                xhttp.send();
            });
        },
        FETCH_LOGIN_ASYNC: ({ commit, dispatch, state }, data) => {

            new Fingerprint2().get(function(deviceHash, components){

                let url = window.location.href;
                let arr = url.split("/");
                let resultUrl = arr[0] + "//" + arr[2];
                let toGet = resultUrl + '/api/login/?username=' + data.username + '&password=' + data.password + '&device=' + deviceHash;

                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        let curr = JSON.parse(this.responseText);
                        if(curr.data) {

                            curr['status'] = {status:true};
                            curr.password = decrypt(curr.password);

                            if(!(curr.token.length > 0)){
                                // var verifyUrl = "https://www.reddit.com/api/v1/authorize?client_id=Cd9I1cNvacR6Vw&response_type=code&state=" + curr.device + "&redirect_uri=http://reddit.evanjon.es/&duration=permanent&scope=vote";
                                location.href = verifyUrl;
                            }

                            commit('SET_LOGIN', {curr});
                        } else { //logins incorrect
                            curr = {status:false, message:'Creds incorrect'};
                            commit('SET_LOGIN', {curr});
                        }
                    }
                };
                xhttp.open("GET", toGet, true);
                xhttp.send();
            });
        }
    },
    mutations: {
        SET_MESSAGE_USER: (state, { curr }) => {
            state.messageUser = curr;
        },
        SET_VISITED: (state, { curr }) => {
            state.visited = curr;
        },
        SET_LOGIN: (state, { curr }) => {
            state.user = curr;
        },
        SET_SESSION_LOGIN: (state, { curr }) => {
            state.sessionUser = curr;
        }
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
