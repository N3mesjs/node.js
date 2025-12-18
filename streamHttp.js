/**
 * streamHttp.js
 * 
 * This code creates an Express server that streams the contents of 'output.txt' file
 * to clients making a GET request to the '/stream' endpoint.
 * It uses the 'fs' module to create a readable stream from the file
 * and pipes that stream directly to the HTTP response.
 * N.B. if you don't have 'output.txt' file in the same directory as this script,
 * it is needed to create the stream manually creating a new ReadableStream object and use the start()
 * method to push data into the stream. https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream
 * for reference.
 */

import express from 'express';
import { createReadStream } from 'node:fs';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/stream', (req, res) => {
    const readStr = createReadStream('./output.txt');
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