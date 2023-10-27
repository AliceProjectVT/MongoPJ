import express from "express";
import { engine } from "express-handlebars";
import * as path from "path"
import __dirname from "./utils.js";
import { Server } from "socket.io";
import router from "./router/index.js";
import conectDB from "./config/config.js"
import cookieParser from "cookie-parser";
import passport from "passport";


conectDB()
const app = express()

const PORT = 4000 // Define PORT here

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor Arriba Puerto ${PORT}`)
})
const io = new Server(httpServer);


app.use(passport.initialize())

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(router)
//HB
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

//static

app.use("/", express.static(__dirname + "/public"))




//chat

const message = []

io.on('connection', socket => {
    console.log(`User ${socket.id} Connection`)
    let userName = ""
    //Anuncio de conección
    socket.on('userConnection', (data) => {
        userName = data.user
        message.push({
            id: socket.id,
            info: 'connection',
            name: data.user,
            message: `${data.user} se ha conectado al chat`,
            date: new Date().toTimeString(),
        })
        io.sockets.emit('userConnection', message)
    })
    //msg enviado
    socket.on('userMessage', (data) => {

        message.push({
            id: socket.id,
            info: 'message',
            name: userName,
            message: data.message,
            date: new Date().toTimeString()
        })
        io.sockets.emit('userMessage', message)

    })


    //Escribiendo....
    socket.on('typing', data => {
        socket.broadcast.emit('typing', data);

    })

})

