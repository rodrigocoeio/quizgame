<template>
    <div class="CardBox">
        <div class="Card">

            <div class="CardText">
                <h1>{{ card.name }}</h1>
                <h2 class="Question">
                    <pre>{{ card.question }}</pre>
                </h2>
            </div>

            <div class="CardImage" v-if="card.image">
                <!-- Card Image -->
                <img :src="image" @click="playAudio" class="CardImage">
            </div>

        </div>

        <div class="Options">
            <button @click="tryAnswer(index+1, option)" v-for="option,index in options" :class="['Option', option.opened ? option.className:'']">
                ({{letters[index]}}) {{ option.answer }}
            </button>
        </div>
    </div>
</template>

<script>
import store from "$/store.js";

export default {
    data() {
        let options = [];
        store.card.options.map((item,index) => {
            options.push({answer: item, opened: false, className: (index+1) == store.card.answer ? "Right" : "Wrong" });
        });

        return {
            letters: ['A','B','C','D','E','F','G'],
            options
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
        this.playAudio();
    },

    methods: {
        playAudio() {
            store.playCardAudio();
        },

        quitGame() {
            return store.quitGame();
        },

        tryAnswer(answer, option) {
            option.opened = true;
            console.log(option);
            store.try(answer);
        }
    },
}
</script>

<style scoped>
.Translation {
    color: blue;
}

.Comment {
    color: red;
    font-size: 25px;
}

.CardBox {
    width: calc(100% - 200px);
    height: calc(100% - 120px);
    margin: auto;
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
    font-size: 16px;
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