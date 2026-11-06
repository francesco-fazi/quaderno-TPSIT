// TODO scrivi lo script

const aInput = document.getElementById("a");
const bInput = document.getElementById("b");
const cInput = document.getElementById("c");
const btn_calcola = document.getElementById("btn-calcola");

let liSoluzione1 = document.getElementById("soluzione1");
let liSoluzione2 = document.getElementById("soluzione2");

function discriminante(a, b, c){
    return b**2 - (4 * a * c);
}
function radicePositiva(a, b, delta){
    return (-b + Math.sqrt(delta)) / (2 * a);
}
function radiceNegativa(a, b, delta){
    return (-b - Math.sqrt(delta)) / (2 * a);
}

function calcolaRadici(a, b, c){
    let risultati = {x1: 0, x2: 0, err: false};

    // console.log(a, b, c);

    delta = discriminante(a, b, c); 

    if (delta < 0){
        risultati.err = true;
    } else if (delta == 0){
        risultati.x1 = radicePositiva(a, b, delta);
        risultati.x2 = risultati.x1;
    }
    else{
        risultati.x1 = radicePositiva(a, b, delta);
        risultati.x2 = radiceNegativa(a, b, delta);
    }

    return risultati
}

function validateInputs(){
    let a = aInput.value;
    let b = bInput.value;
    let c = cInput.value;

    // converti valori vuoti in 0
    if (a === '') {aInput.value = 0; a = 0;}
    if (b === '') {bInput.value = 0; b = 0;}
    if (c === '') {cInput.value = 0; c = 0;}

    if (isNaN(parseFloat(a))) return false;
    if (isNaN(parseFloat(b))) return false;
    if (isNaN(parseFloat(c))) return false;

    console.log("all good");
    return true
}

function calcola(){
    const validInputs = validateInputs();

    if (!validInputs) {
        console.log("aaa");
        liSoluzione1.textContent = "Errore. Input non validi";
        return;
    }

    const a = parseFloat(aInput.value);
    const b = parseFloat(bInput.value);
    const c = parseFloat(cInput.value);

    // console.log(aInput, bInput, cInput);
    // console.log(a, b, c);

    let risultati = calcolaRadici(a, b, c);
    
    if (risultati.err){
        liSoluzione1.textContent = "ERRORE: Delta negativo";
    } else {
        liSoluzione1.textContent = risultati.x1;
        if (risultati.x1 != risultati.x2) {
            liSoluzione2.textContent = risultati.x2;
        }
    }
}

btn_calcola.addEventListener("click", calcola);