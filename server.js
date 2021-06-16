const express = require('express')
const next = require('next')

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
    const app = express();
    const server = require('http').Server(app);
    const io = require('socket.io')(server);
    io.attach(server)

    app.all('*', (req, res) => handle(req, res))
    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`)
    })
})