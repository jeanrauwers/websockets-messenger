const express = require('express');
const expressWs = require('express-ws')

const app = express();
expressWs(app);

const messages = [{ id: 0, text: 'Welcome to the messenger app', username: 'Chat Room' }];
const sockets = [];

app.use(express.json());


app.get('/messages', (req, res) => {
    res.json(messages)
})

app.post('/messages', (req, res) => {
    const message = req.body
    messages.push(message);

    sockets.forEach((socket) => {
        socket.send(JSON.stringify(message));
    })
})

app.ws('/messages', (socket) => {
    sockets.push(socket)

    socket.on('close', () => {
        sockets.splice(socket.indexOf(socket), 1);
    })
})

app.listen(3001, () => {
    console.log('Listening on port 3001!')
})