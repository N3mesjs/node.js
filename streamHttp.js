import express from 'express';
import { createReadStream } from 'node:fs';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/stream', (req, res) => {
    const readStr = createReadStream('./bigAss.txt');
    readStr.on('error', (err) => {
        res.status(500).send('Errore nella lettura del file');
        console.log("file non trovato")
    })
    readStr.pipe(res);
})

const server = app.listen(3010, () => {
  console.log('Server is running on http://localhost:3010');
});

server.on('error', (err) => {
  console.error('Server error:', err);
});