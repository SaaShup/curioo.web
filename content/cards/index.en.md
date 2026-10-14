<div style="background-color: black;padding:50px 0;">
<div class="container">
<div class="row">
    <div class="col-lg-3 col-md-6 col-sm-6 mt-3">
        <label class="text-white fw-bold mb-3 h4">🗺 Country: </label>
        <select class="form-select" name="country" id="country-select" onchange="loadCards();">
        </select>
    </div>
    <div class="col-lg-3 col-md-6 col-sm-6 mt-3">
        <label class="text-white fw-bold mb-3 h4">🧾 Type: </label>
        <select class="form-select" name="type" id="type-select" onchange="loadCards();">
            <option value="">---</option>
        </select>
    </div>
</div>
</div>
</div>

<div id="myModal" class="modal" style="height: 100%;" onclick="modal.style.display='none'">
  <img class="modal-content" id="modal-image">
</div>

<div id="cards">
</div>

<style>
    @keyframes cards-loading-pulse {
        0%, 100% { opacity: 0.45; }
        50% { opacity: 0.9; }
    }
    @keyframes cards-loading-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
</style>

<script>
    var cards = {};
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("modal-image");

    function showLoading() {
        document.getElementById("cards").innerHTML =
            '<div class="container my-5 py-4 text-center" style="animation: cards-loading-pulse 2s ease-in-out infinite;">' +
            '<img src="/images/logo.png" alt="Loading" style="width: 48px; animation: cards-loading-spin 1.5s linear infinite;"/>' +
            '<p class="text-muted mt-3 mb-0" style="letter-spacing: 2px; text-transform: uppercase; font-size: 0.75rem;">Loading…</p>' +
            '</div>';
    }

    var countryNames = {
        france: "France", luxembourg: "Luxemburg", suisse: "Switzerland",
        belgique: "Belgium", irlande: "Ireland", portugal: "Portugal", "საქართველო": "Georgia"
    };

    function fillCountries() {
        const select = document.getElementById("country-select");
        const countries = [...new Set(cards.cards.map(function (card) { return card.country; }))];
        select.innerHTML = "";
        countries.forEach(function (c) {
            const option = document.createElement("option");
            option.value = c.toLowerCase();
            option.textContent = countryNames[c.toLowerCase()] || c;
            select.appendChild(option);
        });
    }

    var typeNames = {
        culte: "Cult", evenement: "Event", lieu: "Place"
    };

    function fillTypes() {
        const select = document.getElementById("type-select");
        const types = [...new Set(cards.cards.map(function (card) { return card.type; }))].filter(Boolean);
        types.forEach(function (t) {
            const option = document.createElement("option");
            option.value = t;
            option.textContent = typeNames[t.toLowerCase()] || t;
            select.appendChild(option);
        });
    }

    var loadSeq = 0;

    async function loadCards() {
        const seq = ++loadSeq;
        let country;
        let type;
        showLoading();
        if (!cards.cards) {
            const response = await fetch("https://api.curioo.city/api/cards/");
            cards = await response.json();
            fillCountries();
            fillTypes();
        }
        country = document.getElementById("country-select").value;
        type = document.getElementById("type-select").value;
        let row = '<div class="container mt-3 mb-5"><div class="row">';
        for (var card of cards.cards) {
            if (country.toLowerCase() != card.country.toLowerCase()) continue;
            if (type.toLowerCase() != card.type.toLowerCase() && type != "") continue;
            row += '<div class="col-lg-3 col-sm-6"><img class="img" id="card' + card.card_id + '" src="https://api.curioo.city/images/' + card.card_id + '/' + card.card_id +
                '-min.png" width="100%" style="padding-top: 25px;" onclick="modalImg.src = this.src; modal.style.display = \'block\';"/></div>';
        }
        row += '</div></div>';
        const grid = document.createElement('div');
        grid.innerHTML = row;
        await Promise.all(Array.from(grid.querySelectorAll('img')).map(function (img) {
            return new Promise(function (resolve) {
                if (img.complete) return resolve();
                img.addEventListener('load', resolve);
                img.addEventListener('error', resolve);
            });
        }));
        if (seq !== loadSeq) return;
        const container = document.getElementById("cards");
        container.innerHTML = "";
        container.appendChild(grid);
    }

    showLoading();

    window.onload = async function () {
        loadCards();
    };
</script>
</div>