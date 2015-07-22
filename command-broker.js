/*jshint node:true */
'use strict';

var Settings = require('darker-core').Settings;
var DarkerUtil = require('darker-core').DarkerUtil;
var Broker = require('darker-broker').Broker;


var settings = Settings.load('/', 'yml');
//var options = settings.broker;
var options = {
    name: 'command-broker-' + process.pid,
    group: 'command-broker',
    frontend: {
        type: 'pull',
        group: 'command-bus-f',
        address: 'tcp://127.0.0.1:62810',
        options: {}
    },
    backend: {
        type: 'push',
        group: 'command-bus-b',
        address: 'tcp://127.0.0.1:62811',
        options: {}
    },
    hc: {
        enabled: true,
        address: 'tcp://127.0.0.1:62800'
    }
};
var broker = new Broker(options);
broker.start(function(err) {
    if(err) {
        throw err;
    }
    console.log('broker is started.');
});