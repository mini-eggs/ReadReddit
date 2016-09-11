
import Vue from 'vue';

if(typeof document != 'undefined'){

    /**
     * These only work in the wild wild west (browser)
     */

    var VueHead = require('vue-head');

    Vue.use(VueHead);

    var VueLazyload = require('vue-lazyload');

    Vue.use(VueLazyload, {
        preLoad: 1.3,
        error: 'https://placeholdit.imgix.net/~text?txtsize=22&txt=error&w=100&h=75',
        loading: 'https://placeholdit.imgix.net/~text?txtsize=22&txt=loading&w=100&h=75',
        try: 3
    });

}

import Router from 'vue-router';

Vue.use(Router);

import { createPage } from '../views/home/CreateHome';

import { createSubreddit } from '../views/subreddit/CreateSubreddit';

import { createThread } from '../views/thread/CreateThread';

import AboutComp from '../components/About.vue';

import LoginComp from '../components/login/Login.vue';

var routes = [];

routes.push({path: '/', component: createPage({})});

routes.push({path: '/about', component: AboutComp});

routes.push({path: '/login', component: LoginComp});

routes.push({path: '/r/:string', component: createSubreddit({})});

routes.push({path: '/r/:string/comments/:string/:string', component: createThread({})});

export default new Router({
    mode: 'history',
    //scrollBehavior: () => ({ y: 0 }), //we don't want this for thread -> back button -> subreddit
    routes: routes
});