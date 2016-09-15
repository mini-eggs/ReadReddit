<template>
    <div>
        <div class="card fadeIn animated">
            <a v-bind:href="thread.data.url" target="_blank">
                <template v-if="checkIfDataIsAnImg(thread.data.url)">
                    <img v-lazy="thread.data.url" />
                </template>
                <template v-else>
                    <img class="webicon" v-lazy="webIcon" />
                </template>
            </a>
            <router-link v-bind:to="thread.data.permalink">
                <div class="text">
                    <h3>{{thread.data.title}}</h3>
                </div>
            </router-link>
            <div class="voting">
                <div class="col-xs-6 padding-0">
                    <button class="full" v-on:click="vote(thread, 1)">
                        <img src="http://i.imgur.com/CvCo5t3.png" />
                    </button>
                </div>
                <div class="col-xs-6 padding-0">
                    <button class="full" v-on:click="vote(thread, -1)">
                        <img src="http://i.imgur.com/MgmiEgV.png" />
                    </button>
                </div>
                <div style="clear: both;"></div>
            </div>
        </div>
    </div>
</template>
<style lang="stylus">
    img.webicon{
        padding:100px;
        margin:-50px 0;
    }
    .voting button img {
        width:40%;
    }
    .card img {
        border-radius: 0px;
        border-width:0px;
    }
    .card {
        border-width:0px;
        padding:16px;
        border-radius: 0px;
        background:#fff;
        box-shadow: 0 1px 2px rgba(0,0,0,.1);
        margin-bottom:30px;
    }
    .card:hover{
        background-color:rgba(255, 255, 255, 0.5);
    }
    .card .text {
        padding:16px 8px 0;
    }
</style>
<script>
    export default{
        props:{
            data: Object
        },
        data:function(){
            return{
                thread: this.data,
                webIcon:'http://i.imgur.com/L4qNO4y.png'
            }
        },
        methods:{
            checkIfDataIsAnImg:function(data){
                return (
                        (
                                (data.indexOf('.jpeg') > -1) ||
                                (data.indexOf('.jpg') > -1) ||
                                (data.indexOf('.gif') > -1) ||
                                (data.indexOf('.png') > -1)
                        ) && (!(data.indexOf('.gifv') > -1))
                );
                /**
                 * Todo: check if imgur link without .ext
                 */
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
                        content: content.data.id,
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
            }
        }
    }
</script>
