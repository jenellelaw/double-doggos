$(document).ready(function () {
  // DOCUMENT READY STARTS HERE

  // Game namespace
  const game = {
    dogCount: [], // has a duplicate of the DOM card elements
    renderCards() {
      const dogs = ['corgi', 'beagle', 'frenchie', 'schnauzer', 'retriever', 'samoyed', 'poodle', 'rottweiler'];

      this.dogCount = [...dogs]

      const doubleDogs = [...dogs].concat([...dogs]);

      // Shuffle doubleDogs - https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
      for (let i = doubleDogs.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [doubleDogs[i], doubleDogs[j]] = [doubleDogs[j], doubleDogs[i]];
      }

      doubleDogs.forEach((dog) => {
        const cardHTML = `<li class="card" tabindex="0" data-breed="${dog}"><div class="cardFront"> <img src="assets/dog-card-${dog}.svg" alt="${dog}"></div><div class="cardBack"></div></li>`;
        $('#gameGrid').append(cardHTML);
      });
    },
    populateCardArray() {
      this.cardArray = $('.card').toArray();
    },
    // INIT METHOD
    init() {
      this.renderCards();
      this.populateCardArray();
      console.log(this.cardArray);
    }
  };

  game.init();

  // General code goes here

  $('#gameGrid').on('click', 'li', function () {
    console.log("an item was clicked!");

    // when you select a card, remove the event listener from it (to prevent user from selecting it again)

    // if firstcard variable does not equal to null/nothing, then populate the second card


    // if the data attribute of the first card matches the second card, then we have a match
    // 

    // const firstCard = $(this);
    // const secondCard = $(this);

    // console.log(firstCard);

    // if firstCard === firstCard 
    // then populate secondCard



    // when item is clicked, add class of .selected
  });


  // DOCUMENT READY ENDS HERE
});


