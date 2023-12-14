const express = require('express')
const { Server } = require('socket.io')
const http = require('http')
const cors = require('cors')
const { socketController } = require('./socket_controllers/controller')

const app = express()

const server = http.createServer(app);

app.use(cors());

app.get('/healthy', (req, res) => {
    return res.json({'message':'success'})
})

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

io.use((socket, next) => {
    const authToken = socket.handshake.query.token;
    if (socket.handshake.query && authToken) {
        const isValid = authToken === 'random_token';
        if (!isValid) {
            return next(new Error('Authentication_Error1'))
        }
        return next();
    }
    next(new Error('Authentication_Error2'))
})

io.on("connection", (socket) => {
    socketController(socket)
})



server.listen(3001, () => {
    console.log('Server listening port:3001')
})