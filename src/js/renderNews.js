import { FETCH_URL, newsCategories } from "./confing";

export async function renderNews() {
  //   getting elements from DOM
  const newsListContainer = document.querySelector("#newsList")
  const categoryListContainer = document.querySelector("#categoryList")

  function renderCategoryList(){
      newsCategories.reverse().map(category =>{
        const markUp = `<li>${category}</li>`
        categoryListContainer.insertAdjacentHTML("afterbegin", markUp)
      })
  }
  renderCategoryList()
    // getting data from API
  const response = await fetch(FETCH_URL);
  const data = await response.json();
  console.log(data);

  function getNewsTitles(data){
    data.data.map(news =>{
        const markUp = `<li><img src="${news.imageUrl}" alt="news-poster"><h3>${news.title}</h3><p><i>by: ${news.author}</i></p><p>${news.date}</p></li>`
        newsListContainer.insertAdjacentHTML("afterbegin", markUp)
    })
  }
  getNewsTitles(data)

}
