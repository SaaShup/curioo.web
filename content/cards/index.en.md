<div class="row" style="background-color: black;padding:50px;">
<div class="container">
<div class="row mx-5">
    <div class="col-lg-3 col-md-6 col-sm-6 mt-3">
        <label class="text-white fw-bold mb-3 h4">🗺 Country: </label>
        <select class="form-select" name="country" id="country-select" onchange="loadCards();">
            <option value="france">France</option>
            <option value="luxembourg">Luxemburg</option>
            <option value="suisse">Switzerland</option>
            <option value="belgique">Belgium</option>
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
        console.log(country)
        const response = await fetch("https://api.curioo.city/api/cards/");
        cards = await response.json();
        let row = '<div class="container mt-3 mb-5"><div class="row">';
        row += '<div class="container mt-3 mb-5"><div class="row">';
        for (var card of cards.cards) {
            if ('country' in card && country.toLowerCase() == card.country.toLowerCase())
            row += '<div class="col-lg-3 col-sm-6"><img class="img" id="card' + card.card_id + '" src="/images/cards/' + card.card_id +
                '-min.png" width="100%" style="padding-top: 25px;" onclick="modalImg.src = this.src; modal.style.display = \'block\';"/></div>';
        }
        row += '</div></div>';
        document.getElementById("cards").innerHTML = row;
    }

    window.onload = async function () {
        loadCards();
    };
</script>
</div>