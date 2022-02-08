import path from 'path';
import express from "express"
import http from "http";
import WebSocket, { WebSocketServer } from 'ws';

const __dirname = path.resolve();
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/src/views");
app.use("/public", express.static(__dirname + "/src/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));


const handleListen = () =>console.log(`Listening on http://localhost:3000/`);

const server = http.createServer(app);
const wss = new WebSocketServer({server});
const sockets =[];

wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = "Anon"
    console.log("to bw")
    socket.on("close", () => {
        console.log("dis from client")
    })
    socket.on("message", (message) => {
        const messageString = message.toString('utf8');
        const parsed = JSON.parse(messageString);
        if (parsed.type === "new_message"){
            sockets.forEach(aso => aso.send(`${socket.nickname}: ${parsed.payload}`));
        } 
        else if (parsed.type === "nickname"){
            socket["nickname"] = parsed.payload;
        }
        console.log(message.toString('utf8'));
    })
});

server.listen(3000, handleListen);
