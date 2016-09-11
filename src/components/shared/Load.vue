<template>
    <div v-bind:class="{ 'loader': type == 'absolute', '': type == 'relative' }">
        <div class="spinner"></div>
    </div>
</template>
<style lang="stylus">
    .loader {
        position:fixed;
        top:50%;
        left:50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform:    translate(-50%, -50%);
        -ms-transform:     translate(-50%, -50%);
        -o-transform:      translate(-50%, -50%);
        transform:         translate(-50%, -50%);
    }
    .spinner {
        width: 40px;
        height: 40px;
        margin: 100px auto;
        background-color: #333;

        border-radius: 100%;
        -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;
        animation: sk-scaleout 1.0s infinite ease-in-out;
    }
    @-webkit-keyframes sk-scaleout {
        0% { -webkit-transform: scale(0) }
        100% {
            -webkit-transform: scale(1.0);
            opacity: 0;
        }
    }
    @keyframes sk-scaleout {
        0% {
            -webkit-transform: scale(0);
            transform: scale(0);
        } 100% {
              -webkit-transform: scale(1.0);
              transform: scale(1.0);
              opacity: 0;
          }
    }
</style>
<script>
    export default{
        name: 'load-comp',
        props:{
            position:String
        },
        data:function(){
            return{
                type: (this.position) ? this.position : 'absolute'
            }
        }
    }
</script>
