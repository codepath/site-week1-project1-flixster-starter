const API_KEY = "27501126c89468d2681cf1346085ad86"
const BASE_URL = "https://image.tmdb.org/t/p/w500"
var page = 1
var column = 1

const movieResultsElement = document.getElementById("movie-results")

async function fetchMovies(){
    //event.preventDefault()

    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`)
    const results = await response.json()

    page++

    displayMovies(results["results"])
}

function insertMovie (title, src, votes){
    // insert start icon after image
    // <i class="fa-solid fa-star"></i>
    movieResultsElement.innerHTML += 
    `<div class = "movie-box column-${column}">
        <img src="${src}" class = "movie-img">
        
        <div class = "movie-text">
            <p class = "votes"><i class="fa-solid fa-star"></i>${votes}</p>
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
        title = movie.title
        posterImgSrc = BASE_URL + movie.poster_path
        votes = movie.vote_average
        
        insertMovie(title, posterImgSrc, votes)
    })
}

window.onload = function () {
    fetchMovies()
}