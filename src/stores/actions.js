export default {
  startGame() {
    if (
      !this.currentCategory ||
      !this.currentCategory.cards ||
      this.currentCategory.cards.length === 0
    ) {
      store.game.pleaseSelectCategory = true;
      return false;
    }

    console.log("Game Started");

    this.game.started = true;
    this.game.cardIndex = 0;
    this.game.cover = this.currentCategory.cover;
    this.game.category.cards = this.shuffleCards(this.game.category.cards);
  },

  quitGame() {
    if (this.game.audio) this.stopAudio();

    this.game.started = false;
  },

  async loadCategories() {
    try {
      const categoriesJson = await fetch("/cards/categories.json");
      this.categories = await categoriesJson.json();
    } catch (e) {
      //console.error('Failed loading categories.json!');
    }
  },

  playCardAudio(card) {
    this.stopAudio();

    const store = this;
    card = card ? card : this.card;

    const audioFile = "/cards/" + card.parent + "/" + card.audio;

    if (card.audio) {
      this.game.audio = playAudio(audioFile);
      this.game.audio.onended = function () {
        store.game.audio = false;
      };
    }
  },

  stopAudio() {
    if (this.game.audio) {
      this.game.audio.pause();
      this.game.audio = false;
    }
  },

  selectCategory(category) {
    if (category && category.cards) {
      category.cards = this.shuffleCards(category.cards);

      store.game.pleaseSelectCategory = false;
      this.game.category = category;
    }
  },

  shuffleCards(cards) {
    switch (this.game.cardSorting) {
      case "alpha":
        cards = sortByKey(cards, "name", "asc");
        break;

      case "number":
        cards = sortByKey(cards, "number", "asc");
        break;

      case "shuffle":
        cards = shuffleArray(cards);
        break;
    }

    return cards;
  },

  previousCard() {
    if (this.game.audio) this.stopAudio();

    if (this.game.cardIndex > 0) {
      this.game.image = false;
      this.game.name = false;
      this.game.translation = false;
      this.game.cardIndex--;
    }
  },

  nextCard() {
    if (this.game.audio) this.stopAudio();

    if (this.game.cardIndex + 1 < this.cardsNumber) {
      this.game.image = false;
      this.game.name = false;
      this.game.translation = false;
      this.game.cardIndex++;
    }
  },

  try(answer) {
    if(this.card.answer==answer)
    {
      this.game.audio = playAudio("/audios/right.mpeg");
      return true;
    } else {
      this.game.audio = playAudio("/audios/wrong.mpeg");
      return false;
    }
  }
};
