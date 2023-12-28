

var elements = document.getElementsByTagName("td");
let nreCaselles = elements.length;
var indexAleatori = -1;

var clics = 0;
var sumaTemps = 0;
//TIPUS: EVENT LISTENER
//PRE: quan clico una td -cel·la de la taula- entra per paràmetre l'índex de la mateixa.
//POST: em genera un nou nombre aleatori, que referencia la td clicada -l'única visible-, l'amaga l'actual,
//      va a obtenir un altre nombre aleatori i mostra el td que és referenciat per aquest.
function casellaClicada(indexCasella) {
    
    if (clics != 0) {
        

    
        //calculo diferencia temporal entre clic previ (o càrrega de programa) i clic actual.
        var t_previ = t;
        t = performance.now();
        tReacc = t - t_previ;
        
        //calculo la mitjana de temps de reaccio
        
        sumaTemps += tReacc;
        mitjana = sumaTemps / clics;

       
        
        //poso el temps de reacció en relació a l'anterior clic amb respecte a clic actual i poso la mitjana aritmètica actual
        document.getElementById("difClicsConsecutius").innerHTML = "t("+clics+"): " + Math.round((tReacc)*10)/10 + " ms";
        document.getElementById("mitjana").innerHTML = "[ <i>&mu;: " + Math.round(mitjana) + " ms </i>]";

        clics += 1;
    } else {
        t = performance.now();
        clics += 1;
    }

    //amago casella antiga i mostro la nova (escollida aleatòriament)
    elements[indexCasella].style.visibility = "hidden"; //podia posar indexAleatori en comptes de indexCasella de fet, perquè indexAleatori està com a variable global
    indexAleatori = Math.floor(Math.random() * elements.length);
    elements[indexAleatori].style.visibility = "visible";

}




function main() {
    //get a random number between 0 and elements.length - 1
    indexAleatori = Math.floor(Math.random() * elements.length);
    for (let i = 0; i < nreCaselles; i++) {
        if (indexAleatori != i) {
            elements[i].style.visibility = "hidden";
        } 
    }
}


main();