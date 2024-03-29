# Taula de continguts

1. [Finalitat](#1-finalitat)
2. [Implementació](#2-implementació)
   - [Fitxer scriptTaula.js](#21-fitxer-scripttaulajs)
      * [Funció main()](#211-funció-main)
      * [Funció casellaClicada()](#212-funció-casellaclicada)
   - [Fitxer scriptHistogramaGPT.js](#22-fitxer-scripthistogramagptjs)
      * [Funció generaIntervals()](#221-funció-generaintervals)
      * [Funció afegeix_TR_a_arrayHistograma()](#222-funció-afegeix_tr_a_arrayhistograma)
      * [Funció main_fesHistograma()](#223-funció-main_feshistograma)


# 1. Finalitat

Aquesta eina permet fer una aproximació del temps de reacció motor d'una persona computant la diferència entre múltiples clics consecutius entre les cel·les d'una taula que van apareixent i desapareixent de forma aleatòria. 

No és una eina perfectament fiable per donar una lectura acurada ja que existeixen diferents fonts de variabilitat en la mesura, com per exemple la velocitat de l'ordinador de la persona que té el client (navegador), el propi llenguatge javascript o, fins i tot, la senzilla lògica de programació emprada per evitar que surtin dues cel·les consecutives, com veurem. Tot i així, serveix com una bona aproximació per comparar individus sempre que facin servir el mateix dispositiu (sigui mòbil, tablet o ordinador).

El funcionament de l'aplicació és tal i com es mostra en el següent GIF:

![gif_de_mostra](/imatges/gifDemo_appCalculaTempsReaccio.gif)

# 2. Implementació

## 2.1 Fitxer scriptTaula.js

### 2.1.1 Funció main()

El que veu l'usuari res més carregar la pàgina és, principalment, una taula html (encara que no ho sembli). Per mostrar-la, res més carregar l'html, es crida la funció `main()` del fitxer [scriptTaula.js](/scriptTaula.js). Aquesta funció _amaga_ tots els elements `<td></td>` de la taula posant la propietat de CSS a `style: hidden` mitjançant javascript, a excepció d'un d'ells, que es deixa visible triant-lo de forma aleatòria mitjançant la funció `Math.random()`

https://github.com/blackcub3s/calculaTempsReaccio/blob/7305301a55ef9c60cbf85a20c41402643589a6ce/scriptTaula.js#L81-L92

Aquesta funció, igual que les demés funcions crida diverses variables globals diposades a l'inici del fitxer (així es troben disponibles mentre no es refresci la pàgina):

https://github.com/blackcub3s/calculaTempsReaccio/blob/7305301a55ef9c60cbf85a20c41402643589a6ce/scriptTaula.js#L3-L12

## 2.1.2 Funció casellaClicada()

Aquesta funció és invocada cada cop que cliquem damunt d'una de les cel·les visibles de la taula. Si la casella que s'ha clicat s'ha clicat per primer cop des de que hem carregat la pàgina, s'inicia un temporitzador amb `t = performance.now()` (cas en que la variable global clics val zero). En cas contrari, si la cel·la ja ha sigut premuda en anteriors ocasions (és a dir, que clics és superior a 0, exemplificat per la condició `clics != 0`) aleshores ja tenim una referència temporal iniciada per l'usuari i podem calcular un temps de reacció emmagatzemant el valor de t en una variable auxiliar `t_previ` tot fent `t_previ = t` i aplicant de nou la sentència `t = performance.now` per poder fer posteriorment la diferència `t - t_previ`. La funció, a més a més de computar el temps de reacció, també computa quin és el minim temps de reacció de l'usuari, el màxim, la mitjana aritmètica de tots els temps de reacció que es fan des de l'últim refresc de pantalla i passar a l'HTML les estadístiques mencionades perquè puguin ser vistes en temps real. A més a més, aquesta funció també va guardant cada temps de reacció en l'`arrayTempsReaccio` perquè després es pugui mostrar l'histograma quan ho demani l'usuari.

https://github.com/blackcub3s/calculaTempsReaccio/blob/7305301a55ef9c60cbf85a20c41402643589a6ce/scriptTaula.js#L32-L67

## 2.2 Fitxer scriptHistogramaGPT.js

Per fer l'histograma hi havia dues opcions. La primera era mirar alguna llibreria que ja l'implementés, però aquestes llibreries solen generar problemes per poder modificar l'histograma a diferents dispositius o al teu gust. La segona opció era fer des de zero l'histograma.

Per simplificar la tasca vaig demanar a xatGPT la següent prompt: "_I want to generate an histogram using pure CSS, html and javascript, with no external libraries of javascript. I want it from scratch. How do i do it?_". La resposta de xatGPT va ser el fitxer [GPT_1.html](/FITXERS_AUXILIARS/GPT_1.html), que permet introduir en un array el nombre de dades que volem a cada barra de l'histograma (en l'exemple de prova) mitjançant un array `const data = [4, 7, 2, 5, 10];`, quedant així:

![sortida fitxer gpt1](/FITXERS_AUXILIARS/GPT_1_output.png)

A partir d'aquest fitxer vaig anar fent modificacions fins acabar obtenint el fitxer [scriptHistogramaGPT.js](/scriptHistogramaGPT.js) que, sumat a l'arxiu CSS [histogramaGPT.css](/histogramaGPT.css), ens permet obtenir aquest histograma:

![sortida fitxer meu](/FITXERS_AUXILIARS/Output_histograma_meu_v2.PNG)

 Dins [scriptHistogramaGPT.js](/scriptHistogramaGPT.js) tenim una variable global booleana inicialitzada a fals (`var histogramaGenerat = false`) i tres funcions, que desgranarem a continuació en els seguents tres sub apartats (2.2.1, 2.2.2 i 2.2.3):


### 2.2.1 Funció generaIntervals()

Per tal de generar els límits superiors dels intervals de l'histograma (el límit inferior el calcularem dins la funció següent) donem una dada en milisegons `inicial`, una dada en milisegons `final` i un increment, que serà l'amplada de l'interval. Així podem generar un nombre d'intervals variables en funció del que ens convingui a nosaltres:

https://github.com/blackcub3s/calculaTempsReaccio/blob/916a2f5414de74815f1795d6bae7db8cf205e3a8/scriptHistogramaGPT.js#L4-L13

### 2.2.2 Funció afegeix_TR_a_arrayHistograma()

Aquesta funció el que fa és prendre l'array d'intervals i l'array de temps de reacció i retorna un array amb les dades necessaries per fer després l'histograma. Recorre un per un l'array de temps de reacció i a cada element de la mateixa l'assigna a un dels intervals de l'histograma. Noteu que per a un element `el` de l'array `dades` que retorna `generaIntervals()` en aquesta funció es genera un increment d'una unitat en una posició de l'array que després retorna. Aquesta última array, cada element, és el nombre d'ocurrències que hi ha per a un interval de l'histograma de tipus obert per l'esquerra i tancat per la dreta de la forma: `[el - increment, el)`:

https://github.com/blackcub3s/calculaTempsReaccio/blob/916a2f5414de74815f1795d6bae7db8cf205e3a8/scriptHistogramaGPT.js#L27-L51

### 2.2.3 Funció main_fesHistograma()

Aquesta funció mostra el contenidor de l'histograma i la línia horitzontal que el separa de l'àrea de joc a petició de l'usuari (quan aquest clica histograma). A més a més, carrega les dades que necessiten les dues funcions previes, les invoca i finalment genera l'histograma amb la variable `data`. El codi que hi ha dins del `for.Each` és el codi adaptat i força modificat de [GPT_1.html](/FITXERS_AUXILIARS/GPT_1.html) que no només genera l'histograma sino que també posa les etiquetes d'intervals a sota i mostra un missatge d'error si l'usuari intenta generar un altre histograma sense refrescar la pàgina:  

https://github.com/blackcub3s/calculaTempsReaccio/blob/916a2f5414de74815f1795d6bae7db8cf205e3a8/scriptHistogramaGPT.js#L54-L124



