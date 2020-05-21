const express = require('express');
const helmet = require('helmet');

const ItemsRouter = require('./routers/items-router');

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    res.status(200).json({ api: "Up"})
})

server.use('/api/items', ItemsRouter);

module.exports = server;