// Global variables

let currentPage = 1; 
let currentQuery = ""; 

const nowPlayingURL = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page='; 
const searchURL1 = 'https://api.themoviedb.org/3/search/movie?query=';
const searchURL2 = '&include_adult=false&language=en-US&page=';

let currentURL = nowPlayingURL; 

// Buttons / Event Listeners

const searchBtn = document.querySelector("#search-button");
const loadMoreBtn = document.querySelector("#load-more");
const closeBtn = document.querySelector('#close-button');

loadMoreBtn.addEventListener("click", function(){
    currentPage++;
    currentURL = currentURL + currentPage;
    loadMovies(currentURL);
});

searchBtn.addEventListener("click", function(){
    const generalMovieCont = document.querySelector(".movie-container");
    generalMovieCont.innerHTML = '';
    currentPage = 1;
    currentQuery = document.querySelector('#search-form').value;
    currentURL = searchURL1 + currentQuery + searchURL2 + currentPage;
    loadMovies(currentURL);
    const subtitleTxt = document.querySelector("#subtitle");
    subtitleTxt.innerHTML = "Searching \"" + currentQuery + "\"...";
    closeBtn.style.visibility = "visible";
});

closeBtn.addEventListener("click", function(){
    const generalMovieCont = document.querySelector(".movie-container");
    generalMovieCont.innerHTML = '';
    currentPage = 1;
    currentURL = nowPlayingURL + currentPage;
    loadMovies(currentURL);
    const searchForm = document.querySelector("#search-form");
    searchForm.value = "";
    const subtitleTxt = document.querySelector("#subtitle");
    subtitleTxt.innerHTML = "Now playing...";
    closeBtn.style.visibility = "hidden";
});

// Async functions and fetches

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

// General functions/methods/init

function loadMovies(url) {
    // Call async function and obtain the array of movies by checking data.results
    fetchMoviesJSON(url).then((data) => {
        // Find 'movie-container' div (parent node) using querySelector method
        const generalMovieCont = document.querySelector(".movie-container");
        // Fetch an image and create an image element to append to 'movie-container'
        // Create individual movie container and append to general movie container
        // By appending, add attributes/classes to the individual movie container
        for (const movie of data.results) {
            // Appending individual movie container to general container
            const indivMovieCont = document.createElement('div');
            indivMovieCont.classname = "indiv-movie";
            generalMovieCont.appendChild(indivMovieCont);
            // Movie Poster
            let moviePoster = document.createElement('img');
            moviePoster.className = "movie-poster"
            const moviePosterImg = "https://image.tmdb.org/t/p/w342" + movie.poster_path; // worry about image being null ...
            moviePoster.src = moviePosterImg;
            if (movie.poster_path == null) {
                moviePoster.src = "";
                moviePoster.height = 513;
                moviePoster.width = 342;
            }
            indivMovieCont.appendChild(moviePoster);
            // Title and Rating
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

// Method runs
init();
