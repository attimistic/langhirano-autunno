// Funzione di caricamento dello script della mappa
function loadMapScript() {
    if (typeof API_KEY === 'undefined') {
        console.error("La chiave API non è stata caricata correttamente.");
        return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap&libraries=marker&v=weekly&loading=async`;
    script.async = true;
    document.head.appendChild(script);
}

// Definisci la funzione initMap
window.initMap = function() {
    // Centro della mappa a Langhirano
    var mapOptions = {
        center: { lat: 44.6147, lng: 10.266 }, // Coordinate di Langhirano
        zoom: 19, // Livello di zoom
        mapTypeId: 'roadmap', // Tipo di mappa, roadmap per strade
        mapId: '876e77d7c9faadbe' // Inserisci qui l'ID della tua mappa
    };

    // Inizializza la mappa
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);


    if (google.maps && google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
        console.log("AdvancedMarkerElement è disponibile");
        // Qui va il tuo codice per la mappa
    } else {
        console.error("AdvancedMarkerElement non è disponibile");
    }

    

    // Carica i marker dal file JSON
    fetch('markers.json')
        .then(response => response.json())
        .then(markers => {
        
            markers.forEach((marker) => {
                const position = { lat: marker.lat, lng: marker.lng };
            
                const markerElement = new google.maps.marker.AdvancedMarkerElement({
                    position: position,
                    map: map,
                    content: createMarkerContent(marker)
                });
            
                let infoWindow = null;
            
                markerElement.addListener('click', () => {
                    if (infoWindow) {
                        infoWindow.close();
                        infoWindow = null;
                        return;
                    }
            
                    const infoWindowContent = createInfoWindowContent(marker);
                    
                    // Crea un nuovo InfoWindow con un offset di -40 px in latitudine
                    infoWindow = new google.maps.InfoWindow({
                        content: infoWindowContent,
                        position: {
                            lat: position.lat + (0.00005), // Aggiungi un offset in latitudine
                            lng: position.lng
                        },
                    });
            
                    infoWindow.open(map);
            
                    google.maps.event.addListener(infoWindow, 'closeclick', () => {
                        infoWindow.close();
                        infoWindow = null;
                    });
                });
            });
            
            
            

        })
        .catch(error => {
            console.error("Errore nel caricamento dei marker:", error);
        });

}
// Funzione per creare il contenuto del marker (solo l'icona)
function createMarkerContent(marker) {
    const div = document.createElement('div');
    
    // Aggiungi l'icona
    const img = document.createElement('img');
    img.src = marker.iconUrl || 'icons/default.png'; // Usa l'icona specificata o una di default
    img.style.width = '40px'; // Imposta la larghezza desiderata
    img.style.height = '40px'; // Imposta l'altezza desiderata
    div.appendChild(img);

    return div;
}

// Funzione per creare il contenuto dell'infobox
function createInfoWindowContent(marker) {
    const div = document.createElement('div');
    div.className = 'infobox';

    const title = document.createElement('h4');
    title.textContent = marker.title;
    div.appendChild(title);

    if (marker.description) {
        const description = document.createElement('p');
        description.textContent = marker.description;
        div.appendChild(description);
    }

    return div;
}



// Carica lo script della mappa dopo che la chiave API è stata definita
loadMapScript();
// Assicurati di chiamare initMap quando la pagina è completamente caricata
window.onload = initMap;