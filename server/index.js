const express = require('express')
const { Server } = require('socket.io')
const http = require('http')
const cors = require('cors')

const app = express()

const server = http.createServer(app);

app.get('/healthy', (req, res) => {
    return res.json({'message':'success'})
})

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

io.on("connection", (socket) => {
    console.log('user connected: ' + socket.id);

    socket.on('join_room', (data) => {
        socket.join(data);
    })

    socket.on('leave_room', (data) => {
        socket.leave(data)
    })

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message', data.message);
    })

    socket.on('message_everyone', (data) => {
        socket.broadcast.emit('receive_message', data);
    })

    socket.on('disconnect', (socket) => {
        console.log('user disconnected: ' + socket.id);
    })
})



server.listen(3001, () => {
    console.log('Server listening port:3001')
})