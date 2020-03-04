const axios = require('axios');
const WebSockets = require('ws');


const createMessagingSocket = () => {
    return new WebSockets('ws://localhost:3001/messages');
}

const getMessages = () => {
    return axios.get('http://localhost:3001/messages');
}

const sendMessages = () => {
    return axios.post('http://localhost:3001/messages');
}

module.exports.createMessagingSocket = createMessagingSocket;
module.exports.getMessages = getMessages;
module.exports.sendMessages = sendMessages;