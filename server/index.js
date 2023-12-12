const express = require('express')
const { Server } = require('socket.io')
const http = require('http')
const cors = require('cors')

const app = express()

const server = http.createServer(app);

app.get('/api', (req, res) => {
    return res.json({'message':'success'})
})

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

io.on("connection", (socket) => {
    console.log('user connected: ' + socket.id);

    socket.on('send_message', (data) => {
        socket.emit('receive_message', data);
    })

    socket.on('disconnect', (socket) => {
        console.log('user disconnected: ' + socket.id);
    })
})



server.listen(3000, () => {
    console.log('Server listening port:3000')
})