import { FETCH_URL } from "./confing";

export async function renderNews() {
    // getting data from API
  const response = await fetch(FETCH_URL);
  const data = await response.json();
  console.log(data);
//   getting elements from DOM
  const newsListContainer = document.querySelector("#newsList")

  function getNewsTitles(){
    data.data.map(news =>{
        const markUp = `<li><img src="${news.imageUrl}" alt="news-poster"><h3>${news.title}</h3><p><i>by: ${news.author}</i></p><p>${news.date}</p></li>`
        newsListContainer.insertAdjacentHTML("afterbegin", markUp)
    })
  }
  getNewsTitles()
}
