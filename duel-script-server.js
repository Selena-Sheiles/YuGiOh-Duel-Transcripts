function checkHTML() {
    var cards = document.getElementsByClassName("cardName");
    Promise.all([...cards].map(card => {
        var url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=" + encodeURIComponent(card.innerHTML);
        return fetch(url).then(response => {
            return response.json().then(json => {
                var cardID = json.data[0].name;
                return fetch(`description/${cardID}.html`).then(response => {
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