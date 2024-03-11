const express = require("express");
const app = express();
const http = require("http").createServer(app);


const PORT = process.env.port || 3000

http.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
});
app.use(express.static(__dirname + "/client"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
});


const io = require("socket.io")(http)
io.on("connection", (socket) => {
    console.log("connected........");
    
    socket.on("mess", (obj) => {
        socket.broadcast.emit("mess",obj);
    })
})
