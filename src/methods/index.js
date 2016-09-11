
const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();

/**
 *
 * @param scriptSource
 */

const loadJs = function(scriptSource){
    if(typeof document != 'undefined' && typeof $ != 'undefined') {
        let exists = $('.owl-item.active').length > 0;
        if(!(exists)) {
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = scriptSource;
            head.appendChild(script);
        }
    }
};

export{loadJs}

/**
 *
 * @param Obj
 * @returns {Promise}
 */

const getContentBySubredditAbstraction = function (Obj){
    return new Promise(function(resolve, reject){

        let base = 'https://www.reddit.com';
        let current = Obj.subreddit;
        let count = '?count=25';
        let query = (Obj.after) ? '&after=' + Obj.after : '';
        let url = base + current + '/.json' + count + query;

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                let data = JSON.parse( this.response ).data;

                resolve({
                    after:data.after,
                    before: data.before,
                    children: data.children
                });
            } else if (this.readyState == 4 && this.status != 200) {
                reject(this);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    });
};

const getContentBySubreddit = function (Obj){
    return new Promise(function(resolve, reject){

        let children = [];

        getContentBySubredditAbstraction(Obj).then(function(data1){
            Obj.after = data1.after;
            Obj.before = data1.before;
            children.push.apply(children, data1.children);
            getContentBySubredditAbstraction(Obj).then(function(data2){
                Obj.after = data2.after;
                Obj.before = data2.before;
                children.push.apply(children, data2.children);
                resolve({
                    after:data2.after,
                    before: data2.before,
                    children: children
                });
            });
        });
    });
};
export{getContentBySubreddit}

/**
 *
 * @param Obj
 * @returns {Promise}
 */

const getCommentsByThread = function(Obj){
    return new Promise(function(resolve, reject){

        let base = 'https://www.reddit.com';
        let current = Obj.thread;
        let count = '?count=25';
        let url = base + current + '.json';

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                let data = JSON.parse( this.response );
                resolve(data);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    });
};
export{getCommentsByThread}

/**
 *
 * @param Obj
 * @returns {Promise}
 */

const getSubredditBySearch = function(Obj){
    return new Promise(function(resolve, reject){

        let base = 'https://www.reddit.com/subreddits/search/.json?q=';
        let current = Obj.search;
        let url = base + current;

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse( this.response );
                resolve(data);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    });
};
export{getSubredditBySearch}

const getDecodedHtml = function(htmlWithEntities){
    return entities.decode(htmlWithEntities);
};
export{getDecodedHtml}