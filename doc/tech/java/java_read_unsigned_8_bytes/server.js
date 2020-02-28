// Run "node server.js"
// http://127.0.0.1:8888/ to download file
// Put download to match dir
var http = require('http');

var server = http.createServer(function (request, response) {

    // 发送响应数据 "Hello World"
    //response.end('Hello World\n');

    // Send data
    // [246, 254, 255, 0, 10, 126, 127, 128, 129, 253, 254, 255, 0, 1, 232]

    var sampleBytes = new Uint8Array(15);
    sampleBytes[0] = -10;
    sampleBytes[1] = -2;
    sampleBytes[2] = -1;
    sampleBytes[3] = 0;
    sampleBytes[4] = 10;
    sampleBytes[5] = 126;
    sampleBytes[6] = 127;
    sampleBytes[7] = 128;
    sampleBytes[8] = 129;
    sampleBytes[9] = 253;
    sampleBytes[10] = 254;
    sampleBytes[11] = 255;
    sampleBytes[12] = 256;
    sampleBytes[13] = 257;
    sampleBytes[14] = 1000;

    console.log(sampleBytes);

    var buffer = new Buffer(sampleBytes);

    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    // response.writeHead(200, { 'Content-Type': 'application/octet-stream' });

    response.writeHead(200,{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Method':'GET,POST','Content-Type':'application/octet-stream'});

    response.write(buffer);

    // 结束响应，告诉客户端所有消息已经发送。当所有要返回的内容发送完毕时，该函数必须被调用一次。如何不调用该函数，客户端将永远处于等待状态。
    response.end();

});

server.listen(8888,"localhost",function(){
    console.log("开始监听...");
});

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');