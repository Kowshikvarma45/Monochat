import express, { json } from "express";
import { WebSocketServer,WebSocket } from "ws";
const app = express()
const httpServer = app.listen(8080)
import { db } from "@repo/db/db";

try {
    const wss = new WebSocketServer({server:httpServer})
    wss.on("connection",function connection(ws){
        ws.on("error",(err)=>console.log(err))
        ws.on("message",function message(data,isBinary){
            console.log(data.toLocaleString())
            const obj = JSON.parse(data.toLocaleString())
            const roomid = obj.roomid;
            console.log(roomid)
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