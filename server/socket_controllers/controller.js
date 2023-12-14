

const socketController = (socket) => {
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
}

module.exports = {socketController};