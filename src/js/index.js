import { authentication } from "./auth";
import { renderNews } from "./renderNews";

document.addEventListener("DOMContentLoaded", () => {
  authentication();
  renderNews();
});
