<template>
    <div class="">
        <template v-for="(comment, index) in data">
            <template v-if="comment.data.body">
                <div v-on:click.prevent.stop="toggleView(index)" class="comment col-xs-12">
                    <div v-html=" '<b>' + comment.data.author + ':</b> ' + getHtml(comment.data.body_html)"></div>
                    <template v-if="comment.data.replies">
                        <recrusive-comp v-bind:data="comment.data.replies.data.children" />
                    </template>
                </div>
            </template>
        </template>
    </div>
</template>
<style lang="stylus">
    .comment-container {
        padding:8px 15px;
        border-radius: 0px;
        background:#fff;
        box-shadow: 0 1px 2px rgba(0,0,0,.1);
    }
    .comment{
        cursor:pointer;
        padding:8px 15px;
        margin:8px 0;
        border-radius: 0px;
        overflow:hidden;
    }
    .comment:hover{
        background-color:rgba(0, 0, 0, 0.05);
    }
    .comment-container:hover .comment:hover{
        background-color:rgba(0, 0, 0, 0.02);
    }
    .comment.col-xs-12 {
    }
    @media(max-width:748px){
        .comment{
            padding:4px 8px;
            margin:2px 0;
            border-radius: 8px;
        }
    }
</style>
<script>
    import { getDecodedHtml } from '../../../methods';
    export default{
        name:'recrusive-comp',
        props:{
            data:Array
        },
        data:function(){
            return{
            }
        },
        watch:{
        },
        components:{
        },
        methods:{
            'toggleView':function(val){
                if(this.data[val].hidden){
                    var data = JSON.parse(this.data[val].hidden);
                    this.data[val].data = data;
                    this.data[val].hidden = false;
                } else {
                    this.data[val].hidden = JSON.stringify(this.data[val].data);
                    this.data[val].data.body_html = 'Click to view';
                    this.data[val].data.replies = '';
                }
            },
            'getHtml':function(val){
                return getDecodedHtml(val);
            }
        }
    }
</script>
