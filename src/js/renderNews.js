import { FETCH_URL, newsCategories } from "./confing";

export async function renderNews() {
  //   getting elements from DOM
  const newsListContainer = document.querySelector("#newsList");
  const categoryListContainer = document.querySelector("#categoryList");

  // loading spinner
  function renderSpinner(parentElement){
    parentElement.innerHTML =`<i class="fa-solid fa-spinner fa-spin"></i>`
  }
  // clear parent elements before appending children
  function clear(parentElement){
    parentElement.innerHTML= ""
  }
  // display category list
  let newsCategory = "all";
  const allResponse = await fetch(FETCH_URL + newsCategory);
  const allData = await allResponse.json();
  getNewsTitles(allData, newsCategory);

  function renderCategoryList() {
    newsCategories.reverse().map((category) => {
      const markUp = `<li>${category}</li>`;
      categoryListContainer.insertAdjacentHTML("afterbegin", markUp);
      // getting news category, then fetch data according to category
      const list = categoryListContainer.querySelector("li");
      list.addEventListener("click", async (e) => {
        renderSpinner(newsListContainer)
        newsCategory = e.target.textContent;
        const response = await fetch(FETCH_URL + newsCategory);
        const data = await response.json();
        clear(newsListContainer)
        getNewsTitles(data, newsCategory);
      });
    });
  }
  renderCategoryList();

  // rendering news headlines
  function getNewsTitles(data, category) {
    const briefsSpan = document.querySelector("#briefsSpan");
    data.data.map((news) => {
      const markUp = `<li><img src="${news.imageUrl}" alt="news-poster"><h3>${news.title}</h3><p><i>by: ${news.author}</i></p><p>${news.date}</p></li>`;
      briefsSpan.textContent = `${category.toUpperCase()}:`;
      newsListContainer.insertAdjacentHTML("afterbegin", markUp);
    });
  }
}
