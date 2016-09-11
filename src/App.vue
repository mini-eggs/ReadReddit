<template>
  <div id="app">
    <header-comp/>
    <div class="container">
      <router-view></router-view>
    </div>
    <footer-comp/>
  </div>
</template>
<style lang="stylus">
  .spacer{
    height:0;
    width:100%;
    margin-top:30px;
  }
  .spacer-neg{
    height:0;
    width:100%;
    margin-top:-30px;
  }
  body{
    display:block;
    background-color:#f1f1f1;
  }
  .standard-margin {
    margin:30px 0;
  }
  img{
    width:100%;
  }
  .margin-0{
    margin:0;
  }
  .padding-0{
    padding:0;
  }
  a, a:active, a:visited, a:focus, a:hover{
    color:inherit!important;
    text-decoration: none!important;
  }
  * {
    -webkit-transition: all 0.2s ease;
    -moz-transition:    all 0.2s ease;
    -ms-transition:     all 0.2s ease;
    -o-transition:      all 0.2s ease;
    transition:         all 0.2s ease;
    font-size:20px!important;
    color:#000!important;
  }
  ::-webkit-input-placeholder {
    color: #000;
  }
  :-moz-placeholder { 
    color: #000;
  }
  ::-moz-placeholder { 
    color: #000;
  }
  :-ms-input-placeholder {
    color: #000;
  }
  .standard-margin-bottom {
    margin-bottom:30px;
  }
  nav {
    background: #fff;     box-shadow: 0 1px 2px rgba(0,0,0,.1);
  }
  input {
    background:#fff;
    box-shadow: 0 1px 2px rgba(0,0,0,.1);
    width:100%;
    border-width: 0px;
    border-radius: 0px;
    padding: 8px 48px 8px;
    /*box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);*/
    max-width:500px;
    text-align:center;
    outline: none!important;
    border-width:0px;
  }
  input.darker, button.darker{
    background-color:rgba(0, 0, 0, 0.02);
  }
  button, button:hover, button:active, button:focus, button:visited {
    background: #fff;
    box-shadow: 0 1px 2px rgba(0,0,0,.1);
    border-width:0px;
    border-radius:0px;
    padding:8px 48px 8px;
    outline: none!important;
  }
  button:hover, input:hover{
    background-color:rgba(255, 255, 255, 0.5);
  }
  button.darker:hover, input.darker:hover{
    background-color:rgba(0, 0, 0, 0.05);
  }
  .full {
    min-width:100%;
    width:100%;
    max-width:100%;
  }
  .default-background {
    background: #fff;     box-shadow: 0 1px 2px rgba(0,0,0,.1);
  }
  .default-padding {
    padding:8px 15px;
  }
  html {
    min-height:100.1vh;
  }
  .margin-normal{
    margin:5px 0;
  }
  .padding-right-0{
    padding-right:0;
  }
  .padding-left-0{
    padding-left:0;
  }
  @media(max-width:748px){
    .padding-mobile-0{
      padding:0;
    }
    .container{
      padding:0;
    }
    * {
      font-size:18px!important;
    }
    button, button:hover, button:active, button:focus, button:visited, input {
      padding:6px 48px 8px;
    }
  }
</style>
<script>
  import headerComp from './components/shared/Header.vue';
  import footerComp from './components/shared/Footer.vue';
  export default {
    data:function(){
      return {};
    },
    components:{
      'header-comp':headerComp,
      'footer-comp':footerComp
    }
  }
</script>