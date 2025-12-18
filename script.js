async function fetchStream() {
    const response = await fetch('http://localhost:3010/stream');
    const result = response.body.getReader();
    return result;
}

const result = fetchStream();
console.log(result);

document.getElementById('output').innerHTML = result;