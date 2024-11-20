const ricerca = document.getElementById("ricerca");
const risultato = document.getElementById("risultato");
const listaDestra = document.querySelector("#barraDx ul");
const svuotaCarrello = document.getElementById("svuotaCarrello");

const mappaRicambi = {
    "500086267": "Filtro Antipolline <br> A-1-1",
    "500086309": "Filtro Antipolline <br> A-1-1",
    "1908547": "Filtro Combustibile / Gasolio <br> A-1-2",
    "2992662": "Filtro Combustibile / Gasolio (Prefiltro) <br> A-1-2",
    "500086330": "Filtro Aria <br> A-1-3",
    "2992300": "Filtro Combustibile <br> A-1-3",
    "2995711": "Filtro Combustibile <br> A-1-3",
    "504153481": "Elemento Filtro Sfiato Motore (Blow) <br> A-1-5",
    "2996234": "Guarnizione <br> A-1-5",
    "5801472560": "Vite testa Esagona <br> A-1-5"
};

// Evidenzia il Part Number nella barra sinistra
function evidenziaPartNumber(pn) {
    const item = document.getElementById(pn);
    if (item) item.classList.add("evidenziato");
}

// Rimuove l'evidenziazione da un Part Number
function rimuoviEvidenziazione(pn) {
    const item = document.getElementById(pn);
    if (item) item.classList.remove("evidenziato");
}

// Aggiunge un Part Number alla lista di destra
function aggiungiAllaListaDestra(partNumber) {
    if ([...listaDestra.children].some(item => item.id === `dx-${partNumber}`)) return;

    const nuovoElemento = document.createElement("li");
    nuovoElemento.id = `dx-${partNumber}`;
    nuovoElemento.innerHTML = `${partNumber} <br> ${mappaRicambi[partNumber]}`;
    nuovoElemento.addEventListener("click", () => rimuoviDaListaDestra(partNumber, nuovoElemento));
    listaDestra.appendChild(nuovoElemento);

    const separatore = document.createElement("hr");
    listaDestra.appendChild(separatore);
}

// Rimuove un Part Number dalla lista di destra
function rimuoviDaListaDestra(partNumber, elemento) {
    const separatore = elemento.nextElementSibling;
    listaDestra.removeChild(elemento);
    if (separatore && separatore.tagName === "HR") listaDestra.removeChild(separatore);
    rimuoviEvidenziazione(partNumber);
}

// Gestisce l'input del campo di ricerca
ricerca.addEventListener("input", () => {
    const partNumber = ricerca.value.trim();
    if (mappaRicambi[partNumber]) {
        risultato.innerHTML = mappaRicambi[partNumber];
        evidenziaPartNumber(partNumber);
        aggiungiAllaListaDestra(partNumber);
    } else {
        risultato.innerHTML = "Ricambio non trovato,<br> inserisci un Part Number<br> originale Iveco";
        evidenziaPartNumber("");
    }
});

// Gestisce i clic sugli elementi della barra sinistra
function gestisciClicElementoLista() {
    const allItems = document.querySelectorAll("#barraSx li");
    allItems.forEach(item => {
        item.addEventListener("click", () => {
            const partNumber = item.id;
            ricerca.value = partNumber;
            if ([...listaDestra.children].some(item => item.id === `dx-${partNumber}`)) {
                const elementoDaRimuovere = document.getElementById(`dx-${partNumber}`);
                rimuoviDaListaDestra(partNumber, elementoDaRimuovere);
            } else {
                if (mappaRicambi[partNumber]) {
                    risultato.innerHTML = mappaRicambi[partNumber];
                    evidenziaPartNumber(partNumber);
                    aggiungiAllaListaDestra(partNumber);
                } else {
                    risultato.innerHTML = "Ricambio non trovato,<br> inserisci un Part Number<br> originale Iveco";
                    evidenziaPartNumber("");
                }
            }
        });
    });
}

gestisciClicElementoLista();

// Svuota la lista di destra e rimuove le evidenziazioni
svuotaCarrello.addEventListener("click", () => {
    listaDestra.innerHTML = "";
    document.querySelectorAll("#barraSx .evidenziato").forEach(el => el.classList.remove("evidenziato"));
});
