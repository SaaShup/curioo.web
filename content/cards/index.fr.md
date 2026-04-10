<div class="row p-3 pb-5" style="background-color: black;margin: 0px;">
    <div class="container">
        <div class="row mx-5">
            <div class="col-lg-3 col-md-6 col-sm-6 mt-3">
                <label class="text-white fw-bold mb-3 h4">🗺 Pays: </label>
                <select class="form-select" name="country" id="country-select" onchange="loadCards();">
                    <option value="fr">France</option>
                    <option value="lu">Luxembourg</option>
                    <option value="sw">Suisse</option>
                    <option value="be">Belgique</option>
                </select>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 mt-3">
                <label class="text-white fw-bold mb-3 h4">🧾 Type: </label>
                <select class="form-select" name="type" id="type-select">
                    <option value="0">---</option>
                    <option value="1">Nature</option>
                    <option value="2">Monument</option>
                    <option value="3">Culte</option>
                    <option value="4">Evenement</option>
                    <option value="5">Lieu</option>
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

<script>
    var cards = {};
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("modal-image");

    async function loadCards() {
        let country = document.getElementById("country-select").value;
        const response = await fetch("https://api.curioo.city/api/cards/");
        cards = await response.json();
        let row = '<div class="container mt-3 mb-5"><div class="row">';
        row += '<div class="container mt-3 mb-5"><div class="row">';
        let cpt = 1;
        let num_cards = cards.cards.length;
        if (country == "sw") {
            num_cards = 21;
            cpt = 432;
        }
        if (country == "be") {
            num_cards = 21;
            cpt = 453;
        }
        if (country == "fr") {
            num_cards = 121;
            cpt = 1;
        }
        if (country == "lu") {
            num_cards = 20;
            cpt = 122;
        }
        for (i = 1; i <= num_cards; i++) {
            row += '<div class="col-lg-3 col-sm-6"><img class="img" id="card' + cpt + '" src="/images/cards/' + cpt +
                '-min.png" width="100%" style="padding-top: 25px;" onclick="modalImg.src = this.src; modal.style.display = \'block\';"/></div>';
            cpt++;
        }
        row += '</div></div>';
        document.getElementById("cards").innerHTML = row;
    }

    window.onload = async function () {
        loadCards();
    };
</script>
</div>