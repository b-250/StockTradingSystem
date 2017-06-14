"use strict";
var redis = require('redis');

let option = {
    port: 6379,
    host: "112.74.124.145",
    expireTime: 1,
};

let prefix = "sess:";        // default prefix in connect-redis
let client = redis.createClient(option.port, option.host);

client.on("error", function (err) {
    console.log("Redis Error: " + err)
});
exports.client = client;
