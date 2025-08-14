import http from 'http';
import websocket from 'websocket'

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

function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}
 
// then to call it, plus stitch in '4' in the third group
const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
