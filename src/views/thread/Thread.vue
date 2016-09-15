<template>
    <div>
        <div class="standard-margin col-xs-12 padding-0">
            <div class="col-xs-12 col-sm-4 pull-xs-right">
                <login-panel/>
                <message-panel/>
                <div class="spacer"/>
            </div>
            <div class="col-xs-12 col-sm-8 pull-xs-left">
                <template v-if="loaded">
                    <div class="comment-container col-xs-12 padding-0 animated fadeIn">
                        <div class="comment col-xs-12 padding-0">
                            <h2>
                                {{main.title}}
                            </h2>
                            <h4>
                                <b>{{main.author}}:</b><p v-html="getHtml(main.selftext_html)"/>
                            </h4>
                            <a target="_blank" v-bind:href="main.url">
                                <div class="col-xs-12 padding-0">
                                    <div class="thread-content">
                                        <template v-if="checkIfDataIsAnImg(main.url)">
                                            <img class="full" v-bind:src="main.url" />
                                        </template>
                                        <template v-else>
                                            <template v-if="checkIfSelfPost(main)">
                                                <!--display nothing here-->
                                            </template>
                                            <template v-else>
                                                <a v-bind:href="main.url" target="_blank">
                                                    <h4 class="custom-link">Link</h4>
                                                </a>
                                            </template>
                                        </template>
                                    </div>
                                </div>
                            </a>
                            <div class="col-xs-12 col-sm-6 offset-sm-3 padding-0">
                                <div class="voting">
                                    <div class="col-xs-6 padding-0">
                                        <button class="full" v-on:click="vote(main, 1)">
                                            <img src="http://i.imgur.com/CvCo5t3.png" />
                                        </button>
                                    </div>
                                    <div class="col-xs-6 padding-0">
                                        <button class="full" v-on:click="vote(main, -1)">
                                            <img src="http://i.imgur.com/MgmiEgV.png" />
                                        </button>
                                    </div>
                                    <div style="clear: both;"></div>
                                </div>
                            </div>
                        </div>
                        <top-level-comments v-bind:data="comments" />
                    </div>
                </template>
                <template v-else>
                    <load position="relative"/>
                </template>
            </div>
        </div>
    </div>
</template>
<style lang="stylus">
    .thread-content iframe {
        border: solid transparent 0;
        height: 500px;
    }
    .custom-link, .custom-link:visited, .custom-link:focus  {
        color:#5f99cf!important;
    }
    .custom-link:hover {
        color:#cee3f8!important;
    }
</style>
<script>
    import { getCommentsByThread, getDecodedHtml } from '../../methods';
    import topComp from '../../components/thread/comments/Top.vue';
    import loadComp from '../../components/shared/Load.vue';
    import LoginPanel from '../../components/login/LoginPanel.vue';
    import MessagePanel from '../../components/shared/MessagePanel.vue';
    export default{
        name: 'thread-comp',
        props:{
        },
        data:function(){
            return{
                main:null,
                comments:null,
                loaded:false
            }
        },
        mounted:function(){
            this.loadThread();
        },
        methods:{
            checkIfSelfPost:function(data){
                return (data.domain.indexOf('self.') > -1);
            },
            checkIfDataIsAnImg:function(data){
                return (
                        (
                                (data.indexOf('.jpeg') > -1) ||
                                (data.indexOf('.jpg') > -1) ||
                                (data.indexOf('.gif') > -1) ||
                                (data.indexOf('.png') > -1)
                        ) && (!(data.indexOf('.gifv') > -1))
                );
            },
            loadThread:function(event){

                let self = this;
                self.moreLoading = true;

                getCommentsByThread({
                    thread:self.$router.app._route.path
                }).then(function(data){
                    self.main = data[0].data.children[0].data;
                    self.comments = data[1].data.children;
                    self.loaded = true;
                });
            },
            'vote':function(content, num){

                let self = this;
                let user = this.$store.getters.getLogin;
                let text = (num == 1) ? 'Upvoted' : 'Downvoted';
                let error = 'Not signed in';
                let loading = 'Loading';

                if(user) { //the user is signed in
                    let info = {
                        text: loading,
                        time: 1000
                    };
                    self.$store.dispatch('FETCH_MESSAGE_USER', {info});
                    this.$store.dispatch('FETCH_UPVOTE', {
                        token: user.token,
                        content: content.id,
                        score: num
                    }).then(function (data) {
                        let info = {
                            text: text,
                            time: 1000
                        };
                        self.$store.dispatch('FETCH_MESSAGE_USER', {info});
                    });
                } else { //user is not signed in
                    let info = {
                        text: error,
                        time: 1000
                    };
                    self.$store.dispatch('FETCH_MESSAGE_USER', {info});
                }
            },
            'getHtml':function(val){
                if(!(val)){return 'No self post'}
                return getDecodedHtml(val);
            }
        },
        components:{
            'top-level-comments':topComp,
            'load': loadComp,
            'login-panel':LoginPanel,
            'message-panel':MessagePanel
        },
        watch:{
            'main':function(val, oldVal){
            }
        }
    }
</script>
