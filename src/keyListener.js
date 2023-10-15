import store from "$/store";

const listenKeyBoardEvents = function (e) {
  if (store.game.started) {
    // Open Next on Enter
    if (e.keyCode == 13) {
      if (store.game.cover) return (store.game.cover = false);
      if (store.card.image && !store.game.image)
        return (store.game.image = true);
      if (store.card.name && !store.game.name) return (store.game.name = true);
      if (store.card.translation && !store.game.translation)
        return (store.game.translation = true);

      return store.nextCard();
    }

    // Close on Backspace
    if (e.keyCode == 8) {
      if (store.card.translation && store.game.translation)
        return (store.game.translation = false);
      if (store.card.name && store.game.name) return (store.game.name = false);
      if (store.card.image && store.game.image)
        return (store.game.image = false);

      return store.previousCard();
    }

    // Play sound
    if (e.keyCode == 65 || e.keyCode == 83) {
      return store.playCardAudio();
    }

    // Toggle Image
    if (e.keyCode == 73 || e.keyCode == 80) {
      return store.toggleCardImage();
    }

    // Toggle Name
    if (e.keyCode == 78) {
      return store.toggleCardName();
    }

    // Toggle Translation
    if (e.keyCode == 84) {
      return store.toggleCardTranslation();
    }

    // Play card audio on space
    if (e.keyCode == 32) {
      if (store.game.cover) return store.playCardAudio(store.game.cover);
      store.playCardAudio();
    }

    // Previous card on left arrow
    if (e.keyCode == 37) {
      store.previousCard();
    }

    // Next card on right arrow
    if (e.keyCode == 39) {
      store.nextCard();
    }

    // Quit Game on Esc
    if (e.keyCode == 27) {
      store.quitGame();
    }
  } else {
    if (e.keyCode == 13) {
      store.startGame();
    }
  }
};

window.addEventListener("keydown", listenKeyBoardEvents);
