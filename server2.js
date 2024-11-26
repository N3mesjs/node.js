import { createServer } from "http";

const port = 8000;

const users = [
    {id:1, name:"tony"},
    {id:2, name:"jane"}
]

const server = createServer((req, res) => {
    if(req.url === "/api/users" && req.method === "GET"){
        res.writeHead(200, {
            "content-type": "application/json"
        });
        res.end(JSON.stringify(users));
    } else {
        res.writeHead(404, {
            "content-type": "text/plain"
        });
        res.end("SEI NEGRO!")
    }
})

server.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})
