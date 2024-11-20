const ricerca = document.getElementById("ricerca");
const risultato = document.getElementById("risultato");
const listaDestra = document.querySelector("#barraDx ul"); // Lista di destra

// Mappa dei part number e descrizioni
const mappaRicambi = {
    "500086267": "Filtro Antipolline <br> A-1-1",
    "500086309": "Filtro Antipolline <br> A-1-1",
    "1908547": "Filtro Combustibile / Gasolio <br> A-1-2",
    "2992662": "Filtro Combustibile / Gasolio (Prefiltro) <br> A-1-2",
    "500086330": "Filtro Aria <br> A-1-3",
    "2992300": "Filtro Combustibile <br> A-1-3",
    "2995711": "Filtro Combustibile <br> A-1-3",
    "42563106": "Elemento Filtro Combustibile <br> A-1-4",
    "42491185": "Elemento Filtro Combustibile <br> A-1-4",
    "504153481": "Elemento Filtro Sfiato Motore (Blow) <br> A-1-5",
    "2996234": "Guarnizione <br> A-1-5",
    "5801472560": "Vite testa Esagona <br> A-1-5"
};

// Funzione per evidenziare un elemento nella lista di sinistra
function evidenziaPartNumber(pn) {
    const item = document.getElementById(pn);
    if (item) {
        item.classList.add("evidenziato");
    }
}

// Funzione per rimuovere l'evidenziazione dalla lista di sinistra
function rimuoviEvidenziazione(pn) {
    const item = document.getElementById(pn);
    if (item) {
        item.classList.remove("evidenziato");
    }
}

// Funzione per aggiungere un elemento alla lista destra
function aggiungiAllaListaDestra(partNumber) {
    // Controlla se l'elemento è già presente
    if ([...listaDestra.children].some(item => item.id === `dx-${partNumber}`)) {
        return; // Se esiste già, non fare nulla
    }

    // Crea un nuovo elemento della lista
    const nuovoElemento = document.createElement("li");
    nuovoElemento.id = `dx-${partNumber}`;
    nuovoElemento.innerHTML = `${partNumber} - ${mappaRicambi[partNumber].split("<br>")[0]} <br>Posizione: ${mappaRicambi[partNumber].split("<br>")[1]}`; // Mostra descrizione breve e posizione
    nuovoElemento.addEventListener("click", () => rimuoviDaListaDestra(partNumber, nuovoElemento)); // Assegna il comportamento di rimozione
    listaDestra.appendChild(nuovoElemento);

    // Evidenzia l'elemento nella lista di sinistra
    evidenziaPartNumber(partNumber);
}

// Funzione per rimuovere un elemento dalla lista destra
function rimuoviDaListaDestra(partNumber, elemento) {
    listaDestra.removeChild(elemento); // Rimuovi l'elemento dal carrello
    rimuoviEvidenziazione(partNumber); // Rimuovi l'evidenziazione nella lista sinistra
}

// Aggiorna il risultato e gestisce la ricerca
ricerca.addEventListener("input", () => {
    const partNumber = ricerca.value.trim();
    if (mappaRicambi[partNumber]) {
        risultato.innerHTML = mappaRicambi[partNumber];
        evidenziaPartNumber(partNumber);
        aggiungiAllaListaDestra(partNumber); // Aggiungi alla lista destra
    } else {
        risultato.innerHTML = "Ricambio non trovato,<br> inserisci un Part Number<br> originale Iveco";
        evidenziaPartNumber(""); // Rimuovi l'evidenziazione
    }
});

// Gestione del clic sugli elementi della lista sinistra
function gestisciClicElementoLista() {
    const allItems = document.querySelectorAll("#barraSx li");
    allItems.forEach(item => {
        item.addEventListener("click", () => {
            const partNumber = item.id; // Usa l'ID come Part Number
            ricerca.value = partNumber; // Simula l'inserimento nell'input
            if (mappaRicambi[partNumber]) {
                risultato.innerHTML = mappaRicambi[partNumber];
                evidenziaPartNumber(partNumber);
                aggiungiAllaListaDestra(partNumber); // Aggiungi alla lista destra
            } else {
                risultato.innerHTML = "Ricambio non trovato,<br> inserisci un Part Number<br> originale Iveco";
                evidenziaPartNumber(""); // Rimuovi l'evidenziazione
            }
        });
    });
}

// Inizializza gli eventi al caricamento della pagina
document.addEventListener("DOMContentLoaded", gestisciClicElementoLista);