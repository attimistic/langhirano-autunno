// Funzione di caricamento dello script della mappa
function loadMapScript() {
    if (typeof API_KEY === 'undefined') {
        console.error("La chiave API non è stata caricata correttamente.");
        return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap&libraries=&v=weekly&loading=async`;
    script.async = true;
    document.head.appendChild(script);
}

// Definisci la funzione initMap
window.initMap = function() {
    // Inizializza la mappa a langhirano
    var mapZoom = 20;
    var map = L.map('map').setView([44.6145, 10.2661], mapZoom); // Langhirano

    // Aggiungi il tile layer di Google Maps
    L.gridLayer.googleMutant({
        maxZoom: 19,
        type: 'roadmap',
        attribution: 'Map data ©2024 Google'
    }).addTo(map);

   // Carica i marker dal file JSON
   fetch('markers.json')
   .then(response => response.json())
   .then(data => {
       data.forEach(marker => {
           const markerIcon = L.marker([marker.lat, marker.lng])
               .bindPopup(`<strong>${marker.title}</strong><br>${marker.description}`) // Aggiungi il titolo e la descrizione
               .addTo(map);
       });
   })
   .catch(error => {
       console.error("Errore nel caricamento dei marker:", error);
   });
};
// Carica lo script della mappa dopo che la chiave API è stata definita
loadMapScript();
