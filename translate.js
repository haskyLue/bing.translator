var https = require('https'),
	http = require('http'),
	querystring = require('querystring'),
	fs = require("fs"),
	client = {},
	credentials = {},
	regx = /<string [a-zA-Z0-9=":/.]+>(.*)<\/string>/,
	token_path = '/usr/local/lib/bing.translator/token',
	useproxy = 1;


client.setCredentials = function(creds) {
	client.credentials = creds;
}
client.isTokenFresh = function(nowtime, req_time, expires_in) {
	// console.log(arguments)
	return (nowtime - req_time) / 1000 > expires_in ? false : true;
}

client.translate = function(text, from, to, callback) {
	client.getToken(client.credentials, function(err, token) {
		var req = http.request({
			host: useproxy ? '127.0.0.1' : 'api.microsofttranslator.com',
			path: useproxy ? ('http://api.microsofttranslator.com' + '/V2/Http.svc/Translate?text=' + encodeURIComponent(text) + '&from=' + from + '&to=' + to) : ('/V2/Http.svc/Translate?text=' + encodeURIComponent(text) + '&from=' + from + '&to=' + to),
			port: useproxy ? '8087' : '80',
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + token.access_token,
				'host': 'api.microsofttranslator.com'
			}
		});
		req.on('response', function(response) {
			var data = '';
			response.on('data', function(chunk) {
				data += chunk;
			});
			response.on('end', function(err) {
//				console.log(data);
				callback(err, {
					original_text: text,
					translated_text: regx.exec(data)[1],
					from_language: from,
					to_language: to
				});
			});
		});
		req.on('error', function(e) {
			callback(new Error(e.message), null);
		});
		req.end();
	});
}

client.getToken = function(credentials, callback) {
	function get_from_web() {
		var post_data = querystring.stringify({
			'grant_type': 'client_credentials',
			'scope': 'http://api.microsofttranslator.com',
			'client_id': credentials.client_id,
			'client_secret': credentials.client_secret
		});
		var req = https.request({
			host: 'datamarket.accesscontrol.windows.net',
			port: 443,
			path: '/v2/OAuth2-13/',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': post_data.length
			},
		}, function(res) {
			res.setEncoding('utf8');
			res.on('data', function(response) {
				response = JSON.parse(response);
				callback(null, response);
				response.req_time = new Date().getTime();
				//写入配置文件
				fs.writeFile(token_path, JSON.stringify(response), {
					encoding: "utf8"
				}, function(err) {
					if (err) {
						console.log(err);
					}
					console.log('token 已更新');
				});
			});
		});
		req.on('error', function(e) {
			callback(new Error(e.message), null);
			return;
		});
		req.write(post_data);
		req.end();
	}

	fs.readFile(token_path, function(err, data) {
		if (err) {
			console.log(err);
			get_from_web();
			return;
		}
		var data = data && JSON.parse(data);
		if (data && client.isTokenFresh(new Date().getTime(), data.req_time * 1, data.expires_in * 1)) {
			callback(null, data); //读取配置文件
		} else {
			get_from_web(); //从web更新token
		}
	});
}
exports.init = function(creds) {
	client.credentials = creds;
	return client;
}
