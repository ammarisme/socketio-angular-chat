var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users =  [];
var messages =[] ;
app.use(function (req, res, next) {        
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
    res.setHeader('Access-Control-Allow-Credentials', true);       
    next();  
});  


app.get('/', function(req, res){
    res.send("");
});

app.get("/messages" , function(req, res){
    res.send(messages)
})

app.get('/connectedusers', function(req, res){
    res.send(users);
});

io.on('connection',socket=> {
    
    socket.on('disconnect', function(){
        users = removeFunction(users , 'token', socket.client.id);
        console.log(users);
        io.emit('usersconnected', users);
        console.log('user disconnected');
    });
    
    socket.on('register',data => {
        console.log(socket.client.id);
        users.push({
            token : socket.client.id,
            name : data
        });

        io.emit('usersconnected', users);
    });

    socket.on('sendMessage', function(message){
        console.log(message.reciever);

        io.to(`${message.reciever}`).emit('messagerecieved',message);
        // io.sockets[message.reciever].emit(message);
        // io.emit('messagerecieved', message);

        // console.log(message.reciever)
        // console.log(io.sockets.connected[message.reciever]);//.emit(message);
        // io.socket.emit('messagerecieved', message);
    });

    socket.emit('token', socket.client.id);

});

function removeFunction (myObjects,prop,valu)
        {
             return myObjects.filter(function (val) {
              return val[prop] !== valu;
          });

        }

var server = http.listen(3000, function(){
  console.log('listening on *:3000');
});