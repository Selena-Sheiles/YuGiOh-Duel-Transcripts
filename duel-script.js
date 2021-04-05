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
    Promise.all([...cards].map(card => {
        var url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=" + encodeURIComponent(card.innerHTML);
        return fetch(url).then(response => {
            if (response.status == 400) {
                card.style.color = "red";
                card.style.textDecoration = "line-through";
                return false;
            }
            return response.json().then(json => {
                var cardName = json.data[0].name;
                if (card.innerHTML != cardName) {
                    card.style.color = "red";
                    return false;
                }
                return true;
            });
        });
    })).then(arr => {
        var isValid = arr.reduce((acc, cur) => {
            return acc & cur;
        }, true);
        if (isValid)
            alert("Cards OK");
        else
            alert("Cards error");
    });
}

function checkHTML() {
    var cards = document.getElementsByClassName("cardName");
    Promise.all([...cards].map(card => {
        var url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=" + encodeURIComponent(card.innerHTML);
        return fetch(url).then(response => {
            return response.json().then(json => {
                var cardID = json.data[0].id;
                return fetch("description/" + cardID + ".html").then(response => {
                    if (response.status == 404) {
                        card.style.backgroundColor = "red";
                        card.style.color = "white";
                        return false;
                    }
                    return true;
                });
            });
        });
    })).then(arr => {
        var isValid = arr.reduce((acc, cur) => {
            return acc & cur;
        }, true);
        if (isValid)
            alert("HTMLs OK");
        else
            alert("HTMLs missing");
    });
}