game = {
  // PROPERTIES
  remainingDogsToMatch: [], // has a duplicate of the DOM card elements
  card1: '',
  card2: '',
  matchedBreed: '',

  // METHODS
  renderCards() {
    const dogs = ['corgi', 'beagle', 'frenchie', 'schnauzer', 'retriever', 'samoyed', 'poodle', 'rottweiler'];

    this.remainingDogsToMatch = [...dogs]

    const doubleDogs = [...dogs].concat([...dogs]);

    // Shuffle Dog Array
    for (let i = doubleDogs.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [doubleDogs[i], doubleDogs[j]] = [doubleDogs[j], doubleDogs[i]];
    }

    doubleDogs.forEach((dog) => {
      const cardHTML = `<li class="card" tabindex="0" data-breed="${dog}"><div class="cardFront"> <img src="assets/dog-card-${dog}.svg" alt="${dog}"></div><div class="cardBack"></div></li>`;
      $('#gameGrid').append(cardHTML);
    });
  },

  // INIT METHOD
  init() {
    this.renderCards();
  }
};


// DOCUMENT READY STARTS HERE

$(document).ready(function () {

  game.init();

  // EVENT LISTENERS

  // Event delegation for each card element because they are dynamically generated
  $('#gameGrid').on('click', '.card', function () {
    // Add card flip animation to show user that the card they clicked on has been selected
    $(this).addClass('flip');

    // if there is no data saved in card1
    if (!game.card1) {
      game.card1 = $(this);
      console.log('Card 1', game.card1, 'Card 2', game.card2);

      // if there is data saved in card1, but no data in card2
    } else if (game.card1 && !game.card2) {
      game.card2 = $(this);
      console.log('Card 1', game.card1, 'Card 2', game.card2);

      // Check if the breed of card1 and card2 match
      if (game.card1.data('breed') === game.card2.data('breed')) {
        console.log('THE TWO CARDS ARE MATCHING')

        // refactor this into a function that removes the breed from the list
        game.matchedBreed = game.card1.data('breed');
        const breedIndex = game.remainingDogsToMatch.indexOf(game.matchedBreed);
        if (breedIndex > -1) { game.remainingDogsToMatch.splice(breedIndex, 1); }

        console.log(game.remainingDogsToMatch);

        if (game.remainingDogsToMatch.length === 0) {
          alert('You win!');
        }

        // create a function to clear the saved cards
        game.card1 = '';
        game.card2 = '';

      } else {
        console.log('THE TWO CARDS DO NOT MATCH')

        setTimeout(function () {
          game.card1.removeClass('flip');
          game.card2.removeClass('flip');
          // create a function to clear the saved cards
          game.card1 = '';
          game.card2 = '';
        }, 1000);
      }
    }


    // disableCardSelect function






    // When a card has been selected, remove the click listener from it, so it doesn't get selected again


    // if firstcard variable does not equal to null/nothing, then populate the second card
  });


  // DOCUMENT READY ENDS HERE
});


