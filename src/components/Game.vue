<template>
    <controls></controls>
    <cover v-if="cover"></cover>
    <card v-if="!cover"></card>
</template>

<script>
import store from "$/store.js";
window.store = store;

import Controls from "./Controls.vue";
import Card from "./Card.vue";
import Cover from "./Cover.vue";

export default {
    computed: {
        cover() {
            return store.game.cover;
        }
    },

    components: {
        Controls,
        Card,
        Cover
    }
}
</script>


