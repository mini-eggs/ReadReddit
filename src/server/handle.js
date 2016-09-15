
var content = require('./content.js');

var MySQLCredentials = require("../creds/mysql.js");

function API (url, urlStructure, extraData) {

    return new Promise(function(resolve, reject){

        var Content = new content();

        var conn = new MySQL();

        var sess = url.session;

        switch(urlStructure[1]) {
            case"login":
                Content.login(resolve, reject, $_REQUEST("username", url), $_REQUEST("password", url), $_REQUEST("device", url), conn, sess);
                break;
            case"upvote":
                Content.upvote(resolve, reject, $_REQUEST("token", url), $_REQUEST("content", url), $_REQUEST("score", url), conn);
                break;
            case"sessionUsers":
                Content.sessionUsers(resolve, reject, $_REQUEST("device", url), conn, sess);
                break;
            case"sessionDestroy":
                Content.sessionDestroy(resolve, reject, $_REQUEST("device", url), conn, sess);
                break;
            case"tokenLog":
                Content.tokenLog(resolve, reject, extraData, conn);
                break;
            default:
                resolve('no data');
                break;
        }
    })
}

exports = module.exports = API;

function $_REQUEST(name, url) {

    return url.query[name];

}

function MySQL () {

    var mysql      = require('mysql');

    var connection = mysql.createConnection(MySQLCredentials);

    connection.connect();

    return connection;
}