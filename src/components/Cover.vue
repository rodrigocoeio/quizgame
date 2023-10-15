<template>
    <div class="CardBox">
        <div class="Card" @click="playAudio">
            <div class="CardText">
                <h1>{{ card.name }}</h1>
                <h1 class="Translation">
                    <pre>{{ card.translation }}</pre>
                </h1>
            </div>

            <div class="CardImage">
                <img :src="image" v-if="card.image" @click="playAudio" class="CardImage">
            </div>
        </div>
    </div>
</template>

<script>
import store from "$/store.js";

export default {

    computed: {
        game() {
            return store.game;
        },

        card() {
            return store.game.cover;
        },

        image() {
            return "/cards/" + this.card.parent + "/" + this.card.image;
        },
    },

    mounted() {
        this.playAudio();
    },

    methods: {
        playAudio() {
            store.playCardAudio(this.card);
        }
    }

}
</script>


<style scoped>
.Translation {
    color: red;
}

.CardBox {
    position: relative;
    width: calc(100% - 200px);
    height: calc(100% - 120px);
    margin: auto;
    margin-top: 15px;
    overflow: hidden;
    border: 4px dashed red;
    border-radius: 30px;
    display: flex;
    place-content: center;
    align-items: center;
    place-items: center;
}

.Card {
    object-fit: contain;
    width: calc(100% - 100px);
    height: 90%;
}

.CardImage {
    position: relative;
    object-fit: contain;
    height: calc(100% - 144px);
}

.CardImage img {
    max-width: 100%;
    height: 100%;
    border: 3px dotted black;
    border-radius: 30px;
    box-shadow: 5px 5px gray;
}

.CardText {
    padding: 15px;
    margin: 0px;
    overflow: hidden;
    background-color: white;
    color: black;
}

h1 {
    font-size: 48px;
}

h1,
h2 {
    background-color: white;
    text-shadow: gray 3px 1px 1px;
    -webkit-text-stroke: 1px black;
    margin: 0px;
}

pre {
    margin: 0px;
}

.GuessWhat {
    cursor: pointer;
}
</style>