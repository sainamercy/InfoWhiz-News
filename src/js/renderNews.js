import { FETCH_URL, newsCategories } from "./confing";

export async function renderNews() {
  //   getting elements from DOM
  const newsListContainer = document.querySelector("#newsList");
  const categoryListContainer = document.querySelector("#categoryList");
  const newsDetailsContainer = document.querySelector("#details")

  // loading spinner
  function renderSpinner(parentElement){
    parentElement.innerHTML =`<i class="fa-solid fa-spinner fa-spin"></i>`
  }
  // clear parent elements before appending children
  function clear(parentElement){
    parentElement.innerHTML= ""
  }
   
  // setting all category as default display
  let newsCategory = "all";
  const allResponse = await fetch(FETCH_URL + newsCategory);
  const allData = await allResponse.json();
  getNewsTitles(allData, newsCategory);
  displayNewsDetails(allData.data.reverse()[0])

     // display category list
  function renderCategoryList() {
    newsCategories.reverse().map((category) => {
      const markUp = `<li>${category}</li>`;
      categoryListContainer.insertAdjacentHTML("afterbegin", markUp);
      // getting news category, then fetch data according to category
      const list = categoryListContainer.querySelector("li");
      list.addEventListener("click", async (e) => {
        renderSpinner(newsListContainer)
        renderSpinner(newsDetailsContainer)
        newsCategory = e.target.textContent;
        const response = await fetch(FETCH_URL + newsCategory);
        const data = await response.json();
        clear(newsListContainer)
        getNewsTitles(data, newsCategory);
        displayNewsDetails(data.data.reverse()[0])
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

      // render news Details on click of news list container
      const list = newsListContainer.querySelector("li")
      list.addEventListener("click",()=>{
        console.log(list);
        displayNewsDetails(news)
      })
    });
  }

  // display news details
  function displayNewsDetails(data){
    renderSpinner(newsDetailsContainer)
    console.log(data.readMoreUrl);
    const readMoreUrl = data.readMoreUrl 
    const markUp = ` <h3>${data.title}</h3>
    <p>Author: <i>${data.author}</i></p>
    <p>${data.date}</p>
    <img src="${data.imageUrl}" alt="news-poster">
    <p class="content">${data.content} <a href="${readMoreUrl}" target="_blank">Read more...</a></p>
    
    `
    clear(newsDetailsContainer)
    newsDetailsContainer.insertAdjacentHTML("afterbegin", markUp)
  }
}
