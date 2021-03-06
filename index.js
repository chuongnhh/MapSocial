

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('emitlatlng', function (msg) {
        //socket.broadcast.emit('emit_message', msg);
        console.log(msg['id'] + '\nlat: ' + msg['lat'] + ', lng: ' + msg['lng'] + '\n' + msg['address']);
        io.emit('onlatlng', msg);
    });
});

http.listen(process.env.PORT || 8080, function () {
    console.log('listening on *:8080')
})
