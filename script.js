// GLOBAl CONSTANTS
API_KEY = "7588252b35a0bbe04a7685828388c9e8"
BASE_API_URL  = "https://api.themoviedb.org/3"
API_KEY_QUERY = "?api_key=" + API_KEY
 
// VARIABLES
let searchTerm = "";
let currentPage = 1;
let latestApiCall = ""
 
// DOM selectors
const moviesGrid = document.querySelector("#movies-grid");
const searchBtn = document.querySelector("#clicker");
const closeSearchBtn = document.querySelector("#close-search-btn");
const loadMoreBtn = document.querySelector("#load-more-movies-btn");
const popupContainer = document.querySelector("#popup-container");
const popupEl = document.querySelector("#popup");

// EVENT LISTENERS
searchBtn.addEventListener("click", handleSearchFormSubmit);
closeSearchBtn.addEventListener("click", closeSearch);
loadMoreBtn.addEventListener("click", loadMoreMovies);
popupContainer.addEventListener("click", hidePopup);



// FUNCTIONS

async function callAPI (apiRequestURL){
    console.log("called URL:", apiRequestURL);
    let response = await fetch(apiRequestURL);
    let responseData = await response.json();
    console.log("responseData:", responseData);
    return responseData;
}

async function getResults (apiRequestURL){
    latestApiCall = apiRequestURL
    results = await callAPI(apiRequestURL)
    return results
}

function displayMovieResults (resultsData){
    movieResults = resultsData.results; 
    movieResults.forEach( movie => createMovieCard(movie))
}

async function displayNowPlaying (){
    movieResults = await getResults(BASE_API_URL + "/movie/now_playing" + API_KEY_QUERY);
    displayMovieResults(results);
 }

function createMovieCard (movieObject){
    movieCardID = "movie-"+movieObject.id;

    // create new movie card div object
    let movieCardDiv = document.createElement('div');
    movieCardDiv.className = "movie-card";
    document.getElementById("movies-grid").appendChild(movieCardDiv);

    // get path to poster; if unavailable, supply a default one
    let posterPath = movieObject.poster_path
    posterDisplayURL = (posterPath ? "https://image.tmdb.org/t/p/original"+posterPath : "https://fl-1.cdn.flockler.com/embed/no-image.svg") 
    
    // insert rest of HTML for the div object
    movieCardDiv.innerHTML = `
        <div class="half-overlay" movieid="${movieCardID}"}"></div>
        <div class="movie-card-info" movieid="${movieCardID}">
            <h3 class="movie-votes" movieid="${movieCardID}">★ ${movieObject.vote_average}</h3>
            <h2 class="movie-title" movieid="${movieCardID}">${movieObject.title}</h2>
        </div>
        <img class="movie-poster"
            src="${posterDisplayURL}"
            alt="${movieObject.title} (${movieObject.year}) poster image"
            movieid="${movieCardID}"
            >`;

    // add event listener for the newly made movie
    movieCardDiv.addEventListener('click', handleMovieCardClick)
}

 async function handleSearchFormSubmit (evt){
    evt.preventDefault();
    moviesGrid.innerHTML = "";
    currentPage = 1;
    
    // display results and show the "close search" button
    searchTerm = document.getElementById('search-input').value;
    movieResults = await getResults(BASE_API_URL + "/search/movie" + API_KEY_QUERY + "&query=" + searchTerm)
    displayMovieResults(movieResults)
    closeSearchBtn.classList.remove("hidden");
 }

 function closeSearch (evt){
    moviesGrid.innerHTML = "";
    currentPage = 1;
    displayNowPlaying();
    closeSearchBtn.classList.add("hidden");
 }
 
 async function handleMovieCardClick (evt) {
    movieID = (evt.target.attributes.movieid.value).slice(6);
    movieObject = await callAPI(BASE_API_URL + "/movie/" + movieID + API_KEY_QUERY);
    videoDetailsObject = await callAPI(BASE_API_URL + "/movie/" + movieID + "/videos" + API_KEY_QUERY);
  
    
    let backdropPath = movieObject.backdrop_path
    backdropDisplayURL = (backdropPath ? "https://image.tmdb.org/t/p/original"+backdropPath : "https://fl-1.cdn.flockler.com/embed/no-image.svg") 

    // populate popup contents
    popupEl.innerHTML = `
        <div>
            <img class="movie-header" src="${backdropDisplayURL}">
            <h1>${movieObject.title}</h1>
            <span>★ ${movieObject.vote_average}</span>
            <span class="light-text">/ 10</span"><span>
        </div>
    `
    showPopup();
}

function showPopup (evt) {
    popupContainer.classList.remove("hidden");
    popupEl.classList.remove("hidden");
}

function hidePopup (evt) {
    popupContainer.classList.add("hidden");
    popupEl.classList.add("hidden");
}
 
async function loadMoreMovies (){
    console.log('clicked')
    currentPage += 1
    results = await getResults(latestApiCall+"&page=" + currentPage)
    displayMovieResults(results)
 }

 window.onload = function () {
    currentPage = 1;
    displayNowPlaying();
   }