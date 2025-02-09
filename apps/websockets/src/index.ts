import express from "express";
import { WebSocketServer,WebSocket } from "ws";
const app = express()
const httpServer = app.listen(8080)

try {
    const wss = new WebSocketServer({server:httpServer})
    wss.on("connection",function connection(ws){
        ws.on("error",(err)=>console.log(err))
        ws.on("message",function message(data,isBinary){
            wss.clients.forEach((client) => {
                if(client.readyState == WebSocket.OPEN && client != ws) {
                client.send(data,{binary:isBinary})
            }
        });
    })
    })
}
catch(err) {
    console.log("some error occured while intilizing the websocket connection : ",err)
}