import http from 'http';
import websocket from 'websocket'
const httpServer = http.createServer();
httpServer.listen(9090, () => console.log("Listening.. on 9090"))

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

        //I have received a message from the client


    })

    //generate clientId
    const clientId = guid();
})

function generateRoomId(length = 6) {
  return Math.random().toString(36).substr(2, length).toUpperCase();
}