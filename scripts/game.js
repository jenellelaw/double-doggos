game = {
  // PROPERTIES
  dogs: ['corgi', 'beagle', 'frenchie', 'schnauzer', 'retriever', 'samoyed', 'poodle', 'rottweiler'],
  card1: '',
  card2: '',
  matchedBreed: '',
  attemptedGuesses: 0,
  dogFacts: {
    corgi: [
      `Corgi means dwarf dog in welsh and were originally used as herders`,
      `A Pembroke Welsh Corgi named Rufus was the mascot for Amazon.`
    ],
    beagle: [
      `Beagle means "Loudmouth" in French, as they are known for being very vocal, with barking, baying and howling.`,
      `The "Peanuts" character Snoopy is arguably the most famous fictitious Beagle.<span> Snoopy was silent for the first few years of the comic strip, but later was given an active imagination and inner monologue.</span>`
    ],
    frenchie: [
      `Frenchies can't swim due to their smushed faces, thick neck structures and short bodies. <span>They need to give a lot of forces just to keep their heads above the water.</span>`,
      `Frenchies aren’t not great on planes because their smushy face makes them prone to breathing problems which could their airways to collapse.`
    ],
    schnauzer: [
      `Schnauzer comes from the German word for muzzle, referring to the dog’s square snout and distinct facial hair.`,
      `Schnauzers are great all-around farm dogs and ratters which makes them fearless, but not aggressive.`
    ],
    retriever: [
      `Golden Retrievers are considered to be the 4th smartest dog breed (in line behind Border Collies, Poodles, and German Shepherds).`,
      `Golden Retrievers are known to become sad and even depressed when left alone for long periods of time. <span>Experts say they shouldn't be left alone for more than seven hours!</span>`,
      `Golden Retrievers are often used on search and rescue teams because of their keen sense of smell and tracking abilities.`
    ],
    samoyed: [
      `Samoyeds were ancient companions to Samoyed people who lived in Siberia. The working canines pulled sleds, hunted game, and herded reindeer.`,
      `Dubbed the “Sammy smile,” Samoyeds have lips that naturally curve upwards and always wear a happy expression.`
    ],
    poodle: [
      `Despite their French reputation, poodles hail from Germany, where they were called pudel, which is German for “puddle.`,
      `Unlike dogs that shed, the poodle will grow fur continuously. If left ungroomed, their fur will become matted and dreadlock-like.`
    ],
    rottweiler: [
      `Rotties were herding dogs that almost became extinct in the 1800s due to industrialization<span>, as their jobs were replaced by railroads which made it easier to transport herds</span>.`,
      `Rottweilers have a bite force of 328 pounds, which is about half of a shark’s bite force, at 669 pounds.`
    ]
  },
  // METHODS
  renderCards() {
    const doubleDogs = [...game.dogs].concat([...game.dogs]);

    this.shuffleArray(doubleDogs)

    doubleDogs.forEach((dog) => {
      const capitalizedDogBreed = `${dog.charAt(0).toUpperCase()}${dog.substring(1)}`;

      const cardHTML = `<li class="card ${dog}" tabindex="0" data-breed="${dog}">
      
      <div class="cardFront"><img src="assets/img/dogHead/dogCard${capitalizedDogBreed}.svg" alt="${dog}"></div>

      <div class="cardBack"><img src="assets/img/cardBackPawprint.svg" alt="pawprint"</div>
      </li>`;

      $('#gameGrid').append(cardHTML);

    });

    $('#attemptCount').text(`Attempts: ${game.attemptedGuesses}`);
  },
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  },
  saveCard(selectedCard) {
    if (selectedCard[0] === game.card1[0]) return;

    selectedCard.addClass('flip');

    if (!game.card1) {
      game.card1 = selectedCard; return;
    }

    game.card2 = selectedCard;

    game.attemptedGuesses++;
    $('#attemptCount').text(`Attempts: ${game.attemptedGuesses}`);

    game.lockGameBoard();
    game.checkCardsMatch();
  },
  checkCardsMatch() {
    if (game.card1.data('breed') === game.card2.data('breed')) {

      $(game.card1.children()[0]).children().addClass('swing');
      $(game.card2.children()[0]).children().addClass('swing');

      game.card1.css('pointer-events', 'none').removeAttr('tabindex');
      game.card2.css("pointer-events", "none").removeAttr('tabindex');

      game.removeMatchedBreedFromList();
      game.showMatchedBreedFact();
      game.clearSavedCardsData();
      game.unlockGameBoard(); return
    } else {
      setTimeout(function () {
        game.card1.removeClass('flip');
        game.card2.removeClass('flip');
        game.clearSavedCardsData();
        game.unlockGameBoard();

        // setTimeout(function () {
        // }, 400);

      }, 1500); // let user look at not matching cards for 1500ms before removing the class
    }
  },
  removeMatchedBreedFromList() {
    game.matchedBreed = game.card1.data('breed');

    const breedIndex = game.dogs.indexOf(game.matchedBreed);
    if (breedIndex > -1) { game.dogs.splice(breedIndex, 1); }

    if (game.dogs.length === 0) {
      alert('You win!');
    }
  },
  showMatchedBreedFact() {
    const dogFactsArray = game.dogFacts[game.matchedBreed];
    const randomIndex = Math.floor(Math.random() * dogFactsArray.length);

    const randomFact = dogFactsArray[randomIndex];

    const capitalizedDogBreed = `${game.matchedBreed.charAt(0).toUpperCase()}${game.matchedBreed.substring(1)}`;

    const factText = `<div class="factBreedInfo"><h3 class="breedName" id="breedName">${game.matchedBreed}</h3><p class="breedFact">${randomFact}</p></div>`;
    const factImage = `<div class="factImg" id="factImg"><img src="assets/img/fullDog/fullDog${capitalizedDogBreed}.svg" alt="Illustration of ${game.matchedBreed}"/></div>`;

    const factCard = $('<div class="factCard"></div>');
    factCard.append(factText, factImage);

    if (game.dogs.length === (game.dogs.length - 1)) {
      $('#introCard').fadeOut(200);
      setTimeout(() => {
        $('#factContainer').append(factCard);
        // $('#factCard').addClass('fadeInAfter');
      }, 200);
    }

    $('#factContainer').html(factCard);
  },
  clearSavedCardsData() {
    game.card1 = '';
    game.card2 = '';
  },
  lockGameBoard() {
    // console.log('Game board LOCKED.')
    $('#gameGrid').off('click keypress');
  },
  unlockGameBoard() {
    // console.log('Game board is UNLOCKED.');
    $('#gameGrid').on('click keypress', '.card', function (e) {
      game.saveCard($(this));
    });
  },

  // INIT METHOD
  init() {
    game.renderCards();
    game.unlockGameBoard();
  }
};


// DOCUMENT READY STARTS HERE
$(document).ready(function () {
  game.init();
  // DOCUMENT READY ENDS HERE
});


