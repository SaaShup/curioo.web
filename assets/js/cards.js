var cards = {};
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("modal-image");

async function loadCards() {
            let edition = document.getElementById("edition-select").value;
            let country = document.getElementById("country-select").value;
            const response = await fetch("https://api.curioo.city/api/cards/" + edition);
            cards = await response.json();
            let row = '<div class="container mt-3 mb-5"><div class="row">';
            row += '<div class="container mt-3 mb-5"><div class="row">';
            let cpt = 1;
            let num_cards = cards.cards.length;
            if (["ennery"].includes(edition)) num_cards = 4;
            if (["nancy"].includes(edition)) num_cards = 19;
            if (["2026"].includes(edition) && country == "sw") {
                num_cards = 21;
                cpt = 432;
            }
            if (["2025"].includes(edition)) {
                cpt = 1;
                if (country == "fr") {
                    num_cards = 121;
                    cpt = 1;
                }
                if (country == "lu") {
                    num_cards = 20;
                    cpt = 122;
                }
            }
            for (i = cpt ; i <= num_cards; i++) {
                    row += '<div class="col-lg-3 col-sm-6"><img class="img" id="card' + i + '" src="/images/cards/' + edition + '/' + i + '-min.png" width="100%" style="padding-top: 25px;" onclick="modalImg.src = this.src; modal.style.display = \'block\';"/></div>';
                    cpt++;
            }
            row += '</div></div>';
            document.getElementById("cards").innerHTML = row;
}

window.onload = async function () {
            loadCards();
        };
