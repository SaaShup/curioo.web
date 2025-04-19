+++
title = 'CuriOO.city — Explore, find, fun'
+++

<div class="row p-3 pb-5" style="background-color: black;margin: 0px;">
<div class="container">
<div class="row mx-5">
    <div class="col-lg-3 col-md-6 col-sm-6 mt-3">
        <label class="text-white fw-bold mb-3 h4">🗺 Pays: </label>
        <select class="form-select" name="country" id="country-select">
            <option value="fr">France</option>
        </select>
    </div>
    <div class="col-lg-3 col-md-6 col-sm-6 mt-3">
        <label class="text-white fw-bold mb-3 h4">📅 Edition: </label>
        <select class="form-select" name="year" id="edition-select"  onchange="loadCards();">
            <option value="2025">2025</option>
            <option value="ennery">Ennery</option>
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
    <div class="col-lg-3 col-md-6 col-sm-6 mt-3">
        <label class="text-white fw-bold mb-3 h4">🏷 Categorie: </label>
        <select class="form-select" name="category" id="category-select">
            <option value="0">---</option>
            <option value="1">Place</option>
            <option value="2">Mont</option>
            <option value="3">Chateau</option>           
            <option value="4">Plage</option> 
            <option value="5">Foret</option> 
            <option value="6">Musee</option>
            <option value="7">Parc</option>
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

function loadCards() {
    let row = '<div class="container mt-3 mb-5"><div class="row">';
            let cpt = 1;
            let edition = document.getElementById("edition-select").value;
            for (i = 1 ; i < cards.length; i++) {
                if (cards[i].edition.toString() === edition) {
                    row += '<div class="col-lg-3 col-sm-6"><img class="img" id="card' + cpt + '" src="/images/cards/' + edition + '/' + cpt + '-min.png" width="100%" style="padding-top: 25px;" onclick="modalImg.src = this.src; modal.style.display = \'block\';"/></div>';
                    cpt++;
                }
            }
            row += '</div></div>';
            document.getElementById("cards").innerHTML = row;
}

window.onload = async function () {
            const response = await fetch("/cards.json");
            cards = await response.json();
            let row = '<div class="container mt-3 mb-5"><div class="row">';
            loadCards();
        };

</script>
</div>