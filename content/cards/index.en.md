<div style="background-color: black;padding:50px 0;">
<div class="container">
<div class="row">
    <div class="col-lg-3 col-md-6 col-sm-6 mt-3">
        <label class="text-white fw-bold mb-3 h4">🗺 Country: </label>
        <select class="form-select" name="country" id="country-select" onchange="loadCards();">
            <option value="france">France</option>
            <option value="luxembourg">Luxemburg</option>
            <option value="suisse">Switzerland</option>
            <option value="belgique">Belgium</option>
            <option value="irlande">Ireland</option>
            <option value="portugal">Portugal</option>
        </select>
    </div>
    <div class="col-lg-3 col-md-6 col-sm-6 mt-3">
        <label class="text-white fw-bold mb-3 h4">🧾 Type: </label>
        <select class="form-select" name="type" id="type-select" onchange="loadCards();">
            <option value="">---</option>
            <option value="Nature">Nature</option>
            <option value="Monument">Monument</option>
            <option value="Culte">Cult</option>
            <option value="Evenement">Event</option>
            <option value="Lieu">Place</option>
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

    var loadSeq = 0;

    async function loadCards() {
        const seq = ++loadSeq;
        let country = document.getElementById("country-select").value;
        let type = document.getElementById("type-select").value;
        showLoading();
        const response = await fetch("https://api.curioo.city/api/cards/");
        cards = await response.json();
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