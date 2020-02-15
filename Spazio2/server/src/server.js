const express = require("express");
var cors = require('cors')
// const http = require("http");
// const socketIo = require("socket.io");


// const server = http.createServer(express());
// const io = socketIo(server);
// io.use(cors());

// //Setting up a socket with the namespace "connection" for new sockets
// io.on("connection", socket => {
//   console.log("New client connected");

//   //Here we listen on a new namespace called "incoming data"
//   socket.on("incoming data", (data)=>{
//       //Here we broadcast it out to all other sockets EXCLUDING the socket which sent us the data
//      socket.broadcast.emit("outgoing data", {num: data});
//   });

//   //A special namespace "disconnect" for when a client disconnects
//   socket.on("disconnect", () => console.log("Client disconnected"));
// });

class App {
  constructor() {
    this.express = express();
//    this.isDev = process.env.NODE_ENV !== "production";

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(cors({
      origin: '*'
    }));
  }

  routes() {
    this.express.use(require("./routes"));
  }
}

module.exports = new App().express;
