import { Innertube } from 'youtubei.js';
const yt = await Innertube.create();

    // 2. Chiedi i dati del video (usa l'ID, non l'URL intero per sicurezza)
const info = await yt.getBasicInfo('aqz-KE-bpKQ');

console.log(info)