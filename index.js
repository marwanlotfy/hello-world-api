const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan());
app.use(cors());

app.get('/api/v1/hello-world', (req,res) => {

    const { name } = req.query;

    const message = name ? `hello ${name}` : 'hello world';

    return res.json({
        message,
    });

});

app.use((req , res) => {
    return res.status(404).json({
        message: 'resource not found'
    });
})

app.listen(process.env.APP_PORT,() => {
    console.log(`app is running on http://localhost:${process.env.APP_PORT}`);
});
