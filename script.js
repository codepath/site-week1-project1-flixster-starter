// Global Variables

let currentPage = 1; 
let currentQuery = ""; 

const nowPlayingURL = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page='; // APPEND: currentPage
const searchURL1 = 'https://api.themoviedb.org/3/search/movie?query='; // APPEND: currentQuery
const searchURL2 = '&include_adult=false&language=en-US&page='; // APPEND: currentPage

let currentURL = nowPlayingURL; // default

// Buttons / Event Listeners / Pointers to Frequently Modified Elements

const searchBtn = document.querySelector("#search-button");
const loadMoreBtn = document.querySelector("#load-more");
const closeBtn = document.querySelector('#close-button');

const generalMovieCont = document.querySelector(".movie-container");
const searchForm = document.querySelector("#search-form");
const subtitleTxt = document.querySelector("#subtitle");

loadMoreBtn.addEventListener("click", function(){
    currentPage++;
    currentURL = currentURL + currentPage;
    loadMovies(currentURL);
});

searchBtn.addEventListener("click", function(){
    generalMovieCont.innerHTML = '';
    currentPage = 1;
    currentQuery = document.querySelector('#search-form').value;
    currentURL = searchURL1 + currentQuery + searchURL2 + currentPage;
    loadMovies(currentURL);
    subtitleTxt.innerHTML = "Searching \"" + currentQuery + "\"...";
    closeBtn.style.visibility = "visible";
});

closeBtn.addEventListener("click", function(){
    generalMovieCont.innerHTML = '';
    currentPage = 1;
    currentURL = nowPlayingURL + currentPage;
    loadMovies(currentURL);
    searchForm.value = "";
    subtitleTxt.innerHTML = "Now playing...";
    closeBtn.style.visibility = "hidden";
});

// Async Functions / Fetches (need to private read access token in config.js for next time)

async function fetchMoviesJSON(url) {
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxN2ZkNjVlOGVhNTQ0MDJkOTVjODljMzg0OWE3YzA2YiIsInN1YiI6IjY0ODIxZDYyYmYzMWYyMDBlM2ZiZWI1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KdnfglABbjrMPqqWICxofwlpa9nt9TRC9GRSbupnvPI'
        }
    };
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
}

// General Functions/Methods/init

function loadMovies(url) {
    fetchMoviesJSON(url).then((data) => {
        const generalMovieCont = document.querySelector(".movie-container");
        for (const movie of data.results) {
            const indivMovieCont = document.createElement('div');
            indivMovieCont.classname = "indiv-movie";
            generalMovieCont.appendChild(indivMovieCont);

            let moviePoster = document.createElement('img');
            moviePoster.className = "movie-poster"
            const moviePosterImg = "https://image.tmdb.org/t/p/w342" + movie.poster_path;
            moviePoster.src = moviePosterImg;
            if (movie.poster_path == null) {
                moviePoster.src = "";
                moviePoster.height = 513;
                moviePoster.width = 342;
            }
            indivMovieCont.appendChild(moviePoster);

            let titleRate = document.createElement('h3');
            titleRate.className = "movie-title-rating";
            const titleRateTxt = movie.original_title + " - ⭐ " + movie.vote_average;
            titleRate.innerText = titleRateTxt;
            indivMovieCont.appendChild(titleRate);
        }
    });
}

function init() {
    loadMovies(currentURL);
}

// Running method / 'main'

init();