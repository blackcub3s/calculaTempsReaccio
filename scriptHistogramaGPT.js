
var histogramaGenerat = false;

function generaIntervals(inicial, final, increment) {
    var dades = [];
    var i = inicial;
    dades.push(inicial);
    while (i < final) {
        i += increment;
        dades.push(i);
    }
    return dades;
}

//PRE: arrIntervals son els intervals en que volem trocejar l'histograma (separats per interval constant).
//     arrTR --> es una array de longitud variable, amb tants elements com temps de reaccio mesurats i te els temps de reaccio desordenats.
//POST: retorna una array "dades" que conte classificats els temps de reacció en els intervals generats per a l'histograma, que n'hi hauran tants com arrIntervals.length;
//FUNCIONAMENT: *  Si 1r valor arrIntervals fos 325, per a aquest valor, generarem interval [300,325), 
//              on 300 sera el li (limit inferior) i 325 sera el ls (limit superior)). 
//              *  Si el 2n valor arrIntervals fos 350, per a aquest valor, generarem
//              l'interval [325, 350)
//              * I aixi fins a raribar al final de la llista. Si el final te valor k, aleshores tindriem [k-incrementHistograma,k]
//              
//
function afegeix_TR_a_arrayHistograma(arrIntervals, arrTR, incrementHistograma) {
    //inicialitzo una array per a l'histograma amb tot zeros
    var dades = Array(arrIntervals.length).fill(0); 
    var ls;
    var li;
    for (let i = 0; i < arrTR.length; ++i) {
        for (let j = 0; j < arrIntervals.length; ++j) {
            ls = arrIntervals[j];
            li = arrIntervals[j] - incrementHistograma;
            if (arrTR[i] >= li && arrTR[i] < ls) {   // --- > [li,ls) <----
                dades[j] += 1; //incrementem una unitat en l'slot de dades correlatiu (j-èssim) a on cau l'i-èssim valor d'arrTR.
                break; //esquema de cerca, no volem arribar fins a final d'arrIntervals quan el trobem, sino que continuem classificatn valors arrTR
            }
        }
    }
    return dades;
}


function main_fesHistograma() {
    
    if (!histogramaGenerat) {
        histogramaGenerat = true;

        /*TODO --> [300 - 325), [325 - 350), [350 - 375), [375 - 400), [400 - 425), [425 - 450), [450 - 475), 
        [475 - 500), [500 - 525), [525 - 550), [550 - 575), [575 - 600), [600 - 625), [625 - 650), [650 - 675), [675 - 700) ms*/
        //el primer interval va de 300 a 325, segon de 325 a 350..

        const iniciHistograma = 325;    //inici real sera 20 per sota d'aquest
        const finalHistograma = 700;    //final real es aquest, amb interval obert 700)
        const incrementHistograma = 25; //increments d'histograma, de 25 en 25.
        
        const arrIntervals = generaIntervals(iniciHistograma,finalHistograma,incrementHistograma); //ES AIXO --> [275, 300, 325, 350, 375, 400, 425, 450, 475, 500, 525, 550, 575, 600, 625, 650, 675, 700];
        var data = afegeix_TR_a_arrayHistograma(arrIntervals, arrayTempsReaccio, incrementHistograma); // arrTR te els temps de reaccio de l'usuari, d'aspecte  [324,323,322,325,699..], i es una variable global de scriptTaula.js, i ve d'allà automaticament.
        //const data = [0,0, 1, 4, 5, 6, 10, 12, 15, 13, 12, 9, 7, 9, 6, 5, 4, 2];
        
        //console.log("arrIntervals --> ", arrIntervals);
        //console.log("arrData --> ", data);

        const histogramContainer = document.getElementById("histogram-container");

        data.forEach((value, index) => {
        const barContainer = document.createElement("div");
        barContainer.className = "bar-container";
        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = value * .5 + "em"; // You can adjust the multiplier for height
        bar.style.width = .3+"em";
        const barLabel = document.createElement("div");
        barLabel.className = "bar-label";
        barLabel.textContent = value;

        /*AFEGEIXO ELS VALORS DE X DINS DE CADA BAR O BARRA*/
        const barEtiquetaX = document.createElement("div");
        barEtiquetaX.className = "etiqueta-Eix-X";
        barEtiquetaX.textContent = arrIntervals[index];// + "-"+intervals[index+1];
        

        barContainer.appendChild(barEtiquetaX); 
        /*FI AFEGIMENT VALORS X*/
        barContainer.appendChild(bar);
        barContainer.appendChild(barLabel);
        histogramContainer.appendChild(barContainer);
        
        
        });

    } else {
        alert("No pots generar dos histogrames. Has de refrescar la pàgina i tornar a començar!");
    }
  }
