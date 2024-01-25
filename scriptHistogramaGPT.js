
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

//PRE: arrIntervals --> son els intervals en que volem trocejar l'histograma (separats per interval constant).
//     arrTR --> es una array de longitud variable, amb tants elements com temps de reaccio mesurats i te els temps de reaccio desordenats.
//     arrayTempsNoRepresentatsEnHistorama --> passa coma variable global, buida.
//POST: retorna una array "dades" que conte classificats els temps de reacció en els intervals generats per a l'histograma, que n'hi hauran tants com arrIntervals.length;
//      arrayTempsNoRepresentatsEnHistorama es veurà emplenada dels temps que no es representen en histograma.
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
    var afegit; //variable que mostra si hem afegit un temps de reaccio a l'histograma o no
    for (let i = 0; i < arrTR.length; ++i) {
        afegit = false;
        for (let j = 0; j < arrIntervals.length; ++j) {
            ls = arrIntervals[j];
            li = arrIntervals[j] - incrementHistograma;
            if (arrTR[i] >= li && arrTR[i] < ls) {   // --- > [li,ls) <----
                dades[j] += 1; //incrementem una unitat en l'slot de dades correlatiu (j-èssim) a on cau l'i-èssim valor d'arrTR.
                afegit = true;
                break; //esquema de cerca, no volem arribar fins a final d'arrIntervals quan el trobem, sino que continuem classificatn valors arrTR
            }
        }
        //si no l'hem afegit a l'histograma perquè no tenim espai a l'esquerra i a la dreta volem registrar aquetsos temps també i informar a l'usuari
        if (!afegit) {
            arrayTempsNoRepresentatsEnHistorama.push(arrTR[i]);
        }
    }
    //console.log(arrayTempsNoRepresentatsEnHistorama);
    return dades;
}


function main_fesHistograma() {
    
    if (!histogramaGenerat) {
        document.getElementById("histogram-container").style.visibility = 'visible';
        document.getElementsByTagName("hr")[0].style.visibility = 'visible';

        histogramaGenerat = true;

        /*TODO --> [300 - 325), [325 - 350), [350 - 375), [375 - 400), [400 - 425), [425 - 450), [450 - 475), 
        [475 - 500), [500 - 525), [525 - 550), [550 - 575), [575 - 600), [600 - 625), [625 - 650), [650 - 675), [675 - 700) ms*/
        //el primer interval va de 300 a 325, segon de 325 a 350..

        const iniciHistograma = 340;    //inici real sera "incrementHistograma" per sota del valor iniciHistograma: "[incrementHistograma - iniciHistograma"
        const finalHistograma = 700;    //final real es aquest, amb interval obert "finalHistograma)" o bé proper si els increments no cauen just a final histograma "finalHistograma + increment"
        const incrementHistograma = 30; //increments d'histograma, de valor "incrementHistograma"
        
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

            /*AFEGEIXO ELS VALORS DE LIMITS SUPERIORS DINS DE CADA BAR O BARRA*/
            const barEtiquetaX_ls = document.createElement("div");
            barEtiquetaX_ls.className = "etiqueta-Eix-X-ls";
            barEtiquetaX_ls.textContent = arrIntervals[index];

            /*AFEGEIXO EL SEPARADOR ENTRE ELS LIMITS SUPERIORS I INFERIORS*/
            const separador = document.createElement("div");
            separador.className = "etiqueta-Eix-X-li";
            separador.textContent = arrIntervals[index] - incrementHistograma;

            /*AFEGEIXO ELS VALORS DE LIMITS INFERIORS DINS DE CADA BAR O BARRA*/
            const barEtiquetaX_li = document.createElement("div");
            barEtiquetaX_li.className = "separador";
            barEtiquetaX_li.textContent = "<>";
           

           
            barContainer.appendChild(barEtiquetaX_ls);
            barContainer.appendChild(barEtiquetaX_li);    
            barContainer.appendChild(separador);
            
            /*FI AFEGIMENT VALORS X*/
            barContainer.appendChild(bar);
            barContainer.appendChild(barLabel);
            histogramContainer.appendChild(barContainer);
        });

    document.getElementById("remanentsHistograma").innerHTML = "TRs fora dels límits de representació de l'histograma: "+arrayTempsNoRepresentatsEnHistorama.length;
    
    } else {
        alert("No pots generar dos histogrames. Has de refrescar la pàgina i tornar a començar!");
    }
  }
