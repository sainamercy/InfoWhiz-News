import { FETCH_URL, newsCategories } from "./confing";

export async function renderNews() {
  //   getting elements from DOM
  const newsListContainer = document.querySelector("#newsList");
  const categoryListContainer = document.querySelector("#categoryList");
  const newsDetailsContainer = document.querySelector("#details");
  const searchForm = document.querySelector("#search");

  // loading spinner
  function renderSpinner(parentElement) {
    parentElement.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i>`;
  }
  // clear parent elements before appending children
  function clear(parentElement) {
    parentElement.innerHTML = "";
  }

  // setting all category as default display
  let newsCategory = "all";
  const allResponse = await fetch(FETCH_URL + newsCategory);
  const allData = await allResponse.json();
  getNewsTitles(allData);
  displayNewsDetails(allData.data.reverse()[0]);
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchNews();
  });

  // display category list
  function renderCategoryList() {
    newsCategories.reverse().map((category) => {
      const markUp = `<li>${category}</li>`;
      categoryListContainer.insertAdjacentHTML("afterbegin", markUp);

      // getting news category, then fetch data according to category
      const list = categoryListContainer.querySelector("li");
      list.addEventListener("click", async (e) => {
        // initial setup of UI
        renderSpinner(newsListContainer);
        renderSpinner(newsDetailsContainer);
        const briefsSpan = document.querySelector("#briefsSpan");
        briefsSpan.textContent = `${category.toUpperCase()}:`;
        newsCategory = e.target.textContent;
        // fetch data
        const response = await fetch(FETCH_URL + newsCategory);
        const data = await response.json();
        clear(newsListContainer);
        getNewsTitles(data, newsCategory);
        displayNewsDetails(data.data.reverse()[0]);
      });
    });
  }
  renderCategoryList();

  // rendering news headlines
  function getNewsTitles(data) {
    data.data.map((news) => {
      const markUp = `<li><img src="${news.imageUrl}" alt="news-poster"><h3>${news.title}</h3><p><i>by: ${news.author}</i></p><p>${news.date}</p></li>`;

      newsListContainer.insertAdjacentHTML("afterbegin", markUp);

      // render news Details on click of news list container
      const list = newsListContainer.querySelector("li");
      list.addEventListener("click", () => {
        displayNewsDetails(news);
      });
    });
  }

  // display news details
  function displayNewsDetails(data) {
    renderSpinner(newsDetailsContainer);
    const readMoreUrl = data.readMoreUrl;
    const markUp = ` <h3>${data.title}</h3>
    <p>Author: <i>${data.author}</i></p>
    <p>${data.date}</p>
    <img src="${data.imageUrl}" alt="news-poster">
    <p class="content">${data.content} <a href="${readMoreUrl}" target="_blank">Read more...</a></p>
    `;
    clear(newsDetailsContainer);
    newsDetailsContainer.insertAdjacentHTML("afterbegin", markUp);
  }

  function getTitlesArray(data) {
    const newsTitles = [];
    data.map((news) => {
      newsTitles.push(news.title);
    });
    return newsTitles;
  }
  const newsTitles = getTitlesArray(allData.data);

  // search news
  function searchNews() {
    const searchValue = document.querySelector("#searchValue").value;

    const results = newsTitles.filter((news) => {
      return news.toLowerCase().includes(searchValue.toLowerCase());
    });
    console.log(results);
  }
}
