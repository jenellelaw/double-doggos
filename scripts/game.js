game = {
  // PROPERTIES
  remainingDogsToMatch: [], // has a duplicate of the DOM card elements
  card1: '',
  card2: '',
  matchedBreed: '',

  // METHODS
  renderCards() {
    const dogs = ['corgi', 'beagle', 'frenchie', 'schnauzer', 'retriever', 'samoyed', 'poodle', 'rottweiler'];

    this.remainingDogsToMatch = [...dogs] // create a duplicate array to subtract dog breeds from, everytime two cards match

    const doubleDogs = [...dogs].concat([...dogs]);

    this.shuffleArray(doubleDogs)

    doubleDogs.forEach((dog) => {
      const cardHTML = `<li class="card" tabindex="0" data-breed="${dog}"><div class="cardFront"> <img src="assets/dog-card-${dog}.svg" alt="${dog}"></div><div class="cardBack"></div></li>`;
      $('#gameGrid').append(cardHTML);
    });
  },
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  },
  flipCard(card) {
    card.addClass('flip');
  },
  saveCard(selectedCard) {
    if (selectedCard[0] === game.card1[0]) return;

    game.flipCard(selectedCard);

    if (!game.card1) {
      game.card1 = selectedCard;
      // console.log('Card 1')
      return;
    }

    game.lockGameBoard();

    game.card2 = selectedCard;
    this.checkForMatch();

    // if (!game.card1) {
    //   game.card1 = selectedCard;
    //   console.log('Card 1', game.card1, 'Card 2 has no data');
    // }
    // else {

    //   console.log('Card 1', game.card1, 'Card 2', game.card2);

    //   this.checkForMatch();


    // if (!game.card1) {
    //   game.card1 = selectedCard;
    //   console.log('Card 1', game.card1, 'Card 2 has no data');
    // }
    // else {
    //   if (game.card1[0] === selectedCard[0]) return;
    //   game.card2 = selectedCard;
    //   console.log('Card 1', game.card1, 'Card 2', game.card2);

    //   this.checkForMatch();

  },
  checkForMatch() {
    // Check if the breed of card1 and card2 match
    if (game.card1.data('breed') === game.card2.data('breed')) {
      console.log('THE TWO CARDS ARE MATCHING');
      game.card1.css("pointer-events", "none");
      game.card2.css("pointer-events", "none");
      this.removeBreedFromList();
      this.clearSavedCardsData();
      this.unlockGameBoard();
    } else {
      console.log('THE TWO CARDS DO NOT MATCH');

      setTimeout(function () {
        console.log('setTimeout happens here');
        game.card1.removeClass('flip');
        game.card2.removeClass('flip');

        setTimeout(function () {
          game.clearSavedCardsData();
          game.unlockGameBoard();
          console.log('END OF TRANSITION DETECTED');
        }, 500);

        // game.card1.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
        //   game.clearSavedCardsData();
        //   game.unlockGameBoard();
        //   console.log('END OF TRANSITION DETECTED');
        // });
      }, 1500);
    }
  },
  removeBreedFromList() {
    game.matchedBreed = game.card1.data('breed');

    console.log(game.matchedBreed);

    const breedIndex = game.remainingDogsToMatch.indexOf(game.matchedBreed);
    if (breedIndex > -1) { game.remainingDogsToMatch.splice(breedIndex, 1); }

    console.log(game.remainingDogsToMatch);

    if (game.remainingDogsToMatch.length === 0) {
      alert('You win!');
    }
  },
  clearSavedCardsData() {
    game.card1 = '';
    game.card2 = '';
  },
  lockGameBoard() {
    console.log('Game board LOCKED.')
    $('#gameGrid').off('click keypress');
  },
  unlockGameBoard() {
    console.log('Game board is UNLOCKED.');
    $('#gameGrid').on('click keypress', '.card', function (e) {
      game.saveCard($(this));
    });
  },

  // INIT METHOD
  init() {
    this.renderCards();
    this.unlockGameBoard();
  }
};

// DOCUMENT READY STARTS HERE

$(document).ready(function () {
  game.init();
  // DOCUMENT READY ENDS HERE
});


