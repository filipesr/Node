const server = require('./server')

//Port from environment variable or default - 3333
const port = process.env.PORT || 3333;

server.listen(port, () => console.log(`Listening on port ${port}`))