+++
title = 'CuriOO.city — Explore, find, fun'
+++

<div class="row" style="background-color: black;padding:50px;">
<div class="container">
<div class="row mx-5">
    <div class="col-lg-3 col-md-6 col-sm-6 mt-3">
        <label class="text-white fw-bold mb-3 h4">🗺 Country: </label>
        <select class="form-select" name="country" id="country-select">
            <option value="fr">France</option>
        </select>
    </div>
    <div class="col-lg-3 col-md-6 col-sm-6 mt-3">
        <label class="text-white fw-bold mb-3 h4">📅 Edition: </label>
        <select class="form-select" name="year" id="edition-select"  onchange="loadCards();">
            <option value="2025">2025</option>
            <option value="ennery">Ennery</option>
            <option value="nancy">Nancy</option>
        </select>
    </div>
    <div class="col-lg-3 col-md-6 col-sm-6 mt-3">
        <label class="text-white fw-bold mb-3 h4">🧾 Type: </label>
        <select class="form-select" name="type" id="type-select">
            <option value="0">---</option>
            <option value="1">Nature</option>
            <option value="2">Monument</option>
            <option value="3">Culte</option>
            <option value="4">Event</option>
            <option value="5">Location</option>
        </select>
    </div>
    <div class="col-lg-3 col-md-6 col-sm-6 mt-3">
        <label class="text-white fw-bold mb-3 h4">🏷 Category: </label>
        <select class="form-select" name="category" id="category-select">
            <option value="0">---</option>
            <option value="1">Place</option>
            <option value="2">Mountain</option>
            <option value="3">Castle</option>           
            <option value="4">Beach</option> 
            <option value="5">Forest</option> 
            <option value="6">Museum</option>
            <option value="7">Park</option>
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
            let edition = document.getElementById("edition-select").value;
            const response = await fetch("https://api.curioo.city/api/cards/" + edition);
            cards = await response.json();
            let row = '<div class="container mt-3 mb-5"><div class="row">';
            row += '<div class="container mt-3 mb-5"><div class="row">';
            let cpt = 1;
            let num_cards = cards.cards.length;
            if (["ennery"].includes(edition)) num_cards = 4;
            if (["nancy"].includes(edition)) num_cards = 19;
            for (i = 1 ; i <= num_cards; i++) {
                    row += '<div class="col-lg-3 col-sm-6"><img class="img" id="card' + cpt + '" src="/images/cards/' + edition + '/' + cpt + '-min.png" width="100%" style="padding-top: 25px;" onclick="modalImg.src = this.src; modal.style.display = \'block\';"/></div>';
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