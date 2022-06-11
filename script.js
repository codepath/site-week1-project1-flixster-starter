const api_key = 'b920971799aea823aa7b41503946a6e9'
const Movie_list = []

var innerHTM = ''
//https://api.themoviedb.org/3/movie/550?api_key=b920971799aea823aa7b41503946a6e9

//https://api.themoviedb.org/3/movie/550?api_key={api_key}&callback=test
let page_Num = 1
const grid_cont = document.querySelector('.grid-container')
const search_bar = document.getElementById('search_item')

async function getMovie_data(page_Num) {
  const api_url =
    'https://api.themoviedb.org/3/movie/now_playing?api_key=' +
    api_key +
    '&page=' +
    page_Num
  let response = await fetch(api_url)
  let responseData = await response.json()

  return responseData
}
async function getAllMovies() {
  const responseData = await getMovie_data(page_Num)
  console.log(responseData)
  display(responseData)
}
 function display(responseData) {
  if (responseData) {
    responseData.results.forEach((element) => {
      var image_path = ''

      if ('poster_path' in element) {
        image_path = element.poster_path
      }
      var id = element.id

      const title = element.title
      const votes = element.vote_average

       grid_cont.innerHTML += `
      
      <div class= "grid-item" id="${id}">
      <img class= "movie_pic" src= "https://image.tmdb.org/t/p/w500/${image_path}"/>
      <div class = "rating">
      <div class= "star">⭐</div>
      <div class= "rat_num"> ${votes}</div>
      </div>
      <div class="title">${title}</div>
      </div>
      `
    })
  }
}


//#\33

function popUp() {
    
  nav.insertAdjacentHTML(
    'beforebegin',
    `<div class="demo-popup-wrapper">
    <div class="demo-popup"></div>
    </div>`,
  )
}

async function getSearchMovies(evt) {
  const user_input = search_bar.value
  console.log(search_bar.value)
  console.log(page_Num)

  if (user_input.length > 0) {
    apiURL =
      'https://api.themoviedb.org/3/search/movie?api_key=' +
      api_key +
      '&query=' +
      user_input

    let response = await fetch(apiURL)

    let responseData = await response.json()

    console.log(responseData)

    return responseData
  } else {
    const api_url =
      'https://api.themoviedb.org/3/movie/now_playing?api_key=' +
      api_key +
      '&page=' +
      page_Num
    let response = await fetch(api_url)
    let responseData = await response.json()

    return responseData
  }
}
async function myFunction() {
  if (search_bar.value.length > 0) {
    const movies = await getSearchMovies()
    console.log(search_bar.value)
    grid_cont.innerHTML = ''
    display(movies)
  } else {
    grid_cont.innerHTML = ''
    console.log(page_Num)
    if (page_Num >= 1) {
      for (let i = 1; i < page_Num + 1; i++) {
        const load_data = await getMovie_data(i)
        console.log(load_data)
        const data = await getMovie_data(i)
        display(data)
      }
    }
  }
}

async function LoadMore(evt) {
  page_Num += 1
  const load_data = await getMovie_data(page_Num)
  console.log(load_data)
  display(load_data)
}
const search_icon = document
  .querySelector('.search_icon')
  .addEventListener('click', displaySearch)

function displaySearch(evt) {
  evt.preventDefault()

  let visibility = window.getComputedStyle(search_bar).visibility

  if (visibility == 'hidden') {
    search_bar.setAttribute('style', 'visibility : visible')
  }
}
document.addEventListener('mouseup', function (e) {
  var container = this.getElementById('search_item')
  if (!container.contains(e.target)) {
    container.setAttribute('style', 'visibility : hidden')
  }
})

window.onload = async function () {
  // execute your functions here to make sure they run as soon as the page loads

  getAllMovies()
}
document.getElementById('button1').addEventListener('click', LoadMore)
