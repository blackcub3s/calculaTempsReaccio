

var elements = document.getElementsByTagName("td");
let nreCaselles = elements.length;
var indexAleatori = -1;
var ultimNombreAleatoriGenerat = -1;
var trMinim = Number.MAX_SAFE_INTEGER;
var trMax = 0;
var clics = 0;
var sumaTemps = 0;
var arrayTempsReaccio = [];
var arrayTempsNoRepresentatsEnHistorama = []; //s'usa en fitxer scriptHistograma

//PRE: DOS valors numerics
//POST: el valor més petit dels dos retornat
function minim2(a,b) {
    if (a > b) 
        return b;
    return a; 
}

//PRE: DOS valors numerics
//POST: el valor més gran dels dos retornat
function maxim2(a,b) {
    if (a > b) 
        return a;
    return b; 
}



//PRE: quan clico una td -cel·la de la taula- entra per variable global l'index de la mateixa (indexAleatori, generat en el main)
//POST: em genera un nou nombre aleatori, que referencia la td clicada -l'única visible per ara-, l'amaga,
//      va a obtenir un altre nombre aleatori i mostra el td que és referenciat per aquest altre nombre aleatori.
////FUNCIONAMENT: En essència és el que denominem com a EVENT LISTENER
function casellaClicada() {
    if (clics != 0) {
        
        //calculo diferencia temporal entre clic previ (o càrrega de programa) i clic actual.
        var t_previ = t;
        t = performance.now();
        tReacc = t - t_previ;
        
        //A cada clicada calculo la mitjana de temps de reaccio, el valor mínim, màxim i guardo els valors en array
        trMinim = minim2(tReacc, trMinim);
        trMax = maxim2(tReacc, trMax);
        sumaTemps += tReacc;
        mitjana = sumaTemps / clics;
        arrayTempsReaccio.push(Math.round((tReacc)*10)/10); //guardem un sol decimal del temps de reaccio
        //console.log(arrayTempsReaccio);

        //poso el temps de reacció en relació a l'anterior clic amb respecte a clic actual i poso la mitjana aritmètica actual i el minim
        document.getElementById("difClicsConsecutius").innerHTML = "t("+clics+"): " + Math.round((tReacc)*10)/10 + " ms";
        document.getElementById("estadistiques").innerHTML = "<i>[min = "+Math.round(trMinim)+" ms | &mu; = " + Math.round(mitjana) + " ms | max = "+Math.round(trMax)+" ms]</i>";

        clics += 1;
    } else { //cas en que fem el primer clic, que és quan realment començem a contar el temps de reacció a l'usuari (no des de la càrrega de la pàgina)
        t = performance.now();
        clics += 1;
    }

    //amago casella antiga i mostro la nova (escollida aleatòriament, excloient L'ANTERIOR CASELLA MOSTRADA -ALEATORI SENSE REPOSICIO DE L'ULTIMA CASELLA-)
    ultimNombreAleatoriGenerat = indexAleatori;
    elements[indexAleatori].style.visibility = "hidden"; //podia posar indexCasella en comptes de indexAleatori de fet, i passar per parametre indexCasella en l'event listener de casellaClicada
    indexAleatori = aleatoriSenseResposicio(ultimNombreAleatoriGenerat);
    elements[indexAleatori].style.visibility = "visible";
}

//PRE: nombre que no vols que surti com a nombre aleatori (dins de l'interval [0,elements.length])
//POST: nombre aleatori entre [0,elements.length] diferent al nombre ultimNombre.
//FINALITAT: Evitar que surtin dos blocs a clicar en el mateix lloc, confonent a l'usuari de manera que sembla que el clic sobre
//la casella no s'ha efectuat.
function aleatoriSenseResposicio(ultimNombreAleatoriGenerat) {
    do {
        indexAleatori = Math.floor(Math.random() * elements.length);
    } while (indexAleatori == ultimNombreAleatoriGenerat);
    return indexAleatori;
    
}

function main() {
    //VALOR ALEATORI ENTRE INTERVAL TANCAT [0, elements.length - 1]
    indexAleatori = Math.floor(Math.random() * elements.length);
    for (let i = 0; i < nreCaselles; i++) {
        if (indexAleatori != i) {
            elements[i].style.visibility = "hidden";
        } 
    }
}


main();