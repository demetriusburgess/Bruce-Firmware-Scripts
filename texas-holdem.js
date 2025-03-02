// texas_holdem.js

// Define deck with ranks and suits
var ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
var suits = ['♠', '♥', '♦', '♣'];
var deck = [];

// Initialize deck
function createDeck() {
    deck = [];
    for (var i = 0; i < ranks.length; i++) {
        for (var j = 0; j < suits.length; j++) {
            deck.push({ rank: ranks[i], suit: suits[j] });
        }
    }
}

// Shuffle deck using Fisher-Yates shuffle
function shuffleDeck() {
    for (var i = deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

// Deal cards (2 hole cards per player, 5 community cards)
var playerCards = [];
var communityCards = [];

function dealCards() {
    playerCards = [deck.pop(), deck.pop()]; // Two hole cards
    communityCards = [deck.pop(), deck.pop(), deck.pop(), deck.pop(), deck.pop()]; // Five community cards
}


function drawCard(rank, suit, x, y) {
    var width = 50;
    var height = 80;
    var borderColor = 200; // Black border
    var bgColor = 0; // White card background
    var textColor = (suit == '♥' || suit == '♦') ? 100 : 0; // Red for hearts/diamonds, Black otherwise
    
    // Draw card background
    drawFillRect(x, y, width, height, bgColor);

    // Draw card border
    drawRect(x, y, width, height, borderColor);

    // Draw suit and rank at top-left
    drawString(rank, x + 5, y + 5, 2, textColor, bgColor);
    drawString(suit, x + 5, y + 20, 2, textColor, bgColor);

    // Draw suit and rank at bottom-right (mirrored)
    drawString(rank, x + width - 15, y + height - 25, 2, textColor, bgColor);
    drawString(suit, x + width - 15, y + height - 10, 2, textColor, bgColor);
}

function dealGame() {
    fillScreen(0);
    createDeck();
    shuffleDeck();
    dealCards();
    
    // Draw player's hole cards
    drawCard(playerCards[0].rank, playerCards[0].suit, 5, 100);
    drawCard(playerCards[1].rank, playerCards[1].suit, 65, 100);
    
    // Draw community cards (Flop, Turn, River)
    for (var i = 0; i < 5; i++) {
        drawCard(communityCards[i].rank, communityCards[i].suit, 5 + (i * 60), 5);
    }
}

function main() {
    var run = true;
    
    while (run) {
        delay(100);
        
        if (getSelPress()) {
            // run = false;
            dealGame();
        }

        if (getPrevPress()) {
            run = false;
        }
    }
}

main();