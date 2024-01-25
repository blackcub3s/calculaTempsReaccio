# Finalitat

Aquesta eina permet calcular el temps de reacció motor d'una persona computant la diferència entre dos clics consecutius entre cel·les. No és una eina perfectament fiable ja que existeixen diferents fonts de variabilitat: la primera, la velocitat de l'ordinador de la persona que té el client (navegador). El propi llenguatge javascript i el temps que tarda en processar les dades i, finalment, la condició que s'ha emprat per evitar que surtin dues cel·les consecutives, com veurem. Tot i així, serveix com una bona aproximació per comparar individus sempre que facin servir el mateix dispositiu (sigui mòbil, tablet o ordinador).

El funcionament de l'aplicació és tal i com es mostra en el següent GIF:

![gif_de_mostra](/imatges/gifDemo_appCalculaTempsReaccio.gif)

# Implementació

## Fitxer scriptTaula.js

### Funció main()

El que veu l'usuari res més carregar la pàgina és, principalment, una taula html (encara que no ho sembli). Per mostrar-se el que l'usuari veu, res més carregar l'html, es crida la funció `main()` del fitxer [scriptTaula.js](/scriptTaula.js). Aquesta funció _amaga_ tots els elements `<td></td>` de la taula posant la propietat de CSS a `style: hidden` mitjançant javascript, a excepció d'un d'ells, que es tria de forma aleatòria mitjançant la funció `Math.random()`:

https://github.com/blackcub3s/calculaTempsReaccio/blob/7305301a55ef9c60cbf85a20c41402643589a6ce/scriptTaula.js#L81-L92

Aquesta funció, igual que les demés funcions crida diverses variables globals diposades a l'inici del fitxer (així es troben disponibles mentre no es refresci la pàgina):

https://github.com/blackcub3s/calculaTempsReaccio/blob/7305301a55ef9c60cbf85a20c41402643589a6ce/scriptTaula.js#L3-L12

## Funció casellaClicada()

Aquesta funció és invocada cada cop que cliquem damunt d'una de les cel·les visibles de la taula. Si la casella que s'ha clicat s'ha clicat per primer cop des de que hem carregat la pàgina, s'inicia un temporitzador amb `t = performance.now()` (cas en que la variable global clics val zero). En cas contrari, si la cel·la ja ha sigut premuda en anteriors ocasions (és a dir, que clics és superior a 0, exemplificat per la condició `clics != 0`) aleshores ja tenim una referència temporal iniciada per l'usuari i podem calcular un temps de reacció emmagatzemant el valor de t en una variable auxiliar `t_previ` tot fent `t_previ = t` i aplicant de nou la sentència `t = performance.now` per poder fer la diferència `t - t_previ`. En calcular-lo també anem computant quin és el minim temps de reacció de l'usuari, el màxim, quina és la mitjana aritmètica i passar a l'HTML les estadístiques mencionades, perquè puguin ser vistes en temps real per l'usuari. A més aquesta funció també va guardant cada temps de reacció en l'`arrayTempsReaccio` per després mostrar l'histograma quan ho demani l'usuari.

https://github.com/blackcub3s/calculaTempsReaccio/blob/7305301a55ef9c60cbf85a20c41402643589a6ce/scriptTaula.js#L32-L67

## Funció main

TO DO EXPLICACIÓ