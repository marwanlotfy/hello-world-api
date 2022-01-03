const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const EventEmitter = require('events')
const eventEmitter = new EventEmitter();

const app = express();

app.use(morgan());
app.use(cors());

app.get('/api/v1/hello-world', (req,res) => {

    const { name } = req.query;

    const message =  `hello ${name??'world'}`;

    eventEmitter.emit('msg', message);

    return res.json({
        message,
    });

});

app.get('/api/v1/sse',(req , res ) => {
    res.header('Content-Type',"text/event-stream");
    res.header('Cache-Control',"no-cache");
    res.header('Connection',"keep-alive");

    eventEmitter.on('msg', message => res.write(`data: ${message} sent\n\n`) );
});

app.use((req , res) => {
    return res.status(404).json({
        message: 'resource not found'
    });
})

app.listen(process.env.APP_PORT,() => {
    console.log(`app is running on http://localhost:${process.env.APP_PORT}`);
});
