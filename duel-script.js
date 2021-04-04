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

function validateCards() {
    var cards = document.getElementsByClassName("cardName");
    var invalid = false;
    for (var card of cards) {
        var url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=" + encodeURIComponent(card.innerHTML);
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", url, false);
        xmlHttp.send();
        if (xmlHttp.status == 400) {
            card.style.color = "red";
            card.style.textDecoration = "line-through";
            invalid = true;
            continue;
        }
        var obj = JSON.parse(xmlHttp.responseText);
        if (card.innerHTML != obj.data[0].name) {
            card.style.color = "red";
            invalid = true;
        }
    }
    if (invalid)
        alert("Error");
    else
        alert("OK");
}