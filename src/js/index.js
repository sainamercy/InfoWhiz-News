import { authentication } from "./auth";
import { renderNews } from "./renderNews";
import { feedback } from "./feedback";

document.addEventListener("DOMContentLoaded", () => {
  authentication();
  renderNews();
  feedback()
});
