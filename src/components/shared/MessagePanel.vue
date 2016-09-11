<template>
    <div v-bind:class="{ 'not-logged-in': !(user) }">
        <div class="messager" v-if="message">
            <div class="spacer"/>
            <div class="fadeIn  default-background default-padding">
                <input class="darker margin-normal full" type="submit" v-bind:value="message" />
            </div>
        </div>
    </div>
</template>
<style lang="stylus">
    .messager {
        position: fixed;
        top: 233px;
        width: 340px;
    }
    .not-logged-in .messager {
        top:294px;
    }
    @media(max-width:1199px){
        .messager {
            width: 273.33px;
        }
    }
    @media(max-width:991px){
        .messager {
            width: 200px;
        }
    }
    @media(max-width:767px){
        .messager {
            width: 152px;
        }
    }
    @media(max-width:543px){
        .messager, .not-logged-in .messager {
            left: 0;
            width: 100%;
            z-index: 99;
            top: -30px;
        }
    }
</style>
<script>
    export default{
        data:function(){
            return{
                user: this.$store.getters.getLogin,
                message:null
            }
        },
        mounted:function(){
        },
        methods:{
        },
        watch:{
            '$store.getters.getMessageUser':function(val, oldVal){
                this.message = val.info.text;
                let self = this;
                let time = (val.info.time) ? val.info.time : 2000;
                setTimeout(function(){
                    self.message = null;
                }, time);
            },
            '$store.getters.getLogin':function(val, oldVal){
                this.user = val;
            }
        },
        components:{
        }
    }
</script>
