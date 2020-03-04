const messageApi = require('./api/message-api');
const readline = require('readline');
const uniqid = require('uniqid');

const displayedMessages = {};

const terminal = readline.createInterface({
    input: process.stdin,
})

terminal.on('line', text => {
    const username = process.env.NAME || 'Client';

    const id = uniqid();
    displayedMessages[id] = true;

    const message = { id, text, username };
    messageApi.sendMessage(message)
})

const displayMessage = (message) => {
    console.log(`> ${message.username}: ${message.text}`);
    displayedMessages[message.id] = true;
};

const getAndDisplayMessages = async () => {
    try {
        const messages = await messageApi.getMessage();
        messages.forEach((message) => {
            const messageAlreadyDisplayed = message.id in displayedMessages;
            if (!messageAlreadyDisplayed) displayMessage(message);
         });
    } catch (error) {
        console.log(error)
    }
    
};

const streamMessages = () => {
    const messagingSocket = messageApi.createMessagingSocket();

    messagingSocket.on('message', (data) => {
        const message = JSON.parse(data);
        const messageAlreadyDisplayed = message.id in displayedMessages;
        if (!messageAlreadyDisplayed) displayMessage(message)
    })
};




getAndDisplayMessages();
streamMessages();