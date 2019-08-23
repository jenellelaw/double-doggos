game = {
  // PROPERTIES
  remainingDogsToMatch: [], // has a duplicate of the DOM card elements
  card1: '',
  card2: '',
  matchedBreed: '',
  attempts: 0,
  dogFacts: {
    corgi: [
      `Corgi means dwarf dog in welsh and were originally used as herders`,
      `A Pembroke Welsh Corgi Named Rufus Was the Mascot for Amazon.`
    ],
    beagle: [
      `Beagle Means "Loudmouth" in French, as they are known for being very vocal, with barking, baying and howling.`,
      `The "Peanuts" character Snoopy is arguably the most famous fictitious Beagle. Snoopy was silent for the first few years of the comic strip, but later was given an active imagination and inner monologue.`
    ],
    frenchie: [
      `Frenchies can't swim due to their smushed faces, thick neck structures and short bodies.They need to give a lot of forces just to keep their heads above the water.`,
      `Frenchies aren’t not great on planes because their cute smushy - face causing breathing problems and cause their airways to collapse.`
    ],
    schnauzer: [
      `Schnauzer comes from the German word for muzzle, referring to the dog’s square snout and distinct facial hair.`,
      `Schnauzers are great all-around farm dogs and ratters which makes them fearless, but not aggressive.`
    ],
    retriever: [
      `Golden Retrievers are considered to be the 4th smartest dog breed (in line behind Border Collies, Poodles, and German Shepherds).`,
      `Golden Retrievers are known to become sad and even depressed when left alone for long periods of time. Experts say they shouldn't be left alone for more than seven hours!`,
      `Golden Retrievers are often used on search and rescue teams because of their keen sense of smell and tracking abilities. be left alone for more than seven hours!`
    ],
    samoyed: [
      `Samoyeds were ancient companions to Samoyed people who lived in Siberia. The working canines pulled sleds, hunted game, and herded reindeer.`,
      `Dubbed the “Sammy smile,” Samoyeds have lips that naturally curve upwards and always wear a happy expression.`
    ],
    poodle: [
      `Despite their French reputation, poodles hail from Germany, where they were called pudel, which is German for “puddle.`,
      `Unlike dogs that shed, the poodle will grow fur continuously, and therefore need regular grooming. If left ungroomed, their fur will become matted and dreadlock-like.`
    ],
    rottweiler: [
      `Rotties were herding dogs that almost became extinct in the 1800s due to industrialization, as their jobs became replaced by railroads which made it easier to transport herds.`,
      `Rottweilers have a more impressive bite than German shepherds and pit bulls. At a bite force of 328 pounds — that’s about half of a shark’s bite force, at 669 pounds.`
    ]
  },
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
  saveCard(selectedCard) {
    if (selectedCard[0] === game.card1[0]) return;

    selectedCard.addClass('flip');

    if (!game.card1) {
      game.card1 = selectedCard;
      return;
    }

    game.card2 = selectedCard;
    game.attempts++;
    console.log(game.attempts);

    game.lockGameBoard();
    game.checkCardsMatch();
  },
  checkCardsMatch() {
    if (game.card1.data('breed') === game.card2.data('breed')) {
      game.card1.css("pointer-events", "none").removeAttr('tabindex');
      game.card2.css("pointer-events", "none").removeAttr('tabindex');
      game.removeMatchedBreedFromList();
      game.showMatchedBreedFact();
      game.clearSavedCardsData();
      game.unlockGameBoard();
    } else {
      setTimeout(function () {
        game.card1.removeClass('flip');
        game.card2.removeClass('flip');

        setTimeout(function () {
          game.clearSavedCardsData();
          game.unlockGameBoard();
        }, 500); // 500ms is the amount of time needed for .removeClass('flip') transition to complete

      }, 1500); // let user look at not matching cards for 1500ms before removing the class
    }
  },
  removeMatchedBreedFromList() {
    game.matchedBreed = game.card1.data('breed');

    const breedIndex = game.remainingDogsToMatch.indexOf(game.matchedBreed);
    if (breedIndex > -1) { game.remainingDogsToMatch.splice(breedIndex, 1); }

    if (game.remainingDogsToMatch.length === 0) {
      alert('You win!');
    }
  },
  showMatchedBreedFact() {
    console.log(game.matchedBreed);
    const dogFactsArray = game.dogFacts[game.matchedBreed];
    console.log(dogFactsArray);
    const randomIndex = Math.floor(Math.random() * dogFactsArray.length);
    console.log('random index', randomIndex);

    const randomFact = dogFactsArray[randomIndex];
    console.log(randomFact);

    const factBreedName = `<h2 class="breedName">${game.matchedBreed}</h2>`;
    const factText = `<p class="breedFact">${randomFact}</p>`;
    const factImage = `<img src="" alt=""/>`;

    $('#factCard').html('');
    $('#factCard').append(factBreedName, factText, factImage);
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


