import { readFileSync, ReadStream, writeFile, writeFileSync } from 'node:fs';

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


const data = ReadStream('./bigAss.txt', { highWaterMark: 16 });
data.on('data', (chunk) => {
    console.log(`Ho letto questo pezzo di file: ${chunk}`);
    writeFileSync('./output.txt', chunk, {flag: 'a'}); //append
});

