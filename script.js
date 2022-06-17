const API_KEY = "27501126c89468d2681cf1346085ad86"
const BASE_URL = "https://image.tmdb.org/t/p/w500"
var page = 1
var search_page = 1
var column = 1
var search = ''

const movieResultsElement = document.getElementById("movies-grid")
const searchElement = document.getElementById("search")
const inputElement = document.getElementById('search-input')
const loadMoreElement = document.getElementById("load-more-movies-btn")
const exitSearchElement = document.getElementById("close-search-btn")

async function fetchMovies(){
    if (search != ''){
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=${search_page}&include_adult=false&query=${search}`)
        search_page++
        const results = await response.json()
        displayMovies(results["results"])
    }
    else{
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`)
        page++
        const results = await response.json()
        displayMovies(results["results"])
    }
}

function insertMovie (title, src, votes){
    movieResultsElement.innerHTML += 
    `<div class = "movie-card column-${column}">
        <img src="${src}" class = "movie-poster">
        
        <div class = "movie-text">
            <p class = "movie-votes"><i class="fa-solid fa-star"></i>${votes}</p>
            <h3 class = "movie-title">${title}</h3>
        </div>
    </div>
    `

    if (column == 3){
        column = 1
    }
    else{
        column++
    }
}

function displayMovies(movies) {
    var title;
    var posterImgSrc;
    var votes;

    movies.forEach(movie => {

        if (movie.poster_path != null){
            title = movie.title
            posterImgSrc = BASE_URL + movie.poster_path
            votes = movie.vote_average
            
            insertMovie(title, posterImgSrc, votes)
        }
    })
}

function loadMore(event){
    event.preventDefault()

    fetchMovies()
}

async function searchMovies(event){
    event.preventDefault()

    if (search != ''){
        search_page = 1
    }

    page = 1

    movieResultsElement.innerHTML = ''

    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=${search_page}&include_adult=false&query=${inputElement.value}`)
    const results = await response.json()

    search = inputElement.value
    inputElement.value = ''

    displayMovies(results["results"])
}

function clearSearch(){
    if (search != '' || page != 1){
        page = 1
        search_page = 1
        search = ''
        movieResultsElement.innerHTML = ''
        fetchMovies()
    }

}

window.onload = function () {
    searchElement.addEventListener('submit', searchMovies)
    loadMoreElement.addEventListener('click', loadMore)
    exitSearchElement.addEventListener('click', clearSearch)
    fetchMovies()
}

// need to reset search_page
// make sure there's 4 on each row