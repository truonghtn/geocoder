import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as moment from 'moment';

import ENV from './glob/env';
import { io, configureConnections } from './glob/conn';
import HC from './glob/hc';
import _ from './utils/_';

import SessionServ from './serv/sess';
import SocketIOServ from './serv/socketIO';

// Import routers
import EventRouter from './routes/events';
import RoomRouter from './routes/rooms';

class Program {
    public static async main() {
        ENV.configure();
        await configureConnections();

        SocketIOServ.init()

        const server = express();
        server.use(bodyParser.json());

        // create session object
        server.use(SessionServ());

        // CORS
        server.all('*', function (req, res, next) {
            res.header('Access-Control-Allow-Origin', "*");
            res.header('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, PUT, DELETE');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Max-Age', '86400');
            res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, ' +
                'Content-Type, Accept, Authentication, Authorization, sess');

            if (req.method.toUpperCase() == 'OPTIONS') {
                res.statusCode = 204;
                res.send();
                return;
            }

            next();
        });

        server.use('/events', EventRouter);
        server.use('/rooms', RoomRouter);

        // Start server
        server.listen(ENV.port, function () {
            console.log("Listen on port " + ENV.port + " ...");
        });

        return 0;
    }
}

Program.main();