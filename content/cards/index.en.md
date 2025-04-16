+++
title = 'CuriOO.city — Explore, find, fun'
+++
<style>
.img:hover {opacity: 0.7;}

.modal {
  display: none;
  position: fixed;
  z-index: 100;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.9);
}

.modal-content {
  margin: auto;
  display: block;
  width: 60%;
  max-width: 600px;
}

.modal-content {  
  -webkit-animation-name: zoom;
  -webkit-animation-duration: 0.6s;
  animation-name: zoom;
  animation-duration: 0.6s;
}

@-webkit-keyframes zoom {
  from {-webkit-transform:scale(0)} 
  to {-webkit-transform:scale(1)}
}

@keyframes zoom {
  from {transform:scale(0)} 
  to {transform:scale(1)}
}

@media only screen and (max-width: 700px){
  .modal-content {
    width: 100%;
  }
}
</style>

<div class="row" style="background-color: black;padding:50px;">
<div class="container">
<div class="row mx-5">
    <div class="col mt-3">
        <label class="text-white fw-bold mb-3">🗺 Country: </label>
        <select class="form-select" name="country" id="country-select">
            <option value="fr">France</option>
        </select>
    </div>
    <div class="col-3 mt-3">
        <label class="text-white fw-bold mb-3">📅 Year: </label>
        <select class="form-select" name="year" id="year-select">
            <option value="2025">2025</option>
        </select>
    </div>
    <div class="col-3 mt-3">
        <label class="text-white fw-bold mb-3">🧾 Type: </label>
        <select class="form-select" name="type" id="type-select">
            <option value="0">---</option>
            <option value="1">Nature</option>
            <option value="2">Monument</option>
            <option value="3">Culte</option>
            <option value="4">Event</option>
            <option value="5">Location</option>
        </select>
    </div>
    <div class="col-3 mt-3">
        <label class="text-white fw-bold mb-3">🏷 Category: </label>
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

<script>
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("modal-image");

    let row = '<div class="container mt-3 mb-5"><div class="row">';
    for (i = 1 ; i < 25 ; i++) {
        row += '<div class="col-3"><img class="img" id="card' + i + '" src="/images/cards/' + i + '-min.png" width="100%" style="padding-top: 25px;" onclick="modalImg.src = this.src; modal.style.display = \'block\';"/></div>';
    }
    row += '</div></div>';
    document.write(row);
</script>
</div>