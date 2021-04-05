<template>
<div class="game">

</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Game } from "./model/Game";

export default defineComponent({
  name: "Game",
  props: {
    game: {
      type: Game,
      required: true
    }
  }
});
</script>

<style>
  .game {
    width: 100vw;
    height: 100vh;
    position: relative;
  }
</style>
