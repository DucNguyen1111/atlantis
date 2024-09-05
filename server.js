var http = require('http');
var spawn = require('child_process').spawn;
var crypto = require('crypto');
var url = require('url');

var secret = 'baz'; // secret key of the webhook
var port = 8080; // port

http.createServer(function (req, res) {

    console.log("request received");
    res.writeHead(400, { "Content-Type": "application/json" });

    var path = url.parse(req.url).pathname;

    // if (path != '/push' || req.method != 'POST') {
    //     var data = JSON.stringify({ "error": "invalid request" });
    //     return res.end(data);
    // }


    var jsonString = '';
    req.on('data', function (data) {
        console.log('data', data)
        console.log('data1', JSON.parse(data.toString()))
        jsonString += data;
        console.log('json', jsonString)
    });

    req.on('end', function () {
        var hash = "sha1=" + crypto.createHmac('sha1', secret).update(jsonString).digest('hex');
        console.log('hash', hash, req.headers['x-hub-signature'])
        if (hash != req.headers['x-hub-signature']) {
            console.log('invalid key');
            var data = JSON.stringify({ "error": "invalid key", key: hash });
            return res.end(data);
        }

        console.log("running hook.sh");

        var deploySh = spawn('sh', ['hook.sh']);
        deploySh.stdout.on('data', function (data) {
            var buff = new Buffer(data);
            console.log(buff.toString('utf-8'));
        });


        res.writeHead(400, { "Content-Type": "application/json" });

        var data = JSON.stringify({ "success": true });
        return res.end(data);

    });


}).listen(port);

console.log("Server listening at " + port);