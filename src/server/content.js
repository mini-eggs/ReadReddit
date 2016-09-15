
function content () {

    'use strict';

    const encryptionKey = require("../creds/encryption.js");

    const rereddit = require('rereddit');

    const aesjs = require('aes-js');

    const encrypt = function(text){
        var key = aesjs.util.convertStringToBytes(encryptionKey);
        var textBytes = aesjs.util.convertStringToBytes(text);
        var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        return aesCtr.encrypt(textBytes);
    };

    const snoowrap = require('snoowrap');

    content.prototype.sessionDestroy = function(success, failure, device, connection, session){
        connection.query('UPDATE reddit_users SET users_loggedin = ? WHERE users_device = ?', [false, device], function(err, results) {
            success(null);
        });
    };

    content.prototype.tokenLog = function(success, failure, data, connection){
        connection.query('UPDATE reddit_users SET users_token = ? WHERE users_device = ? ORDER BY users_time DESC LIMIT 1', [data.token, data.device], function(err, results) {
            if(err){
                success({data: 'error with token', status:false});
            }else {
                success({data: 'token entered', status:true});
            }
        });
    };

    content.prototype.sessionUsers = function(success, failure, device, connection, session){
        connection.query('SELECT * FROM `reddit_users` WHERE `users_device` = "' + device + '" ORDER BY users_time DESC ', function (error, results, fields) {
            if(error){success();}else {
                if (results[0]) {
                    if (results[0].users_loggedin == 1) {
                        success({
                            u: results[0].users_username,
                            p: results[0].users_password
                        });
                    } else {
                        success();
                    }
                } else {
                    success();
                }
            }
        });
    };

    content.prototype.login = function(success, failure, username, password, device, connection, session){
        // rereddit.login(username, password).end(function(err, user) {
            var user={message:'Broken library'};
            var returnUser = function(){
                connection.query('SELECT users_token as token FROM `reddit_users` WHERE `users_device` = "' + device + '" AND `users_username` = "' + username + '" ', function (error, results, fields) {
                    success({
                        data: user,
                        token:results[0].token,
                        device:device,
                        username: username,
                        password: encrypt(password)
                    });
                });
            };
            // if(err){success(err);} else {
                connection.query('SELECT * FROM `reddit_users` WHERE `users_device` = "' + device + '" AND `users_username` = "' + username + '" ', function (error, results, fields) {
                    if(results.length == 0) {
                        var user = {
                            users_username: username,
                            users_password: JSON.stringify(encrypt(password)),
                            users_device: device,
                            users_loggedin: true
                        };
                        connection.query('INSERT INTO reddit_users SET ?', user, function (err, result) {
                            if (err) {success(err);} else {
                                returnUser();
                            }
                        });
                    } else {
                        connection.query('UPDATE reddit_users SET users_loggedin = ? WHERE users_device = ? AND users_username = ?', [true, device, username], function(err, results) {
                            returnUser();
                        });
                    }
                });
            // }
        // });
    };

    content.prototype.upvote = function(success, failure, token, content, score, connection){

        var r = new snoowrap({
            userAgent: 'web:es.evanjon.reddit.ReadReddit:v1.0.0 (by /u/minieggs)',
            clientId: 'Cd9I1cNvacR6Vw',
            clientSecret: 'Ebfk9_czTSy9kQS_xLsPXNh_n9k',
            refreshToken: token
        });

        if(score == '1') {
            r.getSubmission(content).upvote().then(function(){
                success({
                    status:true,
                    data:content + ' has been upvoted'
                });
            }).catch(function(err){
                success({
                    status:false,
                    data:err
                });
            });
        } else if(score == '-1') {
            r.getSubmission(content).downvote().then(function(){
                success({
                    status:true,
                    data:content + ' has been downvoted'
                });
            }).catch(function(err){
                success({
                    status:false,
                    data:err
                });
            });
        }
    }
}

exports = module.exports = content;