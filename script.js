const api_key = 'b920971799aea823aa7b41503946a6e9'
const Movie_list = []

var innerHTM = ''
//https://api.themoviedb.org/3/movie/550?api_key=b920971799aea823aa7b41503946a6e9

//https://api.themoviedb.org/3/movie/550?api_key={api_key}&callback=test
let page_Num = 1
const grid_cont = document.querySelector('.movies-grid')
const search_bar = document.getElementById('search-input')

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
  await display(responseData)
}

//#\33

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

const back_button = document.querySelector('.close-search-btn')

back_button.addEventListener('click', backFunc)

function displaySearch(evt) {
  evt.preventDefault()

  let visibility = window.getComputedStyle(search_bar).visibility

  if (visibility == 'hidden') {
    search_bar.setAttribute('style', 'visibility : visible')
    back_button.setAttribute('style', 'visibility:visible')
  }
}

function backFunc(evt) {
  evt.preventDefault()
  search_bar.value = ''
  search_bar.setAttribute('style', 'visibility : hidden')
  back_button.setAttribute('style', 'visibility:hidden')
  myFunction()
}
search_bar.addEventListener(
  'keyup',
  function (event) {
    if (!event) {
      var event = window.event
    }
    event.preventDefault()
    if (event.keyCode == 13) {
      myFunction()
    }
  },
  false,
)

window.onload = async function () {
  // execute your functions here to make sure they run as soon as the page loads

  await getAllMovies()
}
document
  .getElementById('load-more-movies-btn')
  .addEventListener('click', LoadMore)
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
      <div class= "movie-card" id="${id}" onclick = "getMovieDetails(${id})">
      <img class= "movie-poster" src= "https://image.tmdb.org/t/p/w500/${image_path}"/>
      <div class = "rating">
      <div class= "star">⭐</div>
      <div class= "movie-votes"> ${votes}</div>
      </div>
      <div class="movie-title">${title}</div>
      </div>
      `
    })
  }
}
async function getMovieDetails(id) {
  const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`

  let response = await fetch(apiUrl)

  let responseData = await response.json()

  var element = document.querySelector('.demo-popup-wrapper')
  console.log(element)

  if (element != null)
  {
    console.log("nullooo")
    element.parentNode.removeChild(element)
  }

  document.querySelector('.navigation').insertAdjacentHTML('beforebegin',
  `<div class="demo-popup-wrapper" >
  <div class="demo-popup">
    <div class="popupcontrols">
     <span id="closeup">❌</span>
    </div>
  <div class="details">
  <div class="popup-title">Title: ${responseData.title}</div>
  <div class="popup-star">Rating ⭐: ${responseData.vote_average} </div>
  <div class="popup-release_Info">Release Info: ${responseData.release_date}</div>
  <div class="overview"> Overview: ${responseData.overview}</div>
  <div class="popup-tagline"> Tagline: ${responseData.tagline}</div>
  </div>
  </div>
 
  </div>

  `
  );
  const popupclose = document.getElementById("closeup").addEventListener("click", closefunc)
  
  function closefunc()
  {
    var element = document.querySelector('.demo-popup-wrapper')
     element.parentNode.removeChild(element)
  }
}
