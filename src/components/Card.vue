<template>
  <div
    :class="['card', colorClass]"
    draggable="true"
  >
    1
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Card } from "../model/Card.js";
import { Color } from "../model/Color.js";

const colorsMapping = new Map([
  [Color.Red, "red"],
  [Color.Green, "green"],
  [Color.Blue, "blue"],
  [Color.Yellow, "yellow"],
]);

export default defineComponent({
  name: "Game",
  props: {
    card: {
      type: Card,
      required: true,
    },
  },
  computed: {
    colorClass(): string {
      return colorsMapping.get(this.card.color) ?? "";
    },
  },
});
</script>

<style>
.card {
  border: 3px solid black;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 4.5rem;
  font-weight: 500;
}

.card--red {
  background-color: red;
  color: white;
}

.card--green {
  background-color: green;
  color: white;
}

.card--blue {
  background-color: blue;
  color: white;
}

.card--yellow {
  background-color: yellow;
  color: black;
}

.card--wish-color {
  background-color: black;
  color: white;
}

.card {
  height: 3rem;
  width: 2rem;
  border-radius: 3px;
  cursor: pointer;
  font-size: 2rem;
}
</style>
