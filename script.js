// global constants
API_KEY = "7588252b35a0bbe04a7685828388c9e8"
BASE_API_URL  = "https://api.themoviedb.org/3"
API_KEY_QUERY = "?api_key=" + API_KEY

// variables
let searchTerm = "";
let currentPage = 1;

// DOM selectors
const closeSearchBtn = document.querySelector("#close-serach-btn");
const moviesGrid = document.querySelector("#movies-grid");
const loadMoreBtn = document.querySelector("#load-more-movies-btn");
const searchBtn = document.querySelector("#clicker");

// event listeners
//closeSearchBtn.addEventListener("click", closeSearch);
loadMoreBtn.addEventListener("click", loadMoreMovies);
searchBtn.addEventListener("click", handleSearchFormSubmit);

async function getNowPlaying (){
    let apiURL = BASE_API_URL + "/movie/now_playing" + API_KEY_QUERY + "&page=" + currentPage;
    console.log("called URL:", apiURL);
    
    response = await fetch(apiURL);
    console.log("response:", response)

    let resultsData = await response.json();
    console.log("responseData:", resultsData);

    displayResults(resultsData)
}

//will need to edit this if i want to show more details when they clickor hover on it

function displayResults (resultsData){
    movieResults = resultsData.results 
    movieResults.forEach( movie => 
        moviesGrid.innerHTML += `
        <div class="movie-card">
            <img class="movie-poster" src="${"https://image.tmdb.org/t/p/w500"+movie.poster_path}">
            <div class="movie-card-info">
                <h2 class="movie-title">${movie.title}</h2>
                <h3 class="movie-votes">${movie.vote_average}</h3>
            </div>
        </div>
    `
)}

async function handleSearchFormSubmit (evt){
    evt.preventDefault();
    moviesGrid.innerHTML = ''

    searchTerm = evt.target.search-input.value;
    searchResults = await getResults(searchTerm);
    console.log(searchResults);
    displayResults(searchResults);

    // unhide load more button
    loadMoreButtonEl.classList.remove("hidden");
}

// need to edit this so that it loads more movies in general, not just the Now Playing
async function loadMoreMovies (evt){
    currentPage += 1;
    getNowPlaying();
}


window.onload = function () {
    currentPage = 1;
    getNowPlaying();
  }