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

function addEventListeners (){
    searchElement.addEventListener('submit', searchMovies)
    loadMoreElement.addEventListener('click', loadMore)
    exitSearchElement.addEventListener('click', clearSearch)
}

async function fetchMovies(){
    if (search != ''){
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=${search_page}&include_adult=false&query=${search}`)
        search_page++
        const results = await response.json()
        await displayMovies(results["results"])
    }
    else{
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`)
        page++
        const results = await response.json()
        await displayMovies(results["results"])
    }
}

async function showMoreInfo (event){
    event.preventDefault()
    var movieCardElement = event.composedPath()[event.composedPath().length - 6]

    if (movieCardElement.getAttribute("data-id") != ''){
        // We only fetch the data once
        await getMoreInfo(movieCardElement.getAttribute("data-id"), movieCardElement)
        movieCardElement.setAttribute("data-id", '')
    }
    
    const moreMovieInfoElement = movieCardElement.children[2]
    const allMovieCards = document.getElementsByClassName('movie-card')

    if (moreMovieInfoElement.classList.contains('hidden')){
        // Check all the others are also closed. If not, close them
        for (let i = 0; i < allMovieCards.length ; i++){
            if (!(allMovieCards[i].children[2].classList.contains('hidden'))){
                allMovieCards[i].children[2].classList.add('hidden')
            }
        }
        moreMovieInfoElement.classList.remove('hidden')
    }
    else {
        moreMovieInfoElement.classList.add('hidden')
    }

}

async function getMoreInfo(movie_id, movie_card){
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`)
    const results = await response.json()

    // Left: backdrop poster
    const leftBox = movie_card.children[2].children[0]
    // add trailer and backdrop on left
    // the backdrop image is correct, it just doesn't display??
    // get embedded video

    leftBox.innerHTML =    ``

    if (results.backdrop_path != null){
        leftBox.innerHTML += `<img src="${BASE_URL + results.backdrop_path}" alt = "Backdrop for ${movie_card.getElementsByClassName('movie-title')[0].innerHTML}">`
    }

    
    const vid_response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`)
    const vid_results = await vid_response.json()

    if (vid_results["results"] && vid_results["results"][0] && vid_results["results"][0].key){
        var vid_url = `https://www.youtube.com/embed/${vid_results["results"][0].key}`

        leftBox.innerHTML += `<iframe id="ytplayer" class="video" type="text/html" src="${vid_url}" frameborder="0"></iframe>`
    }


    const rightBox = movie_card.children[2].children[1]

    // Set up genre tags
    var genreHtml = ''
    for (let i = 0; i < results.genres.length; i++){
        genreHtml += `<p class = "genre-tag">${results.genres[i]["name"]}</p>`
    }
    rightBox.innerHTML += `
        <p class = "runtime">${results.runtime} minutes</p>
        <h3 class = "overview-title">Overview</h3>
        <p class = "overview">${results.overview}</>
        <div class = "genres">${genreHtml}</div>
    `
}

async function insertMovie (title, src, votes, movie_id){
    movieResultsElement.innerHTML += 
    `<div class = "movie-card" data-id="${movie_id}">
        <img src="${src}" class = "movie-poster" alt = "Movie poster for ${title}">
        
        <div class = "movie-text">
            <p class = "movie-votes"><i class="fa-solid fa-star"></i>${votes}</p>
            <h3 class = "movie-title">${title}</h3>
        </div>

        <div class="overlay hidden">
            <div class = "overlay-left">

            </div>
            <div class = "overlay-right">
                <h2 class = "overlay-title">${title}</h2>
                <p class = "overlay-votes"><i class="fa-solid fa-star"></i>${votes}</p>
            </div>
        </div>

    </div>
    `

    var cards = movieResultsElement.getElementsByClassName('movie-card')
    for (let i = 0; i < cards.length; i++){
        cards[i].addEventListener('click', await showMoreInfo)
    }
}

async function displayMovies(movies) {
    var title;
    var posterImgSrc;
    var votes;
    var movie_id;

    for (let i = 0; i < movies.length; i++){
        if (movies[i].poster_path != null){
            title = movies[i].title
            posterImgSrc = BASE_URL + movies[i].poster_path
            votes = movies[i].vote_average
            movie_id = movies[i].id

            await insertMovie(title, posterImgSrc, votes, movie_id)
        }
    }
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

    await displayMovies(results["results"])
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
    addEventListeners()
    fetchMovies()
}
