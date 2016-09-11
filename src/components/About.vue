<template>
    <div class="standard-margin">
        <div class="col-xs-12 padding-0">
            <div class="col-xs-12 col-sm-4 pull-xs-right">
                <login-panel/>
                <div class="spacer"/>
            </div>
            <div class="col-xs-12 col-sm-8 pull-xs-left">
                <div class="comment-container full">
                    <p>
                        Basically Reddit as an un-interactive imageboard in a Pinterest layout.
                        We only support threads with jpg, jpeg, png, or gif extensions at the moment.
                    </p>
                    <p>
                        Made with NodeJS/Express and VueJS 2.0. Ft. Server-side rendering (some--most of the content is ajax'd), Valve's fingerprintjs2,
                        Vuex for state management, AES for encryption, and more.
                    </p>
                    <p>
                        Tweet me anytime <a class="custom-link" href="https://twitter.com/minieggs40" target="_blank">Evan Jones</a>
                    </p>
                    <p>
                        Check out the code on <a class="custom-link" href="https://github.com/mini-eggs/ReadReddit" target="_blank">Github.</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="stylus">
</style>
<script>
    import LoginPanel from './login/LoginPanel.vue';
    export default{
        data:function(){
            return{
            }
        },
        components:{
            'login-panel':LoginPanel
        }
    }
</script>
