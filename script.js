/**
 * Fetches a stream from the given URL and processes it.
 * This function uses the Fetch API to get a readable stream
 * we get the stream reader and use the .getReader() method to read the stream.
 * It is a ReadableStreamDefaultReader object that allows us to read the stream chunk by chunk.
 * It exposes a .read() method that returns a promise and if it resolves, it returns an object with two properties:
 * - done: a boolean indicating if the stream is finished
 * - value: a Uint8Array containing the chunk of data read from the stream
 * The function reads the stream until done is true.
 * 
 * @param {url} string
 * @returns {Promise<void>} 
 */

const utf8Decoder = new TextDecoder("utf-8");

async function fetchStream(url){
    let charsReceived = 0;
    const response = await fetch(url);
    console.log(response);
    const reader = response.body.getReader();

    reader.read().then(function processText({ done, value }){
        /**
         * The result is an object with two properties:
         * - done: a boolean indicating if the stream is finished
         * - value: a Uint8Array containing the chunk of data read from the stream
         */
        if (done) {
            console.log('Stream completo');
            return;
        }

        charsReceived += value.length;
        const chunk = value;
        console.log(`Received ${charsReceived} characters so far. Current chunk = ${utf8Decoder.decode(chunk, {stream: true})}`);
        //return reader.read().then(processText);
    });
}

fetchStream('http://localhost:3010/stream');

document.getElementById('output').innerHTML = result;