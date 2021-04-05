function appendCard(event) {
    event.preventDefault();
    var cardName = this.input.value;
    var url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=" + encodeURIComponent(cardName);
    fetch(url).then(response => {
        if (response.status == 400) {
            alert("Card not found!");
            return;
        }
        response.json().then(json => {
            cardName = json.data[0].name;
            getJpDesc(cardName).then(jpDesc => {
                var card = document.createElement("li");
                card.appendChild(document.createTextNode(cardName));
                card.style.fontWeight = "bold";
                card.style.color = "blue";
                card.style.cursor = "pointer";
                card.addEventListener("click", () => {
                    document.getElementById("cardImage").src = json.data[0].card_images[0].image_url;
                    document.getElementById("jpDesc").innerHTML = jpDesc;
                });
                var list = document.getElementById("cardNames");
                for (var li of list.childNodes) {
                    if (cardName < li.innerHTML) {
                        list.insertBefore(card, li);
                        return;
                    }
                    if (cardName == li.innerHTML) {
                        alert("Duplicate!");
                        return;
                    }
                }
                list.appendChild(card);
            });
        });
    });
}

function clearCards() {
    document.getElementById("cardNames").innerHTML = "";
}