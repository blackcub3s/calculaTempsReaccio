# Finalitat

Aquesta eina permet calcular el temps de reacció motor d'una persona computant la diferència entre dos clics consecutius entre cel·les. No és una eina perfectament fiable ja que existeixen diferents fonts de variabilitat: la primera, la velocitat de l'ordinador de la persona que té el client (navegador). El propi llenguatge javascript i el temps que tarda en processar les dades i, finalment, la condició que s'ha emprat per evitar que surtin dues cel·les consecutives, com veurem. Tot i així, serveix com una bona aproximació per comparar individus sempre que facin servir el mateix dispositiu (sigui mòbil, tablet o ordinador).

# Implementació

## Fitxer scriptTaula.js

### Funció main()

El que veu l'usuari res més carregar la pàgina és, principalment, una taula html (encara que no ho sembli). Per mostrar-se el que l'usuari veu, res més carregar l'html, es crida la funció `main()` del fitxer [scriptTaula.js](/scriptTaula.js). Aquesta funció _amaga_ tots els elements `<td></td>` de la taula posant la propietat de CSS a `style: hidden` mitjançant javascript, a excepció d'un d'ells, que es tria de forma aleatòria mitjançant la funció `Math.random()`:

https://github.com/blackcub3s/calculaTempsReaccio/blob/7305301a55ef9c60cbf85a20c41402643589a6ce/scriptTaula.js#L81-L82

Aquesta funció, igual que les demés funcions crida diverses variables globals diposades a l'inici del fitxer (així es troben disponibles mentre no es refresci la pàgina):

https://github.com/blackcub3s/calculaTempsReaccio/blob/7305301a55ef9c60cbf85a20c41402643589a6ce/scriptTaula.js#L3-L12

## Funció casellaClicada()

TO DO EXPLICACIÓ

## Funció main

TO DO EXPLICACIÓ