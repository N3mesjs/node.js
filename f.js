var createCounter = function(n) {
    let count = n;
    return function() {
        return ++count; //post incremento ritorna la variabile dopo che é stata incrementata
     // return count++; // ritorna la variabile e poi la incrementa
    };
};

const counter = createCounter(10);
console.log(counter());
console.log(counter());


let x = 3;
const y = ++x;

console.log(`x:${x}, y:${y}`);