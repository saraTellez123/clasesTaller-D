const http = require ("http")//petciones 
const fs = require("fs")//fyle sistem para el sistema de archivos
const path = require("path") //a donde dirigirme lol
const handleItemsRoutes = require("./routers/items")

const PORT = 3000 //el puerto
const PUBLIC_PATCH = path.join(__filename, "..", "public")//conectar al backend con el fornent, simulando lol

const server= http.createServer((req,res)=>{ //crear servidor 
    //RUTAS API :V
    if(handleItemsRoutes(req,res)) return;

    //ARCHIVOS ESTATICOS

    let filePath = req.url==="/"  ?"index.html" :req.url
    const extname = path.extname(filePath)
    const mimeTypes ={
        ".html" : "text/html",
        ".css" : "text/css",
        ".js" : "text/javascript",
        ".json" : "application/json",
        ".png": "image/png"
    }

    const fullPath = path.join(PUBLIC_PATCH, filePath)

    let contentType = mimeTypes[extname] || "text/plain"

    fs.readFile(fullPath, (err, cont)=>{
        if(err){
            if(err.code==="ENOENT"){
                res.writeHead(404)
                res.end("404 Not Found")
            }else{
                res.writeHead(500)
                res.end("Error del servidor: ", err.code)
            }
        }else{
            res.writeHead(200,{"Content-Type": contentType})
            res.end(cont)
        }
    })
})

server.listen(PORT,()=>{
    console.log(`Servidor Corriendo en http://localhost:${PORT}`)
})