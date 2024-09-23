const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const eventRouter = require('./routes/events.routes');
const corsMiddleware = require('./midleware/cors.midleware');

const PORT = config.get('serverPort');
const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use('/api/event', eventRouter);

function startServer() {
    try{
        mongoose.connect(config.get('dbUrl'));

        app.listen(PORT, () => {
            console.log(`Server listening on ${PORT}`);
        });
    }catch(e){
        console.log(e);
    }
}
startServer();