// global constants
API_KEY = "7588252b35a0bbe04a7685828388c9e8"
BASE_API_URL  = "https://api.themoviedb.org/3"
API_KEY_QUERY = "?api_key=" + API_KEY
 
// variables
let searchTerm = "";
let currentPage = 1;
 
// DOM selectors
const closeSearchBtn = document.querySelector("#close-search-btn");
const moviesGrid = document.querySelector("#movies-grid");
const loadMoreBtn = document.querySelector("#load-more-movies-btn");
const searchBtn = document.querySelector("#clicker");
const popupContainer = document.querySelector("#popup-container");
const popupEl = document.querySelector("#popup");
 
 
// TESTER
let latestApiCall = ""
currentPage = 1
 
// event listeners
closeSearchBtn.addEventListener("click", closeSearch);
loadMoreBtn.addEventListener("click", loadMoreMovies);
searchBtn.addEventListener("click", handleSearchFormSubmit);
popupContainer.addEventListener("click", hidePopup);

// functions
async function getResults (apiRequestURL){
    latestApiCall = apiRequestURL
    console.log("called URL:", apiRequestURL);
    let response = await fetch(apiRequestURL);
    console.log("response:", response)
    let resultsData = await response.json();
    console.log("resultsData:", resultsData);
    return resultsData
}

function displayResults (resultsData){
    movieResults = resultsData.results 
    movieResults.forEach( movie => createMovieCard(movie))
}

function createMovieCard (movieObject){
    movieCardID = "movie-"+movieObject.id;
    console.log(movieCardID);

    // create new movie card div object
    let movieCardDiv = document.createElement('div');
    
    // add movie-card class name
    movieCardDiv.className = "movie-card";

    // append the div to the movies-grid element
    document.getElementById("movies-grid").appendChild(movieCardDiv);

    let posterPath = movieObject.poster_path
    posterDisplayURL = (posterPath ? "https://image.tmdb.org/t/p/original"+posterPath : "https://fl-1.cdn.flockler.com/embed/no-image.svg") 

    console.log(posterDisplayURL)
    
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

 async function displayNowPlaying (){
    results = await getResults(BASE_API_URL + "/movie/now_playing" + API_KEY_QUERY);
    displayResults(results);
 }
 
 async function handleSearchFormSubmit (evt){
    // prevent from reloading
    evt.preventDefault();
     
    // clear current movies so results show up at the top
    moviesGrid.innerHTML = "";
 
    // reset current page to 1
    currentPage = 1;
 
    // grab input from search form
    searchTerm = document.getElementById('search-input').value;
     
    let apiRequestURL = BASE_API_URL + "/search/movie" + API_KEY_QUERY + "&query=" + searchTerm
    results = await getResults(apiRequestURL)
 
    displayResults(results)
 
    // show close search button
    closeSearchBtn.classList.remove("hidden");
 
 }
 
 async function loadMoreMovies (){
    currentPage += 1
    results = await getResults(latestApiCall+"&page=" + currentPage)
    console.log(results)
    displayResults(results)
 }
 
 function closeSearch (evt){
    moviesGrid.innerHTML = "";
    currentPage = 1;
    displayNowPlaying();
    closeSearchBtn.classList.add("hidden");
 }

 async function getMovieDetails (movieID){
    apiRequestURL = BASE_API_URL + "/movie/" + movieID + API_KEY_QUERY
    console.log("called URL:", apiRequestURL);
    
    let response = await fetch(apiRequestURL);
    console.log("response:", response)
    let resultsData = await response.json();
    console.log("resultsData:", resultsData);
    
    return resultsData

 }

 async function handleMovieCardClick (evt) {
    console.log("popup function triggered");
    movieID = (evt.target.attributes.movieid.value).slice(6)
    movieObject = await getMovieDetails(movieID)
    console.log(movieObject);
    
    // show popup container
    popupContainer.classList.remove("hidden");
    popupEl.classList.remove("hidden");

    // get video results
    videoResults = await getVideoResults(movieID);
    console.log(videoResults)

    
    popupEl.innerHTML = `
        <div>
            <h1>${movieObject.title}</h1>
            <span>★ ${movieObject.vote_average}</span>
            <span class="light-text">/ 10</span"><span>
        </div>
    `
}

async function getVideoResults(movieID) {
    apiRequestURL = BASE_API_URL + "/movie/" + movieID + "/videos" + API_KEY_QUERY
    console.log("called URL:", apiRequestURL);
    
    let response = await fetch(apiRequestURL);
    console.log("response:", response)
    let resultsData = await response.json();
    console.log("resultsData:", resultsData);
    return resultsData
}


function hidePopup (evt) {
    popupContainer.classList.add("hidden");
    popupEl.classList.add("hidden");
}
 
 window.onload = function () {
    currentPage = 1;
    displayNowPlaying();
   }