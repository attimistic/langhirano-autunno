// Funzione per rilevare il dispositivo
function isMobile() {
    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

var zoom = isMobile() ? 16 : 18; // Zoom più basso per mobile
var map; // Dichiarazione della variabile mappa

// Funzione per inizializzare la mappa
function initMap() {
    // Inizializza la mappa centrata su Langhirano con zoom appropriato
    map = L.map('map', { zoomControl: false }).setView([44.6146, 10.2662], zoom);

    // Controlli di zoom
    L.control.zoom({
        position: 'bottomleft'
    }).addTo(map);

    // Modifica il padding e l'altezza in base al dispositivo
    var mapContainer = document.getElementById('map');
    if (isMobile()) {
        mapContainer.style.padding = '10px'; // Imposta il padding desiderato
        mapContainer.style.height = 'calc(100vh - 50px)'; // Altezza con spazio per l'intestazione su mobile
    } else {
        mapContainer.style.padding = '0px'; // Non impostare padding per desktop
        mapContainer.style.height = '100vh'; // Altezza completa su desktop
    }

    // Aggiungi il layer Google Maps
    var googleRoadmap = L.gridLayer.googleMutant({
        maxZoom: 21, // Google Maps permette di zoomare molto più in profondità
        type: 'roadmap', // Puoi cambiare il tipo di mappa (roadmap, satellite, hybrid, terrain)
        key: 'AIzaSyC3LBwhCVLiACf_XQtmkxycvqd1ePeP_EI' // Aggiungi qui la tua API key
    }).addTo(map);

    // Aggiungi invalidateSize per correggere il rendering
    setTimeout(function() {
        map.invalidateSize();
    }, 100); // Attendere leggermente prima di chiamarlo

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
    let images = [
        'https://d2fg1aan4gy9m1.cloudfront.net/ert/images/537/langhirano-PR-Palazzo_Comunale_di_langhirano-ph.Parma1983-cc_by_sa_40.jpg', // Foto comune di langhirano
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Piazza_Giuseppe_Garibaldi_%28Langhirano%29_-_torre_campanaria_2019-06-26.jpg/800px-Piazza_Giuseppe_Garibaldi_%28Langhirano%29_-_torre_campanaria_2019-06-26.jpg?20190824223426' // Foto piazza
    ];

    let markers = [
        {
            coords: [44.6142, 10.2655],
            icon: icons[1],  // Icona associata al secondo marker
            image: images[1],  // Immagine associata
            title: 'Piazza di Langhirano',
            description: 'Questa è la piazza storica del paese.'
        },
        {
            coords: [44.6151, 10.2661],
            icon: icons[1],  // Icona associata
            image: images[1],  // Immagine associata
            title: 'ROR Protezione Civile',
            description: 'Il mondo e la tecnologia della protezione civile e "Io non rischio" gioca con noi.'
        },
        {
            coords: [44.6150, 10.2662],
            icon: icons[1],  // Icona associata
            image: images[1],  // Immagine associata
            title: 'Sci Club Schia A.S.D.',
            description: 'Far provare i roller ai bimbi.'
        },
        {
            coords: [44.6150, 10.2665],
            icon: icons[1],  // Icona associata
            image: images[1],  // Immagine associata
            title: 'Ran Maishinkan Karate',
            description: 'Presentazione della disciplina Tradizionale Shotokan con dimostrazioni.'
        },
        {
            coords: [44.6149, 10.2668],
            icon: icons[1],  // Icona associata
            image: images[1],  // Immagine associata
            title: 'AVIS',
            description: 'Punto divulgativo sulla donazione di sangue e plasma. - Donazione di materiale di cancelleria.'
        },
        {
            coords: [44.6149, 10.2669],
            icon: icons[1],  // Icona associata
            image: images[1],  // Immagine associata
            title: 'Protezione Civile CCS',
            description: null
        },
        {
            coords: [44.6148, 10.2675],
            icon: icons[1],  // Icona associata
            image: images[1],  // Immagine associata
            title: 'Polizia Locale',
            description: 'Percorso di educazione stradale per ragazzi.'
        },
        {
            coords: [44.6147, 10.2663],
            icon: icons[1],  // Icona associata
            image: images[1],  // Immagine associata
            title: 'Pompieropoli',
            description: 'Simulazioni di interventi per bambini.'
        },
        {
            coords: [44.6148, 10.2663],
            icon: icons[1],  // Icona associata
            image: images[1],  // Immagine associata
            title: 'S.O.S Unità Cinofila',
            description: 'Merende dolci e salate.'
        },
        {
            coords: [44.6146, 10.2662],
            icon: icons[1],  // Icona associata
            image: images[1],  // Immagine associata
            title: 'AP Langhirano',
            description: "Dimostrazioni per volontari dell'associazione e per la popolazione nel pomeriggio. Al mattino esercitazione dei volontari"
        },
        {
            coords: [44.6144, 10.2661],
            icon: icons[1],  // Icona associata
            image: images[1],  // Immagine associata
            title: 'Gruppo Giovani Parrocchia',
            description: 'Dj - Baby dance, stand dei biscotti'
        },
        {
            coords: [44.6144, 10.2659],
            icon: icons[1],  // Icona associata
            image: images[1],  // Immagine associata
            title: 'The Angels Val Parma',
            description: "Progetto Mille fiori per l'Oncologia. Laboratori per bambini e la ruota della fortuna."
        },
        {
            coords: [44.6142, 10.2664],
            icon: icons[1],  // Icona associata
            image: images[1],  // Immagine associata
            title: 'Softball e Baseball Club',
            description: 'Tunnel di battuta Baseball e Softball.'
        },
        {
            coords: [44.6140, 10.2669],
            icon: icons[1],  // Icona associata
            image: images[1],  // Immagine associata
            title: 'ASDB Langhiranese Calcio',
            description: 'Esercitazioni calcistiche con squadre giovanili della società.'
        },
        {
            coords: [44.6146, 10.2657],
            icon: icons[1],  // Icona associata
            image: images[1],  // Immagine associata
            title: 'Il Ponte',
            description: 'Spazio per bambini con giochi da tavolo, 2 laboratori, mercatino sostenibile. Cioccolata calda e tè dal mattino.'
        },
        {
            coords: [44.6144, 10.2656],
            icon: icons[1],  // Icona associata
            image: images[1],  // Immagine associata
            title: 'A.VO.PRO.RIT',
            description: 'Caldarroste e dolci di castagne.'
        },
        {
            coords: [44.6144, 10.2654],
            icon: icons[1],  // Icona associata
            image: images[1],  // Immagine associata
            title: 'Gruppo Alpini di Langhirano',
            description: 'Vin Brulè.'
        },
        {
            coords: [44.6144, 10.2659],
            icon: icons[1],  // Icona associata
            image: images[1],  // Immagine associata
            title: 'Pedale val Parma - Spritz Bikers - Wild Team',
            description: 'Giro in bici alla scoperta delle associazioni.'
        },
        {
            coords: [44.6144, 10.2662],
            icon: icons[1],  // Icona associata
            image: images[1],  // Immagine associata
            title: 'Il gioco della rana',
            description: null
        },
    
    ];

    // Ciclo per aggiungere i marker
    markers.forEach(function(marker) {
        // Costruisci il contenuto del popup
        var popupContent = '<div class="popup-content"><b>' + marker.title + '</b>';
        
        // Aggiungi l'immagine se esiste
        if (marker.image) {
            // Imposta l'immagine a una larghezza fissa di 200px
            popupContent += '<br><img src="' + marker.image + '" alt="Immagine non disponibile" style="width: 200px; height: auto;">';
        }

        // Aggiungi la descrizione se esiste
        if (marker.description) {
            popupContent += '<br><small>' + marker.description + '</small>';
        }

        popupContent += '</div>'; // Chiudi il contenitore del popup

        // Crea il marker e aggiungilo alla mappa
        L.marker(marker.coords, { icon: marker.icon }).addTo(map)
            .bindPopup(popupContent, {
                maxWidth: 200 // Il popup si adatta alla larghezza dell'immagine
            });
    });

    // Test della funzione
    if (isMobile()) {
        console.log("Dispositivo mobile rilevato");
    } else {
        console.log("Dispositivo desktop rilevato");
    }
}

// Carica la Google Maps API con la callback per initMap
function loadGoogleMapsAPI() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC3LBwhCVLiACf_XQtmkxycvqd1ePeP_EI&callback=initMap`; // Sostituisci YOUR_API_KEY con la tua chiave
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

// Carica l'API di Google Maps all'avvio della pagina
document.addEventListener('DOMContentLoaded', loadGoogleMapsAPI);
