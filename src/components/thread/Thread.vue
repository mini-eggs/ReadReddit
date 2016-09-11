<template>
    <div>
        <div class="col-xs-12 hidden-sm-up padding-0">
            <template v-for="(thread, index) in all">
                <split v-bind:data="thread" />
            </template>
        </div>
        <div class="col-xs-6 hidden-xs-down padding-left-0">
            <template v-for="(thread, index) in all">
                <template v-if="(index + 2) % 2 == 0 ">
                    <split v-bind:data="thread" />
                </template>
            </template>
        </div>
        <div class="col-xs-6 hidden-xs-down padding-right-0">
            <template v-for="(thread, index) in all">
                <template v-if="(index + 2) % 2 != 0 ">
                    <split v-bind:data="thread" />
                </template>
            </template>
        </div>
    </div>
</template>
<style>
</style>
<script>
    import ThreadSplitComp from "./ThreadSplit.vue";
    export default{
        props:{
            data:Array
        },
        data:function(){

            return{
                all:this.data
            }
        },
        components:{
            'split':ThreadSplitComp
        },
        methods:{
        },
        mounted:function(){
        },
        watch:{
        }
    }
</script>
