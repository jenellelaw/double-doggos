game = {
  dogs: ['corgi', 'beagle', 'frenchie', 'schnauzer', 'retriever', 'samoyed', 'poodle', 'rottweiler'],
  dogsLeftToMatch: [],
  card1: '',
  card2: '',
  matchedBreed: '',
  attemptedGuesses: 0,
  dogFacts: {
    corgi: [
      `Corgi means "dwarf dog" in Welsh and was originally a cattle herding dog breed which originated in Pembrokeshire, Wales.`,
      `The unofficial mascot of Amazon.com is a Pembroke corgi named Rufus, who became a central character of Amazon's "404" error page.`
    ],
    beagle: [
      `Beagle means "Loudmouth" in French, as they are known for being very vocal, with barking, baying and howling.`,
      `The "Peanuts" character Snoopy is arguably the most famous fictitious Beagle.<span> Snoopy was silent for the first few years of the comic strip, but later was given an active imagination and inner monologue.</span>`
    ],
    frenchie: [
      `Frenchies can't swim due to their smushed faces, thick neck structures and short bodies. <span>They need to use great amounts of energy just to keep their heads above the water.</span>`,
      `Frenchies aren’t not great on planes because their smushed face makes them prone to breathing problems which could their airways to collapse.`
    ],
    schnauzer: [
      `Schnauzer comes from the German word for muzzle, which refers to the dog’s square snout and distinct facial hair.`,
      `Schnauzers are great all-around farm dogs and ratters, which makes them fearless but not aggressive.`
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
      `Despite their French reputation, Poodles hail from Germany, where they were called pudel, which is German for “puddle.`,
      `Unlike dogs that shed, the poodle will grow fur continuously. If left ungroomed, their fur will become matted and dreadlock-like.`
    ],
    rottweiler: [
      `Rotties were herding dogs that almost became extinct in the 1800s due to industrialization<span>, as their jobs were replaced by railroads which made it easier to transport herds</span>.`,
      `Rottweilers have a bite force of 328 pounds, which is about half of a shark’s bite force, at 669 pounds.`
    ]
  },

  // METHODS START HERE
  renderGame() {
    $('#gameArea').removeClass('fadeOutEl');

    // Activate functionality of 'Play Now' button on home screen
    $('#playNow').on('click keypress', () => {
      $('#playNow').addClass('pressDown');
      setTimeout(() => {
        $('#playNow').removeClass('pressDown');
        setTimeout(() => {
          $('header').addClass('slideUp');
        }, 500);
      }, 300);
    });

    // Set up winning message
    const winningMessageContainer = `<div class="winningMessageContainer" id="winningMessageContainer">
    <div class="winningMessage" id="winningMessage">
    <p>Congrats!</p>
    <p>You've matched all the doggos!</p>
    <button class="playAgain" id="playAgain" tabindex="0">Play again</button>
    </div>
    <div class="winningCardOverlay" id="winningCardOverlay"></div>
    </div>`;
    $('#gameGrid').append(winningMessageContainer);

    // Set up dog memory cards
    game.dogsLeftToMatch = [...game.dogs];
    const doubleDogs = [...game.dogs].concat([...game.dogs]);
    this.shuffleArray(doubleDogs);

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
      game.unlockGameBoard();
      return;
    }

    setTimeout(function () {
      game.card1.removeClass('flip');
      game.card2.removeClass('flip');
      setTimeout(() => {
        game.clearSavedCardsData();
        game.unlockGameBoard();
      }, 300);
    }, 1200); // let user look at non-matching card pair for 1500ms
  },
  removeMatchedBreedFromList() {
    game.matchedBreed = game.card1.data('breed');

    const breedIndex = game.dogsLeftToMatch.indexOf(game.matchedBreed);
    if (breedIndex > -1) { game.dogsLeftToMatch.splice(breedIndex, 1); }

    if (game.dogsLeftToMatch.length === 0) {

      $('#playAgain').on('click keypress', function () {
        $(this).addClass('pressDown');

        setTimeout(() => {
          $(this).removeClass('pressDown');
          game.resetGame();
        }, 300);
      });

      setTimeout(() => {
        $('#winningMessageContainer').css('visibility', 'visible');
        $('#winningCardOverlay').addClass('overlayFadeIn');
        $('#winningMessage').addClass('bounceIn');
      }, 1000);
    }
  },
  showMatchedBreedFact() {
    const dogFactsArray = game.dogFacts[game.matchedBreed];
    const randomIndex = Math.floor(Math.random() * dogFactsArray.length);

    const randomFact = dogFactsArray[randomIndex];

    const capitalizedDogBreed = `${game.matchedBreed.charAt(0).toUpperCase()}${game.matchedBreed.substring(1)}`;

    const factText = `<div class="factInfo"><h3 class="breedName" id="breedName">${game.matchedBreed}</h3><p class="breedFact">${randomFact}</p></div>`;
    const factImage = `<div class="factImg" id="factImg"><img src="assets/img/fullDog/fullDog${capitalizedDogBreed}.svg" alt="Illustration of ${game.matchedBreed}"/></div>`;

    const factCard = $('<div class="factCard"></div>');
    factCard.append(factText, factImage);

    $('#factContainer').addClass('fadeOutEl');

    setTimeout(() => {
      $('#factContainer').html('');
      $('#factContainer').append(factCard);
      $('#factContainer').removeClass('fadeOutEl');
    }, 600)
  },
  clearSavedCardsData() {
    game.card1 = '';
    game.card2 = '';
  },
  lockGameBoard() {
    $('#gameGrid').off('click keypress');
  },
  unlockGameBoard() {
    $('#gameGrid').on('click keypress', '.card', function (e) {
      game.saveCard($(this));
    });
  },
  resetGame() {
    game.renderGame();
    game.card1 = '';
    game.card2 = '';
    game.matchedBreed = '';
    game.attemptedGuesses = 0;

    $('#gameArea').addClass('fadeOutEl');
    $('#gameGrid').html('');
    $('#factContainer').addClass('fadeOutEl');

    setTimeout(() => {
      $('#factContainer').html('');
      const introCard = `<div class="introCard" id="introCard"> <p class="instructions">Flip the cards to find each matching doggo and to reveal a fun fact!</p></div>`;
      $('#factContainer').append(introCard);
      $('#factContainer').removeClass('fadeOutEl');
      game.renderGame();
      game.unlockGameBoard();
    }, 1000);
  },
  konami() {
    // Taken from https://codepen.io/kmaida/pen/oCkpt?editors=1010
    let konamikeys = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
      started = false,
      count = 0;

    $('body').keydown(function (e) {
      let reset = function () {
        started = false;
        count = 0;
        return;
      };

      key = e.keyCode;

      // Begin watching if first key in sequence was pressed.
      if (!started) {
        if (key == 38) {
          started = true;
        }
      }

      // If we've started, pay attention to key presses, looking for right sequence.
      if (started) {
        if (konamikeys[count] == key) {
          count++;
        } else {
          // Incorrect key, restart.
          reset();
        }
        if (count == 10) {
          // Success!
          $('.cardFront').css('backface-visibility', 'visible');
          $('.cardBack').css('display', 'none');
          reset();
        }
      } else {
        reset();
      }
    });
  },
  checkScreenWidth() {
    if ($('header').width() < 480) {
      $('.homeImg').attr('src', 'assets/img/homeDog/homeDogsMobile.svg');
      $('.homeImg').attr('alt', 'Illustrations of four different dog breeds (from left to right) - Rottweiler, Samoyed, Beagle and Frenchie.');
    } else if ($('header').width() < 940) {
      $('.homeImg').attr('src', 'assets/img/homeDog/homeDogsTablet.svg');
      $('.homeImg').attr('alt', 'Illustrations of six different dog breeds (from left to right) - Rottweiler, Samoyed, Beagle, Corgi, Frenchie and Schnauzer.');
    }

    $(window).resize(function () {
      if ($('header').width() < 480) {
        $('.homeImg').attr('src', 'assets/img/homeDog/homeDogsMobile.svg');
        $('.homeImg').attr('alt', 'Illustrations of four different dog breeds (from left to right) - Rottweiler, Samoyed, Beagle and Frenchie.');
      } else if ($('header').width() < 940) {
        $('.homeImg').attr('src', 'assets/img/homeDog/homeDogsTablet.svg');
        $('.homeImg').attr('alt', 'Illustrations of six different dog breeds (from left to right) - Rottweiler, Samoyed, Beagle, Corgi, Frenchie and Schnauzer.');
      } else if ($('header').width() > 940) {
        $('.homeImg').attr('src', 'assets/img/homeDog/homeDogsDesktop.svg');
        $('.homeImg').attr('alt', 'Illustrations of eight different dog breeds (from left to right) - Rottweiler, Samoyed, Retriever, Poodle, Beagle, Corgi, Frenchie and Schnauzer.');
      }
    });
  },
  // INIT
  init() {
    game.checkScreenWidth();
    game.konami();
    game.renderGame();
    game.unlockGameBoard();
  }
}

// DOCUMENT READY STARTS HERE
$(document).ready(function () {
  game.init();
  // DOCUMENT READY ENDS HERE
});
