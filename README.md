# Índex de continguts

1. [Finalitat](#1-finalitat)
2. [Implementació](#2-implementació)
    1. [Fitxer scriptTaula.js](#21-fitxer-scripttaulajs)
        1. [Funció main()](#211-funció-main)
        2. [Funció casellaClicada()](#212-funció-casellaclicada)
    2. [Fitxer scriptHistogramaGPT.js](#22-fitxer-scripthistogramagptjs)
        1. [Funció generaIntervals()](#221-funció-generaintervals)
        2. [Funció afegeix_TR_a_arrayHistograma()](#222-funció-afegeix_tr_a_arrayhistograma)
        3. [Funció main_fesHistograma()](#223-funció-main_feshistograma)




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

![sortida fitxer meu](/FITXERS_AUXILIARS/Output_histograma_meu.PNG)

 Dins [scriptHistogramaGPT.js](/scriptHistogramaGPT.js) tenim una variable global booleana inicialitzada a fals (`var histogramaGenerat = false`) i tres funcions, que desgranarem a continuació en els seguents tres sub apartats (2.2.1, 2.2.2 i 2.2.3):


### 2.2.1 Funció generaIntervals()

### 2.2.3 Funció afegeix_TR_a_arrayHistograma()

### 2.2.3 Funció main_fesHistograma()




