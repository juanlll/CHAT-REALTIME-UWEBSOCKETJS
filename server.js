const uWS = require('uWebSockets.js');
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');

const ACTIONS_ENUM = {
    REFRESH_USERS_TO_CLIENTS: 'REFRESH_USERS_TO_CLIENTS',
    ADD_USER: 'ADD_USER',
    LEAVE_USER: 'LEAVE_USER',
    ADD_MESSAGE: 'ADD_MESSAGE',
    REFRESH_MESSAGES_TO_CLIENTS: 'REFRESH_MESSAGES_TO_CLIENTS',
}

const ROOMS_OF_CHAT = {
    GENERAL: '/CHAT/GENERAL',
}

let users = [];
let messages = [];

const CHAT = {
    addUser: (ws, user) => {
        //definiendo el uuid en la conexión websocket
        ws.uuid = user.uuid;
        //agrego el usuario al array de objectos
        users = [...users, user];
        //notificar a todos los clientes conectados que hay un usuario nuevo!
        ws.publish(ROOMS_OF_CHAT.GENERAL, JSON.stringify({
            action: ACTIONS_ENUM.REFRESH_USERS_TO_CLIENTS,
            data: {
                users: users
            }
        }));

        ws.publish(ROOMS_OF_CHAT.GENERAL, JSON.stringify({
            action: ACTIONS_ENUM.REFRESH_MESSAGES_TO_CLIENTS,
            data: {
                messages: messages
            }
        }));
    },
    addMessage: (ws, message) => {
        if (message) {
            //agrego el usuario al array de objectos
            messages = [...messages, message];
            //notificar a todos los clientes conectados que hay un mensaje nuevo!
            ws.publish(ROOMS_OF_CHAT.GENERAL, JSON.stringify({
                action: ACTIONS_ENUM.REFRESH_MESSAGES_TO_CLIENTS,
                data: {
                    messages: messages
                }
            }));
        }
    },
    closeUser: (app, ws) => {
        if (ws.uuid) {
            users = users.filter((u) => u.uuid !== ws.uuid);
            //notifico a los clientes que hay un nuevo mensaje
            app.publish(ROOMS_OF_CHAT.GENERAL, JSON.stringify({
                action: ACTIONS_ENUM.REFRESH_USERS_TO_CLIENTS,
                data: {
                    users: users
                }
            }));
        }
    }
};

const app = uWS.App({
    key_file_name: 'misc/key.pem',
    cert_file_name: 'misc/cert.pem',
    passphrase: '123456789'
}).ws('/*', {
    open: (ws, req) => {
        // el codigo a ejecutar se hará cuando algun cliente se conecte con el servidor
        ws.subscribe(ROOMS_OF_CHAT.GENERAL);
    },
    message: (ws, message, isBinary) => {
        let json = JSON.parse(decoder.write(Buffer.from(message)));

        switch (json.action) {
            case ACTIONS_ENUM.ADD_USER: // action de agregar un usuario 
                if (json.data.user) {
                    CHAT.addUser(ws, json.data.user);
                }
                break;
            case ACTIONS_ENUM.ADD_MESSAGE: // action de agregar un mensaje
                if (json.data.message) {
                    CHAT.addMessage(ws, json.data.message);
                }
                break;
            default:
                break;
        }
    },
    close: (ws, code, message) => {
        CHAT.closeUser(app, ws);
    }
});


app.listen(5000, (listenSocket) => {
    if (listenSocket) {
        console.log("Escuchando mensajes en el puerto 5000");
    }
})