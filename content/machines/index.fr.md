<style>
.curioo-marker {
    background-color: white;
    border: 0.1rem solid #3d3d3d;
    border-radius: 2rem;
}
</style>
<div class="container">
    <div id="map" style="height: 800px;" class="my-3">
    </div>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
    <script type='text/javascript' src='https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js'></script>
    <script type="text/javascript">
        var machineIcon = L.divIcon({
            className: 'curioo-marker',
            html: '<div style="display:flex;flex-direction:column;align-items:center;position:relative;">\
                        <img src="/images/machine.png" class="icon-wrapper p-1 rounded-5"\
                            style="width:48px;height:48px;" />\
                        <div style="width:12px;height:12px;background:#ff544c;border-radius:50%;border:2px solid white;                    "></div></div>',
            iconSize: [48, 48],
            iconAnchor: [28, 48]
        });
        var lat = 48.689958;
        var lon = 6.174794;
        var macarte = null;
        var markerClusters;
        var cards = {};
        function initMap() {
            macarte = L.map('map').setView([lat, lon], 6);
            L.tileLayer('https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=QktaEbiPNfxQ5KPdknah', {
                attribution: 'curioomachines',
                minZoom: 6,
                maxZoom: 18
            }).addTo(macarte);
            let c = 0;
            for (const card of cards.cards) {
                if (card.lat !== null && card.lon !== null) {
                    var marker = L.marker([card.lat, card.lon], {icon: machineIcon});
                    marker.bindPopup('<div class="text-center"><div class="fw-bold m-2">' + card.place + '</div><div><img class="rounded" width="96px" height="96px" src="/images/cards/' + card.card_id + '-min.png"/></div></div>');
                    marker.addTo(macarte);
                    c++;
                }
            }
        }
        window.onload = async function () {
            const response = await fetch("https://api.curioo.city/api/cards");
            cards = await response.json();
            initMap();
        };
    </script>
</div>
