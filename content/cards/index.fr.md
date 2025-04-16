+++
title = 'CuriOO.city — Explore, find, fun'
+++

<div class="container mt-3">
<div class="row">
    <div class="col-3 mt-3">
        <select class="form-select" name="country" id="country-select">
            <option value="fr">France</option>
        </select>
    </div>
    <div class="col-3 mt-3">
        <select class="form-select" name="year" id="year-select">
            <option value="2025">2025</option>
        </select>
    </div>
    <div class="col-3 mt-3">
        <select class="form-select" name="type" id="type-select">
            <option value="0">---</option>
            <option value="1">Nature</option>
            <option value="2">Monument</option>
            <option value="3">Culte</option>
            <option value="4">Evenement</option>
            <option value="5">Lieu</option>
        </select>
    </div>
    <div class="col-3 mt-3">
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

<script>
    let row = '<div class="row mt-3 mb-5">';
    for (i = 1 ; i < 25 ; i++) {
        row += '<div class="col-3"><img src="/images/cards/' + i + '-min.png" width="100%" style="padding-top: 25px;" /></div>';
    }
    row += '</div>';
    document.write(row);
</script>
</div>