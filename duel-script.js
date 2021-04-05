window.onload = function() {
    var cards = document.getElementsByClassName("cardName");
    for (var card of cards)
        card.addEventListener("click", displayCard);
}

function displayCard() {
    var url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=" + encodeURIComponent(this.innerHTML);
    fetch(url).then(response => {
        if (response.status == 400)
            return;
        response.json().then(json => {
            var cardID = json.data[0].id;
            document.getElementById("cardArt").src = "https://storage.googleapis.com/ygoprodeck.com/pics_artgame/" + cardID + ".jpg";
            document.getElementById("cardDesc").src = "description/" + cardID + ".html";
        });
    });
}

function validateCards() {} // Do nothing