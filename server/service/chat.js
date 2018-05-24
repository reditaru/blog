import socket from 'socket.io'
import xss from 'xss'
import randomName from 'chinese-random-name'

const startChatService = (server) => {
    const io = socket(server);
    let status = {
        onlineNums: 0
    }
    io.on('connection', (socket) => {
        status.onlineNums++;
        io.sockets.emit('online status', JSON.stringify(status));
        let name = randomName.generate();
        socket.emit('name', name);
        socket.on('msg', msg => {
            let message = JSON.parse(msg);
            if (message && Object.prototype.toString.call(message) === '[object Object]') {
                socket.emit('msg reply', message.date);
                Object.keys(message).forEach(key => {
                    message[key] = xss(message[key]);
                });
                socket.broadcast.emit('msg', JSON.stringify(message));
            }
        });
        socket.on('disconnect', () => {
            status.onlineNums--;
            io.sockets.emit('online status', JSON.stringify(status));
        });
    });
}

export default startChatService;