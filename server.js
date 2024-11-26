import http from 'http'; //funzione integrata di node.js per gestire le REST API e quindi richieste dei client
// c'é un problema, se dobbiamo rispondere con un file e quindi usare il core module fs, come faccio? io non ho i metodi __dirname, __filename dato che in es6 non sono disponibili, quindi devo crearli io
import url from 'url';
import path from 'path';
import fs from 'fs/promises'//importo quello con le promises in modo da poter usare async/await

const port = 8000;
const __filename = url.fileURLToPath(import.meta.url); // converto il percorso in un percoso assoluto valido
console.log(import.meta); //questo import.meta contiene le informazioni relative al modulo in esecuzione ed e una funzione di javascript
const __dirname = path.dirname(__filename);

console.log(__filename + " " + __dirname);

const server = http.createServer(async (req, res) => {
    //res.write("ciao");
    //res.setHeader('Content-Type', 'text-html'); //setHeader é un metodo che mi permette di modificare la tipologia di dati che viene inviata dal server, in questo caso codice html
    //res.statusCode = 404; //modifico lo stato della richiesta

    // res.writeHead(201, { //write head racchiude statusCode e setheader
    //     "Content-Type": "application/json", //ci sono anche molte altre proprieta legate all'header
    // })
    // res.end(JSON.stringify({message: "Chico"})); //posso usare direttamente .end per scrivere a schermo

    //console.log(req.url); //qui ce una falla che express.js gestisce in automatico, se vado all'indirizzo http://localhost:3000/about il codice verra eseguito lo stesso, cosa che pero con express non accade dato che viene eseguito del codice quando viene eseguito un metodo specifico(post, get) a uno specifico indirizzo e non a tutti
    //console.log(req.method);

    // Proviamo a fare come express.js quindi per ogni indirizzo ci sara una funzione diversa
    try {
        let filepath;
        if (req.url === "/" && req.method === "POST") {
            res.writeHead(201, {
                "Content-Type": "application/json",
            })
            res.end(JSON.stringify({ message: "POST REQUEST" })); // uso stringify perche voglio convertire un oggetto javascript in un json
        } else if (req.url === "/" && req.method === "GET") {
            filepath = path.join(__dirname, 'index.html'); //path ha il metodo join che mi permette di costruire un path di un file
            const data = await fs.readFile(filepath);
            res.writeHead(201, {
                "Content-Type": "text-html",
            })
            res.write(data);
            res.end();
        } else {
            res.writeHead(404, {
                "Content-Type": "text-html",
            });
            res.end("<h1>Page Not Fount <b>404</b></h1>")
        }
    } catch (e) {
        console.error(e)
    }
})


server.listen(port, () => { //il server non appena entra in ascolto della porta 3000 esegue la funzione
    console.log(`Server running on port: ${port}`)
})



// NB: ho scaricato nodemon ma ho usato npm i -D nodemon, il -D mi permette di salvarlo come una devDependency quindi non necessaria al funzionamento del programma e facoltativo
// Nel package.json negli scripts ci sono 2 script standard: test e start, questi due per essere runnati basta scrivere npm start/test invece per script con nome diverso dovro scrivere npm run "nome"