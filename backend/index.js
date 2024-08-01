// server.js

const express = require("express");
const http = require("http");
const axios = require("axios");
const { Server } = require("socket.io");
const cors = require("cors");
const contactRoutes = require("./routes/contactRoutes");
const messageRoutes = require("./routes/messagesRoute");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/auth', userRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/messages', messageRoutes);

const server = http.createServer(app);

const connectDb = require("./db");
connectDb();

// app.get('/', async(req, res) => {
//     const users = await Users.find();
//     return res.json(users);
// })

const io = new Server(server, {
    cors: {
        origin: "*",
        credentials: true,
    },
});
// Handle WebSocket connections here
io.on("connection", (socket) => {
    console.log("A new user has connected", socket.id);

    // Listen for incoming messages from clients
    socket.on("message", async(message) => {
        // Broadcast the message to all connected clients
        io.emit("message", message);
        // console.log("message", message);

        // try {
        //     const response = await axios.get('https://api.api-ninjas.com/v1/quotes?category=happiness', {
        //         headers: {
        //             "X-Api-Key": "48M30RsuOhkttYEBBNs61Q==uaYjZIWHaGKut1ui"
        //         }
        //     });
        //     // const quote = response.data;
        //     console.log('RESPONSE', response.data);

        //     // Send the quote back to the client
        //     // io.emit('chat message', `"${quote.content}" — ${quote.author}`);
        // } catch (error) {
        //     console.error('Error fetching quote:', error);
        //     io.emit('chat message', 'Error fetching quote. Please try again.');
        // }
    });



    // Handle disconnections
    socket.on("disconnect", () => {
        console.log(socket.id, " disconnected");
    });
});

server.listen(5300, () => {
    console.log("Server is running on port 5300");
});