<template>
    <div class="col-xs-12 padding-0">
        <div class="spacer"/>
        <div class="col-xs-12 col-sm-4">
            <login-panel/>
        </div>
    </div>
</template>
<style lang="stylus">
</style>
<script>
    import LoginPanel from './LoginPanel.vue';
    export default{
        data:function(){
            return{
            };
        },
        components:{
            'login-panel':LoginPanel
        }
    }
</script>
