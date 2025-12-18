import { readFileSync, createReadStream, writeFileSync } from 'node:fs';

/**
 * File creato per smanettare un po con il modulo fs e le streams in Node.js
 * Notiamo bene che readFileSync non va mai usato per file di grosse dimensioni in un server,
 * In quanto e bloccante e anche se usiamo la versione asincrona, carica tutto il file in memoria RAM prima di poterlo processare.
 * Per file di grosse dimensioni si usano le streams, che caricano il file a pezzi (chunks) e li processano uno alla volta.
 */

for (let i=0; i<100000; i++) {
    writeFileSync(`./bigAss.txt`, `Questo é il contenuto del file numero ${i}\n`, {flag: 'a'}); //append
}

const fileContent = readFileSync('./bigAss.txt', 'utf-8');
writeFileSync('./copyOfBigAss.txt', fileContent);


/**
 * createReadStream restituisce un oggetto del tipo readStream
 * Presenta diversi event Emitters come 'data', 'end', 'error', ecc.
 * Qui sotto ascoltiamo l'evento 'data' che viene emesso ogni volta che un chunk di dati é pronto per essere processato.
 * Il secondo argomento highWaterMark specifica la dimensione del chunk in byte (default 64kb)
 * l'event data e utile per manipolare i dati, ma se non ho bisogno di manipolarli posso usare anche il 
 * metodo pipe() per collegare direttamente la readStream ad una writeStream.
 */

const data = createReadStream('./bigAss.txt', { highWaterMark: 16 });
data.on('open', () => {
    console.log('Stream aperto con successo');
});
data.on('data', (chunk) => {
    console.log(chunk);
});



