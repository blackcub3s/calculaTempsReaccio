

var elements = document.getElementsByTagName("td");
let nreCaselles = elements.length;
var indexAleatori = -1;
var trMinim = Number.MAX_SAFE_INTEGER;
var trMax = 0;
var clics = 0;
var sumaTemps = 0;

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
        
        //calculo la mitjana de temps de reaccio i el valor mínim i màxim a cada clicada
        trMinim = minim2(tReacc, trMinim);
        trMax = maxim2(tReacc, trMax);
        sumaTemps += tReacc;
        mitjana = sumaTemps / clics;

        //poso el temps de reacció en relació a l'anterior clic amb respecte a clic actual i poso la mitjana aritmètica actual i el minim
        document.getElementById("difClicsConsecutius").innerHTML = "t("+clics+"): " + Math.round((tReacc)*10)/10 + " ms";
        document.getElementById("estadistiques").innerHTML = "<i>[min = "+Math.round(trMinim)+" ms | &mu; = " + Math.round(mitjana) + " ms | max = "+Math.round(trMax)+" ms]</i>";

        clics += 1;
    } else { //cas en que fem el primer clic, que és quan realment començem a contar el temps de reacció a l'usuari (no des de la càrrega de la pàgina)
        t = performance.now();
        clics += 1;
    }

    //amago casella antiga i mostro la nova (escollida aleatòriament)
    elements[indexAleatori].style.visibility = "hidden"; //podia posar indexCasella en comptes de indexAleatori de fet, i passar per parametre indexCasella en l'event listener de casellaClicada
    indexAleatori = Math.floor(Math.random() * elements.length);
    elements[indexAleatori].style.visibility = "visible";
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