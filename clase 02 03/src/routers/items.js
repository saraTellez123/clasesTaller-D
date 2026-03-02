const fs = require("fs")
const path = require ("path")


const DATA_PATH = path.join(__dirname, "..", "data", "items.json")

function readData(){
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf8"))
}

function writeData(data){
    fs.writeFileSync(DATA_PATH, JSON.stringify(data,null,2))
}

function handleItemsRoutes(req, res){
    if(!req.url.startsWith("/api/items")) return false
    
    res.setHeader("Content-Type", "application/json")

    //GET/API/items

    if(req.method === "GET" && req.url === "/api/items"){
        res.end(JSON.stringify(readData()))
        return true
    }
    //GET /API/items/id
    if (req.method ==="GET" && req.url.startsWith("/api/items/")){
        const id = parseInt(req.url.split("/").pop())

        const item = readData().find(i =>i.id === id)
        res.end(JSON.stringify(item || {error: "No se encontro"}))
        return true 
    }
    //POST/api/items
    //PUT/api/items/:id
    //DELETE/api/items/:id

}

module.exports = handleItemsRoutes