import { createApp } from "vue";
import GameComponent from "./components/Game.vue";
import { Game } from "./model/Game";

const game = new Game();
createApp(GameComponent, { game }).mount("#app");
