<template>
    <div>
        <template v-if="loading">
            <load position="relative"/>
        </template>
        <template v-else>
            <div class="default-background default-padding">
                <template v-if="user">
                    Logged in
                    <input v-on:click="logoutUser" class="margin-normal full darker" type="submit" v-bind:value="logout" />
                </template>
                <template v-else>
                    Allow us to use Reddit
                    <form v-on:submit.prevent="form">
                        <input class="darker margin-normal full" type="submit" v-bind:value="submit" />
                    </form>
                </template>
            </div>
        </template>
    </div>
</template>
<style lang="stylus">
</style>
<script>
    import LoadComp from '../shared/Load.vue';
    export default{
        data:function(){

            return{
                user:this.$store.getters.getLogin,
//                username:null,
//                password:null,
                submit:'Authenticate',
                logout:'Logout',
                loading:false
            }
        },
        mounted:function(){
            //check user login by sessions
            if(!(this.user)) {
                this.$store.dispatch('FETCH_LOGIN_SESSION', {});
            }
        },
        methods:{
            'notifyIncorrect':function(){
                let self=this;
                this.submit = 'Error';
                setTimeout(function(){
                    self.resetBtn();
                }, 2000);
            },
            'resetBtn':function(){
                this.submit = 'Authenticate'
            },
            'form':function(){
                this.submit = '...';
                let self=this;
                setTimeout(function(){
                    self.$store.dispatch('FETCH_LOGIN_ASYNC', {
//                        username: self.username,
//                        password: self.password
                    });
                }, 100);
            },
            'logoutUser':function(){
                let self=this;
                setTimeout(function () {
                    self.$store.dispatch('FETCH_LOGOUT', {});
                })
            }
        },
        watch:{
            '$store.getters.getLogin':function(val, oldVal){

//                this.username = null;
//                this.password = null;

                if(!(val)) {//console.log('user has signed out');
                    this.user = val;
                    this.resetBtn();
                } else {
                    if (val.status) {//console.log('logged in');
                        this.user = val;
                        this.resetBtn();
                        this.loading = false;
                    } else if (val.status === false) {//console.log('creds wrong');
                        this.notifyIncorrect();
                    }
                }
            },
            '$store.getters.getSessionUser':function(val, oldVal){

                var sessionUser = val;

                if(sessionUser.status){
                    this.loading = true;
                    this.$store.dispatch('FETCH_LOGIN_ASYNC', {
//                        username: sessionUser.u,
//                        password: sessionUser.p
                    });
                }
            }
        },
        components:{
            'load':LoadComp
        }
    }
</script>
