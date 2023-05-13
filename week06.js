//WARRRR!!!

//What properties will the player have? (name, hand to hold their cards, score)
class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
        this.score = 0;
    }
}

//What properties does a card have? (suit, value, rank?)
class Card {
    constructor(suit, name, value) {
        this.suit = suit;
        this.name = name;
        this.value = value;
    }
}

//Deck class - needs 52 cards, with suits and ranks.
class Deck {
    constructor() {
        this.deck = [];
        this.cards = [];
        this.suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
        this.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
    }

    createDeck() {
        console.log('Create new deck');
        for (let i = 0; i < this.suits.length; i++) {
            for (let n = 0; n < this.ranks.length; n++) {
                const card = new Card(this.suits[i], this.ranks[n], `${this.ranks[n]} of ${this.suits[i]}`);
                this.deck.push(card);
            }
        }
    }

//Shuffle deck using the Fisher-Yates method. The Fisher-Yates shuffle algorithm works by iterating through the array 
//from the end to the beginning and swapping each element with a random element that comes before it. 
    shuffleDeck() {
        console.log('Shuffling the Deck')
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
        return this.deck;
    }

//In this method, we have two players that we are going to deal 26 cards to each player, splitting the deck evenly. 
    dealDeck(players, deck) {
        console.log('Dealing Cards');
        this.cards = deck.slice(); // make a copy of the deck to deal
        let dealingCards1 = this.cards.splice(0, 26);
        players[0].hand.push(...dealingCards1);
        let dealingCards2 = this.cards.splice(0, 26);
        players[1].hand.push(...dealingCards2);
    }
}

//Now we create the game of War! This is the starting point of the game. 
class War {
    constructor() {
        this.players = [];
    }

//Start the game. We create two player objects and push them into the players array. Next, the Deck class is instantiated and a new deck is created using the createDeck and shuffleDeck methods. 
//Then, the shuffled cards are dealt to the players using the dealDeck method. 
    declareWar() {
        this.players.push(new Player('Griffyndor'));
        this.players.push(new Player('Slytherin'));
        console.log('War were declared!', this.players);

        let myDeck = new Deck();
        myDeck.createDeck();
        let shuffledDeck = myDeck.shuffleDeck();

        myDeck.dealDeck(this.players, shuffledDeck);

        this.playWar();

        this.endWar();
    }

//This is the main loop of the game. Two player variables are initialized, as well as variables to keep track of the round winner, turns, and cards. 
//The loop will run as long as players have cards in their hands. The pop method is used to play a card and the number of turns is incremented by 1 until one player runs out of cards. 
    playWar() {
        console.log('War were declared!');
        let player1 = this.players[0];
        let player2 = this.players[1];

        let roundWinner = '';
        let turn = 0;

        while (player1.hand.length !== 0 && player2.hand.length !== 0) {
            let player1Card = player1.hand.pop();
            let player2Card = player2.hand.pop();
            if (player1Card.value > player2Card.value) {
                roundWinner = player1.name;
                player1.score += 1;
                console.log('Round: ', (turn += 1), '\nPlayer1 card: ', player1Card.name, ' of ', player1Card.suit, '\nPlayer 2 card: ', player2Card.name, ' of ', player2Card.suit);
            } else {
                roundWinner = player2.name;
                player2.score += 1;
                console.log('Round: ', (turn += 1), '\nPlayer1 card: ', player1Card.name, ' of ', player1Card.suit, '\nPlayer 2 card: ', player2Card.name, ' of ', player2Card.suit);
            }
        }
    }

//The end war method is called when the game has ended and it determins the winner. A victory alert will be displayed with the winner or a game over alert will be displayed if it is a tie. 
    endWar() {
        let victor = '';
        let player1 = this.players[0];
        let player2 = this.players[1];
        let victorScore = 0;

        if (player1.score > player2.score) {
            victor = player1.name;
            victorScore = player1.score;
            alert('Victory goes to Player1!')
        } else if (player2.score > player1.score) {
            victor = player2.name;
            victorScore = player2.score;
            alert('Victory goes to Player2!')
        } else {
            alert('Game Over!')
        }
    }
}

let war = new War();
war.declareWar();



