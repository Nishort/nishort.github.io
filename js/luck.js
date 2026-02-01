class PokerGame {
  constructor() {
    this.cards = [];
    this.flippedCount = 0;
    this.gameActive = true;
    this.initElements();
    this.initGame();
    this.setupEventListeners();
  }

  initElements() {
    this.cardElements = document.querySelectorAll('.card');
    this.resultMessage = document.getElementById('resultMessage');
    this.resetBtn = document.getElementById('resetBtn');
  }

  initGame() {
    this.generateHand();
    this.resetUI();
  }

  generateHand() {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    
    this.cards = [];
    const usedCards = new Set();
    
    while (this.cards.length < 5) {
      const suit = suits[Math.floor(Math.random() * 4)];
      const value = values[Math.floor(Math.random() * 13)];
      const cardKey = `${suit}_${value}`;
      
      if (!usedCards.has(cardKey)) {
        usedCards.add(cardKey);
        this.cards.push({
          suit: suit,
          value: value,
          image: `./img/cards/${cardKey}.png`
        });
      }
    }
  }

  resetUI() {
    this.cardElements.forEach((cardEl, index) => {
      cardEl.classList.remove('flipped');
      const front = cardEl.querySelector('.card-front');
      front.style.backgroundImage = `url('${this.cards[index].image}')`;
    });
    
    this.flippedCount = 0;
    this.gameActive = true;
    this.resultMessage.textContent = 'Click cards and try your luck';
    this.resetBtn.style.display = 'none';
  }

  setupEventListeners() {
    this.cardElements.forEach(cardEl => {
      cardEl.addEventListener('click', () => this.handleCardClick(cardEl));
    });
    
    this.resetBtn.addEventListener('click', () => this.initGame());
  }

  handleCardClick(cardEl) {
    if (!this.gameActive || cardEl.classList.contains('flipped')) return;
    
    const index = parseInt(cardEl.dataset.index);
    
    cardEl.classList.add('flipped');
    this.flippedCount++;
    
    if (this.flippedCount === 5) {
      setTimeout(() => this.evaluateHand(), 600);
    }
  }

  evaluateHand() {
    const handName = this.getHandName();

    let audioPath = './audio/neco/'
    switch(handName) {
      case 'High Card':
        audioPath += 'necoarc-mudamuda.mp3'; break;
      case 'One Pair':
        audioPath += 'necoarc-nyeh6.mp3'; break;
      case 'Two Pairs':
        audioPath += 'necoarc-mmmm2.mp3'; break;
      case 'Three of a Kind':
      case 'Straight':
        audioPath += 'necoarc-boku.mp3'; break;
      case 'Flush':
      case 'Full House':
        audioPath += 'necoarc-burenya.mp3'; break;
      case 'Four of a Kind':
      case 'Straight Flush':
        audioPath += 'necoarc-winnig.mp3'; break;
    }

    const audio = new Audio(audioPath)
    audio.play()

    this.resultMessage.textContent = handName;
    //this.resetBtn.style.display = 'block';
    this.gameActive = false;
  }

  getHandName() {
    const valueCounts = {};
    const suitCounts = {};
    
    this.cards.forEach(card => {
      valueCounts[card.value] = (valueCounts[card.value] || 0) + 1;
      suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1;
    });
    
    const values = Object.keys(valueCounts);
    const suits = Object.keys(suitCounts);
    const counts = Object.values(valueCounts);
    
    const isFlush = suits.length === 1;
    const isStraight = this.isStraight(values);
    
    if (isFlush && isStraight) return 'Straight Flush';
    if (counts.includes(4)) return 'Four of a Kind';
    if (counts.includes(3) && counts.includes(2)) return 'Full House';
    if (isFlush) return 'Flush';
    if (isStraight) return 'Straight';
    if (counts.includes(3)) return 'Three of a Kind';
    if (counts.filter(c => c === 2).length === 2) return 'Two Pairs';
    if (counts.includes(2)) return 'One Pair';
    
    return 'High Card';
  }

  isStraight(values) {
    const valueOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const indices = values.map(v => valueOrder.indexOf(v)).sort((a, b) => a - b);
    
    if (indices.length !== 5) return false;
    
    for (let i = 1; i < indices.length; i++) {
      if (indices[i] !== indices[i - 1] + 1) {
        return false;
      }
    }
    
    return true;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PokerGame();
});