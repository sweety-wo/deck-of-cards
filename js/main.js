var Cards = new Cards();

function fnReturnSuitIcons(suit) {
    var suitCode = "&nbsp;";
    switch (suit) {
        case "S":
            suitCode = "&spades;";
            break;
        case "D":
            suitCode = "&diams;";
            break;
        case "C":
            suitCode = "&clubs;";
            break;
        case "H":
            suitCode = "&hearts;";
            break;
    }
    return suitCode;
}


function fnSpread(data) {
    var cards = data ? data : Cards.fnGetCards(), cardsLength = cards.length, cardIndex;
    var displayCards = document.getElementById("display-cards");
    displayCards.innerHTML = "";
    for (cardIndex = 0; cardIndex < cardsLength; cardIndex++) {
        var card = cards[cardIndex];
        var thumb = document.createElement("div");
        if (card.suitString) {
            var suit = document.createElement("div");
            suit.className = 'suit ' + card.suitString.toLowerCase();
            suit.innerHTML = fnReturnSuitIcons(card.suit);
            thumb.appendChild(suit);

            var rank = document.createElement("div");
            rank.className = 'rank ' + card.suitString.toLowerCase();
            var rankText = document.createTextNode(card.rank);
            rank.appendChild(rankText);
            thumb.appendChild(rank);
        } else {
            var joker = document.createElement("div");
            joker.className = 'joker';
            var jokerText = document.createTextNode(card.rankString);
            joker.appendChild(jokerText);
            thumb.appendChild(joker);
        }
        displayCards.appendChild(thumb);
    }
}

function fnShuffle() {
    Cards.fnShuffle();
    fnSpread();
}

function fnSortByRank() {
    Cards.fnSortByRank();
    fnSpread();
}

function fnSortBySuit() {
    Cards.fnSortBySuit();
    fnSpread();
}

function fnChangeDecks(value) {
    Cards.conf.decks = parseInt(value);
    Cards.fnAddCard();
    fnShuffle();
}

fnSpread();