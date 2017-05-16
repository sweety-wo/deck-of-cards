(function (window, document, undefined) {

    var Cards = window.Cards = function (conf) {
        this.conf = fnObjExtend(Cards.defaults, conf);
        this.fnAddCard();
        if (this.conf.startShuffled) {
            this.fnShuffle(5);
        }
        return this;
    };

    Cards.defaults = {
        "decks": 1,
        "startShuffled": true,
        "jokers": 2,
        "jokerText": "Joker",
        "ranks": {
            "2": "Two",
            "3": "Three",
            "4": "Four",
            "5": "Five",
            "6": "Six",
            "7": "Seven",
            "8": "Eight",
            "9": "Nine",
            "10": "Ten",
            "J": "Jack",
            "Q": "Queen",
            "K": "King",
            "A": "Ace"
        },
        "suits": {
            "S": "Spades",
            "D": "Diamonds",
            "C": "Clubs",
            "H": "Hearts"
        }
    };

    Cards.prototype.fnAddCard = function () {
        this.cards = [];
        var conf = this.conf, cardLength, deckIndex, suit, rank, jokerIndex;

        for (deckIndex = 0; deckIndex < conf.decks; deckIndex++) {
            for (suit in conf.suits) {
                for (rank in conf.ranks) {
                    cardLength = this.cards.length;
                    this.cards[cardLength] = new Cards.card(rank, conf.ranks[rank], suit, conf.suits[suit]);
                }
            }

            for (jokerIndex = 0; jokerIndex < conf.jokers; jokerIndex++) {
                cardLength = this.cards.length;
                this.cards[cardLength] = new Cards.card("N", conf.jokerText, (jokerIndex % 2) + 1, '');
            }
        }
    };

    Cards.prototype.fnShuffle = function (shuffle) {
        var cardLength = this.cards.length,
            randomIndex, tmp, shuffleIndex, cardIndex;

        shuffle = shuffle ? shuffle : 5;

        for (shuffleIndex = 0; shuffleIndex < shuffle; shuffleIndex++) {
            for (cardIndex = 0; cardIndex < cardLength; cardIndex++) {
                randomIndex = Math.floor(Math.random() * cardLength);
                tmp = this.cards[cardIndex];
                this.cards[cardIndex] = this.cards[randomIndex];
                this.cards[randomIndex] = tmp;
            }
        }
    };

    Cards.prototype.fnSortByRank = function () {
        this.cards.sort(fnCompareRank);
    };

    Cards.prototype.fnSortBySuit = function () {
        this.fnAddCard();
    };

    Cards.prototype.fnGetCards = function () {
        return this.cards;
    };

    Cards.card = function (rank, rankString, suit, suitString, conf) {
        if (!(this instanceof Cards.card)) {
            return new Cards.card(rank, rankString, suit, suitString, conf);
        }

        this.conf = fnObjExtend(Cards.card.defaults, conf);

        if (suit === undefined) {
            suit = rankString;
            rankString = Cards.defaults.ranks[rank];
            suitString = Cards.defaults.suits[suit];
        }

        this.rank = rank;
        this.rankString = rankString;
        this.suit = suit;
        this.suitString = suitString;
        return this;
    };

    Cards.card.defaults = {
        "singleFace": false
    };

    function fnObjExtend(obj, extendObj) {
        if (!extendObj) {
            return obj;
        }
        for (var exKey in extendObj) {
            obj[exKey] = extendObj[exKey];
        }
        return obj;
    }

    function fnCompareRank(a, b) {
        var intRegex = /^\d+$/;

        if (a.rank == b.rank)                       return 0;
        if (a.rank == "N")                          return 1;
        if (b.rank == "N")                          return -1;
        if (a.rank == "A")                          return 1;
        if (b.rank == "A")                          return -1;
        if (!isNaN(a.rank - b.rank))                return a.rank - b.rank;
        if (a.rank == "K" && b.rank == "J")         return 1;
        if (a.rank == "J" && b.rank == "K")         return -1;
        if (a.rank == "K" && b.rank == "Q")         return 1;
        if (a.rank == "Q" && b.rank == "K")         return -1;
        if (a.rank == "Q" && b.rank == "J")         return 1;
        if (a.rank == "J" && b.rank == "Q")         return -1;
        if (a.rank == "K" && intRegex.test(b.rank)) return 1;
        if (a.rank == "Q" && intRegex.test(b.rank)) return 1;
        if (a.rank == "J" && intRegex.test(b.rank)) return 1;
        if (intRegex.test(a.rank) && b.rank == "K") return -1;
        if (intRegex.test(a.rank) && b.rank == "Q") return -1;
        if (intRegex.test(a.rank) && b.rank == "J") return -1;
    }

})(this, this.document);