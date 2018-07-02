/*jslint node: true */
"use strict";

var express = require('express');
var request = require('request');
var router = express.Router();

module.exports = function (server, config) {

    router.get('/convertor', function (req, res) {
        var url = config.fixerUrl;
        var options = {
            url: url
        };

        request.get(options, function (error, response, body) {
            res.end(body);
        });
    });


    server.use(router);

};
