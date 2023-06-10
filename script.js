// Global Constants
const apiKey = "22f0a734b12103d70297d56ff4dc4bae"
const TMDB_API_BASE_URL = `https://api.themoviedb.org/3/`
const imageBaseUrl = "https://image.tmdb.org/t/p"
const currentAPIpage = 1

//DOM 
const search_form = document.getElementById("search-form")
const search_input = document.getElementById("search-input")
const submit_btn = document.getElementById("search-button")
const more_btn = document.getElementById("load-more-movies-btn")
const main_section= document.getElementById("movie-grid")
const main_page = document.getElementById("main-page")
const search_page = document.getElementById("search-page")
const search_section = document.getElementById("search-movies")
const search_results = document.getElementById("search-results")

const close_btn = document.getElementById("close-search-btn")
let pageNum = 0


//https://api.themoviedb.org/3/movie/now_playing?api_key=5446ab24b5c44c62664c314851352fcf&page=1

async function getNowPlayingResults() {
    let API_page = currentAPIpage + pageNum
    const res = await fetch (`${TMDB_API_BASE_URL}/movie/now_playing?api_key=${apiKey}&page=${API_page}`)
    const data = await res.json()
    console.log (data)
    displayMainPage(data.results)
}

async function getSearchResults(searchTerm) {
    const res = await fetch (`${TMDB_API_BASE_URL}/search/movie?api_key=${apiKey}&query=${searchTerm}`)
    //&page=${currentAPIpage}`)
    const data = await res.json()
    console.log (data)
    displaySearchResults(data.results)
  }

async function searchForMovies(event) {
    event.preventDefault() // stops from from refreshing
    search_section.innerHTML = ''
    console.log(search_input.value)
    await getSearchResults(search_input.value)
    
  }

  function displayMainPage(results) {
    //main_section.innerHTML = ''
    results.forEach((element) => {
      //let gif = document.createElement('img');
      gifSrc = `${imageBaseUrl}/w342${element.poster_path}`
      main_section.innerHTML +=  `
      <div class = "movie-card">
        <div class="container">
        <img id = "movie-poster" src="${gifSrc}" />
            <div id = "movie-details">
                <div id = "movie-title">
                    <p>${element.title}</p>
                </div>
                <div id = "movie-votes">
                    <p> ${element.vote_average} <i class="material-symbols-outlined" id = "star">
                    grade
                    </i> 
                    </p>
                </div>
            </div>
        </div>
      </div>
      `
    })
    more_btn.classList.remove("hidden")
  }

  function displaySearchResults(results) {
    console.log(results)
    main_page.classList.add("main-hidden")
    search_page.classList.remove("hidden")
    search_results.classList.remove("hidden")
    results.forEach((element) => {
      //let gif = document.createElement('img');
      console.log(element)
      gifSrc = `${imageBaseUrl}/w342${element.poster_path}`
      console.log(gifSrc)
      search_section.innerHTML +=  `
      <div class = "movie-card">
        <div class="container">
        <img id = "movie-poster" src="${gifSrc}" />
            <div id = "movie-details">
                <div id = "movie-title">
                    <p>${element.title}</p>
                </div>
                <div id = "movie-votes">
                    <p> ${element.vote_average} <i class="material-symbols-outlined" id = "star">
                    grade
                    </i> 
                    </p>
                </div>
            </div>
        </div>
      </div>
      `
    })
    
  }

  function closeSearchResults(){
    main_page.classList.remove("main-hidden")
    search_page.classList.add("hidden")
  }

  async function LoadMoreMovies(event) {
    // YOUR CODE HERE
    pageNum += 1
    let data = await getNowPlayingResults()
    console.log(data)
    console.log(pageNum)
  }


  window.onload = function () {
    getNowPlayingResults()
   submit_btn.addEventListener("click", searchForMovies)
   more_btn.addEventListener("click", LoadMoreMovies)
   close_btn.addEventListener("click", closeSearchResults)
  }
   