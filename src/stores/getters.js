export default {
  currentCategory() {
    return this.game.category;
  },

  categoryName() {
    return this.currentCategory ? this.currentCategory.fullName : "";
  },

  card() {
    return this.currentCategory &&
      this.currentCategory.cards[this.game.cardIndex]
      ? this.currentCategory.cards[this.game.cardIndex]
      : false;
  },

  cardsNumber() {
    return this.currentCategory ? this.currentCategory.cards.length : 0;
  },
};
