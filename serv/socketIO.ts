import { io } from '../glob/conn';
import * as IO from 'socket.io';

export class SocketIOServ {
    static init() {
        io.on('connection', (client) => {
            console.log(`Client connected: ${client.id}`);

            client.on('disconnect', () => {
                console.log(`Client disconnected: ${client.id}`);
            })
        })

    }
}

declare namespace SocketIO {
    interface Server {
        socket(clientId: string): SocketIO.Socket;
    }

    export interface Socket {}
}

export default SocketIOServ;