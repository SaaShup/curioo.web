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
    <script type='text/javascript' src='https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js'>
    </script>
    <script type="text/javascript">
        var portalIcon = L.divIcon({
            className: 'curioo-marker',
            html: '<div style="display:flex;flex-direction:column;align-items:center;position:relative;">\
                        <img src="/images/portal.png" class="icon-wrapper p-1 rounded-5"\
                            style="width:48px;height:48px;" />\
                        <div style="width:12px;height:12px;background:#ff544c;border-radius:50%;border:2px solid white;                    "></div></div>',
            iconSize: [48, 48],
            iconAnchor: [28, 48]
        });
        var lat = 48.689958;
        var lon = 6.174794;
        var macarte = null;
        var markerClusters;
        var cities = {};
        function initMap() {
            macarte = L.map('map').setView([lat, lon], 7);
            markerClusters = L.markerClusterGroup();
            L.tileLayer('https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=QktaEbiPNfxQ5KPdknah', {
                attribution: 'curioocity',
                minZoom: 7,
                maxZoom: 15
            }).addTo(macarte);
            for (const city of cities.cities) {
                var marker = L.marker([city.latitude, city.longitude], {
                    icon: portalIcon
                });
                let url = city.url.substring(0, city.url.indexOf('/api/'));
                marker.bindPopup('<div class="text-center"><a href="' + url + '" target="_blank" style="color:black;text-decoration: none;"><div class="fw-bold m-2">' + city.name + '</div><div><img class="rounded" width="96px" height="96px" src="' + url + '/api/image"/></div></a></div>');
                markerClusters.addLayer(marker);
            }
            macarte.addLayer(markerClusters);
        }
        window.onload = async function () {
            const response = await fetch("https://api.curioo.city/api/cities");
            cities = await response.json();
            initMap();
        };
    </script>
</div>
