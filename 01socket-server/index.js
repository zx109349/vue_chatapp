var app = require('http').createServer(handler)
var io = require('socket.io')(app);//获取socket.io对象
var fs = require('fs');

app.listen(80);


//处理web服务器正常的请求
function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

//实时通讯的连接
//io.on('connection'，事件的回调函数)，监听socketio的连接事件
io.on('connection', function (socket) {
    //socket.emit()，发送给客户端数据（一个news事件）
  socket.emit('news', { hello: 'world' });
   //监听客户端发送过来的内容
  socket.on('my other event', function (data) {
    console.log(data);
  });
});  