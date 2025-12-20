import pgk from "yt-dlp-wrap";
import { createWriteStream, WriteStream } from "fs";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const YTDlpWrap = pgk.default;
const binaryPath = join('/', 'usr', 'bin', 'yt-dlp');
const ytdlp = new YTDlpWrap(binaryPath);

async function downloadAudio() {
  try {
    // Prima ottieni le info sul video
    //const videoInfo = await ytdlp.getVideoInfo('https://www.youtube.com/watch?v=aqz-KE-bpKQ');
    //console.log('Formati disponibili:', videoInfo.formats);
    //createWriteStream('videoInfo.json').write(JSON.stringify(videoInfo.fo, null, 2));
    
    // Scarica con formato più compatibile
    let readableStream = ytdlp.execStream([
        'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
        '-f', 
        'bestaudio[ext=m4a]',  // Formato 140 è solitamente M4A audio (128k)
        '--js-runtimes', 'node',
        // Oppure prova: '251' (webm audio), '250' (webm audio low)
    ]);

    readableStream.pipe(createWriteStream('test.m4a'));

    readableStream.on('error', (err) => {
        console.error('Errore:', err);
    });

    readableStream.on('close', () => {
        console.log('Download completato!');
    });

    readableStream.on('progress', (progress) => {
        console.log('Progresso:', progress);
    });
    
  } catch (error) {
    console.error('Errore:', error);
  }
}

downloadAudio();