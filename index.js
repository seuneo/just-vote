import http from 'http';
import websocket from 'websocket'
import express from 'express'
const app = express();
app.get("/", (req,res)=> res.sendFile(__dirname, "/index.html"))
app.listen(9091, () => console.log("Listening.. on 9091"))
const httpServer = http.createServer();
httpServer.listen(9090, () => console.log("Listening.. on 9090"))

//hashmap clients
const clients = {}

const websocketServer = websocket.server;
const wsServer = new websocketServer({
    "httpServer": httpServer
})

wsServer.on("request", request => {
    //connect
    const connection = request.accept(null, request.origin)
    connection.on("open", ()=> console.log("opened!"))
    connection.on("close", ()=> console.log("closed!"))
    connection.on("message", message => {
        const result = JSON.parse(message.utf8Data)
        //I have received a message from the client
        console.log(result)


    })

    //generate clientId
    const clientId = guid();
    clients[clientId] = {
        "connection": connection
    }

    const payLoad = {
        "method": "connect",
        "clientId": clientId
    }

    connection.send(JSON.stringify(payLoad))

})

function generateRoomId(length = 6) {
  return Math.random().toString(36).substr(2, length).toUpperCase();
}