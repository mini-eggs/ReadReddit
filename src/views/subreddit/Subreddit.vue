<template>
    <div>
        <div class="col-xs-12 padding-0 subreddit-wrap">
            <div class="col-xs-12 col-sm-4 pull-xs-right">
                <login-panel/>
                <message-panel/>
                <div class="spacer"/>
            </div>
            <div class="col-xs-12 col-sm-8 pull-xs-left">
                <template v-if="!initLoading">
                    <div class="col-xs-12 padding-0">
                        <button class="fadeIn full">
                            {{$route.path}}
                        </button>
                        <div class="spacer"/>
                        <thread v-bind:data="children" />
                    </div>
                    <div class="col-xs-12 text-xs-center padding-0">
                        <template v-if="!(children.length > 0)">
                            <div class="col-xs-12 padding-0 text-xs-center standard-pading-bottom">
                                <button class="full">Nothing to show</button>
                            </div>
                        </template>
                        <template v-if="moreLoading">
                            <button class="full">...</button>
                        </template>
                        <template v-else>
                            <button class="fadeIn full" v-on:click="loadMore">+</button>
                        </template>
                    </div>
                </template>
                <template v-else>
                    <load position="relative"/>
                </template>
            </div>
        </div>
    </div>
</template>
<style>
    .subreddit-wrap {
        margin:30px 0;
    }
    .standard-pading-bottom {
        margin-bottom:30px;
    }
</style>
<script>
    import topComp from '../../components/thread/comments/Top.vue';
    import ThreadComp from '../../components/thread/Thread.vue';
    import { getContentBySubreddit } from '../../methods';
    import loadComp from '../../components/shared/Load.vue';
    import LoginPanel from '../../components/login/LoginPanel.vue';
    import MessagePanel from '../../components/shared/MessagePanel.vue';
    export default{
        name: 'subreddit-comp',
        props:{
        },
        data:function(){

            let recent = this.$store.getters.getVisited;

            if(recent){
                if(recent.path == this.$route.path){
                    return {
                        after: recent.after,
                        before: recent.before,
                        children: recent.children,
                        moreLoading: false,
                        initLoading: false,
                        loadOnMount:false
                    }
                }
            }

            return {
                after: null,
                before: null,
                children: [],
                moreLoading: true,
                initLoading: true,
                loadOnMount:true
            }
        },
        mounted:function(){
            if(this.loadOnMount) {
                this.loadMore();
            }
        },
        methods:{
            loadMore:function(event){

                let self = this;
                self.moreLoading = true;

                getContentBySubreddit({
                    subreddit:self.$router.app._route.path,
                    after:self.after,
                    before:null
                }).then(function(data){
                    self.after = data.after;
                    self.before = data.before;
                    for(let e = 0;e < data.children.length;e++){
                        let child = data.children[e];
                        self.children.push(child);
                    }
                    self.moreLoading = false;
                    self.initLoading = false;
                }).catch(function(data){
                    self.moreLoading = false;
                    self.initLoading = false;
                });
            }
        },
        components:{
            'thread':ThreadComp,
            'load': loadComp,
            'login-panel':LoginPanel,
            'message-panel':MessagePanel
        },
        watch:{
            'children':function(val, oldVal){

                let self = this;

                this.$store.dispatch('FETCH_VISITED', {
                    children:val,
                    before:self.before,
                    after:self.after,
                    path:self.$route.path
                });
            }
        }
    }
</script>
