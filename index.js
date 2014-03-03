var kidoAuthFlow = require('kido-authflow');
var request = require('request');

var options = {
    domain: '',
    user: '',
    password: '',
    app: ''
}

var serviceName = "";
var method = "";
var serviceOptions= {};

kidoAuthFlow(options, function(err, result) {

	if (err) {
		console.log('Auth fail!');
		return;
	};

    var kidozenToken = result.kidoToken;
    var ipToken = result.ipToken;

    var postOps = {
    	strictSSL: false,
    	uri: 'https://' + options.app + '.' + options.domain + '/api/services/' + serviceName + '/invoke/' + method,
    	method: 'post',
    	headers: {
			authorization: "WRAP access_token=\"" + kidozenToken + "\"",
			"x-kidozen-actas": "Bearer " + new Buffer(ipToken).toString('base64')
    	},
    	body: JSON.stringify(serviceOptions)
    }

    request(postOps, function(err, res, body) {
    	console.log(err);
    	console.log(res.statusCode);
    	console.log(body);
    })
});