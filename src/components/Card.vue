<template>
    <div class="CardBox">
        <div class="Card">

            <div class="CardText">
                <button class="Audio" @click="playCard"><img src="/images/audio.png" /></button>
                <h1>{{ card.question }}</h1>
            </div>

            <div class="Options">
                <div v-for="option,index in options">
                    <button class="Audio" v-if="option.audio" @click="playOption(option)"><img
                            src="/images/audio.png" /></button>
                    <button @click="tryAnswer(index,option)" :class="option.classes">
                        ({{ letters[(option.index-1)] }}) {{ option.text }}
                    </button>
                </div>
            </div>

        </div>

        <div class="CardImage" v-if="card.image">
            <!-- Card Image -->
            <img :src="image" @click="playCard" class="CardImage">
        </div>

    </div>
</template>

<script>
import store from "$/store.js";

export default {
    data() {
        let options = store.card.options.map(option => {
            return {
                classes: ['Option'],
                ...option
            };
        });
        return {
            options: options,
            letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
        };
    },

    computed: {
        game() {
            return store.game;
        },

        currentCategory() {
            return store.currentCategory;
        },

        card() {
            return store.card;
        },

        image() {
            return "/cards/" + this.card.parent + "/" + this.card.image;
        },

        cards() {
            return store.currentCategory ? store.currentCategory.cards : [];
        },

        cardIndex() {
            return store.game.cardIndex;
        }
    },

    mounted() {
        this.playCard();
    },

    methods: {
        playOption(option) {
            store.playOption(option);
        },

        playCard() {
            store.playCardAudio();
        },

        quitGame() {
            return store.quitGame();
        },

        tryAnswer(index,option) {
            let tryOption = store.try(option);
            this.options[index].classes.push(tryOption ? "Right" : "Wrong");
            console.log(option);
        }
    },
}
</script>

<style scoped>
.Audio {
    display: block;
    float: left;
    padding: 0px;
    height: 46px;
    font-size: 24px;
    font-weight: bold;
    border-radius: 50px;
    cursor: pointer;
    margin-left: 0px;
    margin-right: 15px;
    margin-bottom: 15px;
    z-index: 15;
}

.Audio img {
    height: 42px;
}

.CardBox {
    width: calc(100% - 200px);
    height: calc(100% - 120px);
    margin: auto;
    padding-left: 15px;
    padding-right: 15px;
    overflow: hidden;
    border: 4px dashed black;
    border-radius: 30px;
    display: flex;
    place-content: center;
    align-items: center;
    place-items: center;
}

.Card {
    background-repeat: no-repeat;
    background-size: cover;
    object-fit: contain;
    cursor: pointer;
    object-fit: contain;
    width: calc(100% - 100px);
    height: 90%;
}

.CardImage {
    position: relative;
    object-fit: contain;
    height: calc(100% - 120px);
}

.CardImage img {
    border: 3px dotted black;
    border-radius: 30px;
    box-shadow: 5px 5px gray;
    max-width: 100%;
    height: 100%;
}

.CardCover {
    position: relative;
    object-fit: contain;
    height: 100%;
}

.CardText {
    margin: 0px;
    overflow: hidden;
    background-color: white;
    color: black;
}

.Card h1 {
    font-size: 48px;
    text-shadow: gray 3px 1px 1px;
    -webkit-text-stroke: 1px black;
    margin: 0px;
}

.Card h2 {
    font-size: 30px;
    margin: 0px;
}

.Card pre {
    margin: 0px;
}

.Options {
    min-width: 200px;
}

.Options .Option {
    display: block;
    padding: 7px;
    font-size: 24px;
    font-weight: bold;
    border-radius: 15px;
    cursor: pointer;
    margin-left: 0px;
    margin-bottom: 15px;
}

.Options .Option.Right {
    background-color: chartreuse;
    text-shadow: white 3px 0 10px;
    box-shadow: 3px 3px gray;
}

.Options .Option.Wrong {
    background-color: crimson;
    text-shadow: white 3px 0 10px;
    box-shadow: 3px 3px gray;
    color: white;
}

pre {
    white-space: pre-wrap;
    /* Since CSS 2.1 */
    white-space: -moz-pre-wrap;
    /* Mozilla, since 1999 */
    white-space: -pre-wrap;
    /* Opera 4-6 */
    white-space: -o-pre-wrap;
    /* Opera 7 */
    word-wrap: break-word;
    /* Internet Explorer 5.5+ */
}
</style>