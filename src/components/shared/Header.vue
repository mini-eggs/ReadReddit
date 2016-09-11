<template>
    <header>
        <nav class="navbar navbar-light">
            <div class="container">
                <div class="col-xs-12 padding-mobile-0">
                    <div class="col-xs-12 padding-mobile-0">

                        <ul class="nav navbar-nav">
                            <li class="nav-item">
                                <router-link to="/">Read Reddit</router-link>
                            </li>
                            <li class="nav-item hide-for-banner-small">
                                <router-link to="/about">About</router-link>
                            </li>
                        </ul>
                        <ul class="nav navbar-nav pull-xs-right hide-for-banner-large">
                            <li class="nav-item">
                                <router-link to="/about">About</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>
<style lang="stylus">
    nav {
        background-color:#ff4500;
        border-radius:0px!important;
    }
    nav a, nav a:active, nav a:visited, nav a:focus, nav a:hover {
        color:#fff!important;
    }
    .hide-for-banner-small {
        display:none;
    }
    .hide-for-banner-large {
        display:block;
    }
    @media(max-width:1350px){
        .hide-for-banner-small {
            display:block;
        }
        .hide-for-banner-large {
            display:none;
        }
    }
</style>
<script>
    export default{
        data:function(){
            return{
                login:null,
                loginTab:'Login'
            }
        },
        mounted:function(){
        },
        methods:{
        },
        watch:{
        }
    }
</script>
