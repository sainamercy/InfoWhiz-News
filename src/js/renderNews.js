import { FETCH_URL, newsCategories } from "./confing";

export async function renderNews() {
  //   getting elements from DOM
  const newsListContainer = document.querySelector("#newsList");
  const categoryListContainer = document.querySelector("#categoryList");
  const newsDetailsContainer = document.querySelector("#details");
  const searchForm = document.querySelector("#search");
  const bookmarksListContainer = document.querySelector("#bookmarksList");
  const bookmarkDefaultList = document.querySelector("#defaultList");

  // loading spinner
  function renderSpinner(parentElement) {
    parentElement.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i>`;
  }
  // clear parent elements before appending children
  function clear(parentElement) {
    parentElement.innerHTML = "";
  }

  // setting "all" category as default display
  let newsCategory = "all";
  const allResponse = await fetch(FETCH_URL + newsCategory);
  const allData = await allResponse.json();
  getNewsTitles(allData.data);
  displayNewsDetails(allData.data.reverse()[0]);
  // init data to use in search functionality
  let searchNewsList = getNewsArray(allData.data);
  let bookmarksList = [];

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
        getNewsTitles(data.data, newsCategory);
        displayNewsDetails(data.data.reverse()[0]);
        // getting data to use in search functionality
        searchNewsList = getNewsArray(data.data);
      });
    });
  }
  renderCategoryList();

  // rendering news headlines
  function getNewsTitles(data) {
    data.map((news) => {
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
    <p id="addToBm"><i class="fa-solid fa-plus"></i> to bookmarks</p>
    <p id="successMsg">Succsefully added</p>
    <p>Author: <i>${data.author}</i></p>
    <p>${data.date}</p>
    <img src="${data.imageUrl}" alt="news-poster">
    <p class="content">${data.content} <a href="${readMoreUrl}" target="_blank">Read more...</a></p>
    `;
    clear(newsDetailsContainer);
    newsDetailsContainer.insertAdjacentHTML("afterbegin", markUp);

    // executing add bookmarks function
    const addtoBm = newsDetailsContainer.querySelector("#addToBm");
    addtoBm.addEventListener("click", () => {
      const titles = [];
      bookmarksList.map((news) => {
        titles.push(news.title);
      });
      if (titles.includes(data.title)) {
        alert("bookmark exists");
      } else {
        bookmarksList.push(data);
        setLocalStorage();
        clear(bookmarksListContainer);
        bookmark(bookmarksList);
        const bookmarkSuccessMsg =
          newsDetailsContainer.querySelector("#successMsg");

        bookmarkSuccessMsg.style.display = "block";
        setTimeout(() => {
          bookmarkSuccessMsg.style.display = "none";
        }, 2000);
      }
    });
  }

  // search news......
  // getting array of news objects
  function getNewsArray(data) {
    const newsList = [];
    data.map((news) => {
      newsList.push(news);
    });
    return newsList;
  }

  // search news function
  function searchNews() {
    const searchValue = document.querySelector("#searchValue").value;

    const results = searchNewsList.filter((news) => {
      return news.title.toLowerCase().includes(searchValue.toLowerCase());
    });
    if (results.length === 0) {
      alert(
        "No news found! please use category section to find variety of news"
      );
    } else {
      renderSpinner(newsListContainer);
      renderSpinner(newsDetailsContainer);
      clear(newsListContainer);
      getNewsTitles(results);
      clear(newsDetailsContainer);
      displayNewsDetails(results.reverse()[0]);
    }
  }

  // executing search funtion
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchNews();
    searchForm.reset();
  });

  // bookmark favorite news
  function bookmark(data) {
    data.map((news) => {
      const markUp = `<li></i><a href="${news.readMoreUrl}" target="_blank">${news.title}</a></li>`;
      bookmarkDefaultList.style.display = "none";

      bookmarksListContainer.insertAdjacentHTML("afterbegin", markUp);
    });
  }

  // save bookmarks to browser localstorage
  function setLocalStorage() {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
  }

  // get data from browser localstorage
  function getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("bookmarks"));
    if (!data) return;
    bookmarksList = data;
    bookmark(bookmarksList);
  }
  getLocalStorage();
}
