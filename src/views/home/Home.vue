<template>
    <div class="col-xs-12 padding-0">
        <div class="home-wrap">
            <div class="col-xs-12 col-sm-4 pull-xs-right">
                <div class="spacer"/>
                <login-panel/>
            </div>
            <div class="col-xs-12 col-sm-8 pull-xs-left">
                <input class="full" v-model="searchTerm" placeholder="Enter subreddit" />
                <template v-if="loading">
                    <div>
                        <load position="relative"/>
                    </div>
                </template>
                <template v-else>
                    <div>
                        <template v-for="(subreddit, index) in subreddits">
                            <!--<div>-->
                            <router-link v-bind:to="subreddit.data.url">
                                <button class="full">
                                    {{subreddit.data.url}}
                                </button>
                            </router-link>
                            <!--</div>-->
                        </template>
                        <template v-if="(!(subreddits.length > 0))">

                        </template>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<style lang="stylus">
    a button, input {
        margin:30px auto 0;
    }
    .home-wrap{
        margin-bottom:30px;
    }
</style>
<script>
    import topComp from '../../components/thread/comments/Top.vue';
    import loadComp from '../../components/shared/Load.vue';
    import LoginPanel from '../../components/login/LoginPanel.vue';
    import { getSubredditBySearch } from '../../methods';
    export default {
        name: 'home-comp',
        props: {
        },
        data: function(){
            return{
                searchTerm:null,
                subreddits:[],
                loading:false
            };
        },
        mounted: function(){
        },
        methods:{
            search:function(event){

                let self = this;
                self.loading = true;

                getSubredditBySearch({
                    search:this.searchTerm
                }).then(function(data){
                    self.subreddits = (data.data) ? data.data.children : [];
                    self.loading = false;
                });
            }
        },
        watch:{
            'searchTerm':function(val, oldVal){
                this.search();
            }
        },
        components:{
            'load': loadComp,
            'login-panel':LoginPanel
        }
    }
</script>