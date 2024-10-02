// Funzione per rilevare il dispositivo
function isMobile() {
    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

var zoom = isMobile() ? 16 : 18; // Zoom più basso per mobile
// Inizializza la mappa centrata su Langhirano con zoom appropriato
var map = L.map('map', { zoomControl: false }).setView([44.6146, 10.2662], zoom);

// Controlli di zoom
L.control.zoom({
    position: 'bottomleft'
}).addTo(map);

// Aggiungi padding in base al dispositivo
if (isMobile()) {
    // Aggiungi padding per dispositivi mobili
    document.getElementById('map').style.padding = '10px 10px 500px 10px'; // Padding maggiore per mobile (Alto Destra Sotto Sinistra)
} else {
    // Nessun padding per desktop
    document.getElementById('map').style.padding = '0'; // Padding zero per desktop
}

// Aggiungi il layer di OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Array di icone personalizzate
var icons = [
    L.icon({
        iconUrl: 'images/logo_comune.jpg', // Sostituisci con il percorso della prima icona
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    }),
    L.icon({
        iconUrl: 'images/logo_comune.jpg', // Sostituisci con il percorso della prima icona
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    })
];

// Array di immagini del popup
var images = [
    'https://d2fg1aan4gy9m1.cloudfront.net/ert/images/537/langhirano-PR-Palazzo_Comunale_di_langhirano-ph.Parma1983-cc_by_sa_40.jpg', // Foto comune di langhirano
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Piazza_Giuseppe_Garibaldi_%28Langhirano%29_-_torre_campanaria_2019-06-26.jpg/800px-Piazza_Giuseppe_Garibaldi_%28Langhirano%29_-_torre_campanaria_2019-06-26.jpg?20190824223426' // Foto piazza
];

var markers = [
    {
        coords: [44.6146, 10.2662],
        icon: icons[0],  // Icona associata
        image: images[0],  // Immagine associata
        title: 'Municipio di Langhirano',
        description: 'Questo è il municipio principale.'
    },
    {
        coords: [44.6142, 10.2655],
        icon: icons[1],  // Icona associata al secondo marker
        image: images[1],  // Immagine associata
        title: 'Piazza di Langhirano',
        description: 'Questa è la piazza storica del paese.'
    }
];

// Ciclo per aggiungere i marker
markers.forEach(function(marker) {
    L.marker(marker.coords, { icon: marker.icon }).addTo(map)
        .bindPopup('<b>' + marker.title + '</b><br><img src="' + marker.image + '" alt="Descrizione dell\'immagine" style="width: 100%; height: auto;"><br><small>' + marker.description + '</small>');
});
