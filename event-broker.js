/*jshint node:true */
'use strict';

var Settings = require('darker-core').Settings;
var DarkerUtil = require('darker-core').DarkerUtil;
var Broker = require('darker-broker').Broker;


var settings = Settings.load('/', 'yml');
//var options = settings.broker;
var options = {
    name: 'notify-broker-' + process.pid,
    group: 'notify-broker',
    frontend: {
        type: 'pull',
        group: 'notify-bus-f',
        address: 'tcp://127.0.0.1:62830',
        options: {}
    },
    backend: {
        type: 'push',
        group: 'notify-bus-b',
        address: 'tcp://127.0.0.1:62831',
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
    console.log('notify broker is started.');
});