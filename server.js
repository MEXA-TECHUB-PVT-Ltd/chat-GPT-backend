const mongoose = require('mongoose');
const dotenv = require('dotenv');
const socket = require("socket.io");

dotenv.config({
    path: './config.env'
});

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION!!! shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

const app = require('./app');

 const database = process.env.DATABASE

// Connect the database
mongoose.connect(database, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology:true,
}).then(con => {
    console.log('=====>>DB connection Successfully!');
    // Start the server
    const port = process.env.PORT || 4000;
   const server= app.listen(port, () => {
        console.log(`
      ################################################
             Server listening on port: ${port}
      ################################################
    `);
    });
    const io = socket(server, {
        cors: {
          origin: "http://localhost:3000",
          credentials: true,
        },
      });
      
      global.onlineUsers = new Map();
      io.on("connection", (socket) => {
        global.chatSocket = socket;
        socket.on("add-user", (userId) => {
          onlineUsers.set(userId, socket.id);
        });
      
        socket.on("send-msg", (data) => {
          const sendUserSocket = onlineUsers.get(data.to);
          if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.msg);
          }
        });
      });

    process.on('unhandledRejection', err => {
        console.log('UNHANDLED REJECTION!!!  shutting down ..');
        console.log('====>',err);
        console.log(err.name, err.message);
        server.close(() => {
            process.exit(1);
        });
    });

});

