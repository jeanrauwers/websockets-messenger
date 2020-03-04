const axios = require('axios');
const WebSockets = require('ws');


const createMessagingSocket = () => {
    return new WebSockets('ws://localhost:3001/messages');
}

const getMessage = () => {
    return axios.get('http://localhost:3001/messages');
}

const sendMessage = () => {
    return axios.post('http://localhost:3001/messages');
}

module.exports.createMessagingSocket = createMessagingSocket;
module.exports.getMessage = getMessage;
module.exports.sendMessage = sendMessage;