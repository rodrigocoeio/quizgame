<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <button class="btn btn-primary StartGame" @click="startGame" v-if="cover">Start Game</button>

            <!-- Navbar -->
            <div class="collapse navbar-collapse" id="navbarSupportedContent" v-if="!cover">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <!-- Category Name -->
                    <li class="nav-item CategoryName" :title="categoryName">
                        <img src="/images/quizgame.jpg" width="44" />
                        <span>{{ categoryName }}</span>
                    </li>

                    <!-- Previous Card -->
                    <li class="nav-item">
                        <button id="previousCardButton" class="PreviousCardButton" :disabled="cardIndex == 0"
                            @click="previousCard">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                                <path
                                    d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                            </svg>
                            Previous
                        </button>
                    </li>

                    <li class="CardIndex nav-item">
                        {{ cardsNumber > 0 ? cardIndex + 1 : 0 }} / {{ cardsNumber }}
                    </li>

                    <!-- Next Card -->
                    <li class="nav-item">
                        <button id="nextCardButton" class="btn btn-success" :disabled="((cardIndex + 1) >= cardsNumber)"
                            @click.stop.prevent="nextCard">
                            Next
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                <path
                                    d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                            </svg>
                        </button>
                    </li>
                </ul>

                <ul class="nav navbar-nav navbar-right">
                    <!-- Audio Button -->
                    <!-- <li class="nav-item">
                        <button id="audioButton" title="Press A S or Space" :class="[game.audio ? 'opened' : '']"
                            :disabled="!card.audio" @click="playAudio">
                            <img src="/images/audio.png" height="36">
                        </button>
                    </li> -->

                    <!-- Image Button -->
                    <!-- <li class="nav-item">
                        <button id="imageButton" title="Press I or P" :class="[game.image ? 'opened' : '']"
                            :disabled="!card.image" @click="toggleImage">
                            <img src="/images/picture.png" height="36">
                        </button>
                    </li> -->

                    <!-- Name Button -->
                    <li class="nav-item">
                        <button id="textButton" title="Press N" :class="[game.text ? 'opened' : '']"
                            @click="toggleText">
                            <img src="/images/text.png" height="24">
                        </button>
                    </li>

                    <!-- Translation Button -->
                    <!-- <li class="nav-item">
                        <button id="translationButton" title="Press T" :class="[game.translation ? 'opened' : '']"
                            :disabled="!card.translation" @click="toggleTranslation">
                            <img src="/images/translation.png" height="36">
                        </button>
                    </li> -->

                    <!-- Quit Game -->
                    <li class="nav-item">
                        <button class="QuitGameButton" @click="quitGame">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                class="bi bi-x-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path
                                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                            Quit Game
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import store from "$/store";

export default {
    computed: {
        game() {
            return store.game;
        },

        categoryName() {
            if (store.game.category)
                return store.game.category.name;
        },

        cover() {
            return store.game.cover;
        },

        card() {
            return store.card;
        },

        cards() {
            return store.cards;
        },

        cardIndex() {
            return store.game.cardIndex;
        },

        cardsNumber() {
            return store.cardsNumber;
        }
    },

    watch: {
        card(card) {
            this.playAudio();
        }
    },

    methods: {
        playAudio() {
            //$("#audioButton").trigger("blur");
            store.playCardAudio();
        },

        toggleText() {
            //$("#textButton").trigger("blur");
            store.game.text = !store.game.text;
        },

        previousCard() {
            //$("#previousCardButton").trigger("blur");
            store.previousCard();
        },

        nextCard() {
            //$("#nextCardButton").trigger("blur");
            store.nextCard();
        },

        startGame() {
            store.game.cover = false;
        },

        quitGame() {
            store.quitGame();
        }
    },
};
</script>

<style scoped>
nav {
    margin: 0px;
}

nav * {
    display: inline-block;
}

nav ul {
    margin: 0px;
    margin-bottom: 10px;
    list-style: none;
}

button {
    padding: 7px;
    font-size: 24px;
    border-radius: 15px;
    cursor: pointer;
    margin-left: 0px;
}

button:not([disabled]):hover {
    background-color: chartreuse;
    text-shadow: white 3px 0 10px;
    box-shadow: 3px 3px gray;
}

button * {
    vertical-align: middle;
}

.opened {
    background-color: aquamarine;
}

.PreviousCardButton:not([disabled]):hover {
    background-color: yellow;
}

.QuitGameButton:not([disabled]):hover {
    background-color: crimson;
}

.StartGame {
    margin: auto;
    margin-top: 15px;
}

.CategoryName span {
    font-size: 28px;
    font-weight: bolder;
    padding-left: 15px;
    padding-right: 15px;
}

.CategoryName img {
    position: relative;
    top: 10px;
}

.CardIndex {
    font-size: 24px;
}

.nav-item {
    margin-left: 10px;
}
</style>