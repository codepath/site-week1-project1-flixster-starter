//Global const variables
const API_KEY = "49cf0e81ad87db4a10b79c1291f7109c";
const page = 1;
const language = "en-US";
//query variables
const movieForm = document.querySelector("form");
const movieArea = document.getElementById("movie-area");
const getMovie = document.getElementById("search-movie");
const submitBtn = document.getElementById("submit-movie")
//api for Popular Movies
const apiUrl_Popular = "https://api.themoviedb.org/3/movie/popular" + "?api_key=" + API_KEY + "&language=" + language + "&page=" + page; //
const IMGPATH = "https://image.tmdb.org/t/p/w300";
//api for Searching Movies
const apiSearchEndpoint = "https://api.themoviedb.org/3/search/movie" //endpoint for searching movies

//event listener
movieForm.addEventListener("submit", getMovieResponse);

//searching movies
async function getMovieResponse(evt){
    evt.preventDefault();
    let getMovies = getMovie.value;
    console.log(getMovies);
    let searchedMovie = await findMovies(getMovies);
    console.log(searchedMovie);
    movieArea.innerHTML = ``;
    displayMovie(searchedMovie);
}

async function findMovies(getMovies){
    const apiUrl_Search = apiSearchEndpoint + "?api_key=" + API_KEY + "&language=" + language + "&page="+page+"&include_adult=false"+"&query=" + getMovies; //apiUrl for Searching
    console.log(apiUrl_Search);
    let responseMov = await fetch (apiUrl_Search);
    let responseDataMov = await responseMov.json();
    console.log(responseDataMov.results);
    return responseDataMov.results;
}


//default popular page
async function defaultPage(){
    const jsonResponse = await popularMovies();      
    displayMovie(jsonResponse);
}
async function popularMovies(){
    let response = await fetch(apiUrl_Popular);
    let responseData = await response.json();
    console.log(responseData.results);
    return responseData.results;
}
/*
function displayMovies(searchedMovie){
    console.log(searchedMovie);
    for(let i = 0; i < searchedMovie.length; i++){
        //let moviePoster = IMGPATH+searchedMovie[i].poster_path; 
        movieArea.innerHTML += `
            <img src = "${IMGPATH}${searchedMovie[i].poster_path}"></img>
            <div id="movie_title">Title: ${searchedMovie[i].original_title}</div>
            <div id="movie_rating">Rating: ${searchedMovie[i].vote_average}</div>
         `;

         console.log(searchedMovie[i].original_title);
         console.log(searchedMovie[i].vote_average);
    }
}
*/
//display movies
function displayMovie(jsonResponse){
    console.log(jsonResponse);
    for(let i = 0; i < jsonResponse.length; i++){
        let moviePoster = IMGPATH+jsonResponse[i].poster_path; 
        movieArea.innerHTML += `
            <img src = "${IMGPATH}${jsonResponse[i].poster_path}"></img>
            <div id="movie_title">Title: ${jsonResponse[i].original_title}</div>
            <div id="movie_rating">Rating: ${jsonResponse[i].vote_average}</div>
         `;

         console.log(jsonResponse[i].original_title);
         console.log(jsonResponse[i].vote_average);
    }
}
//onload 
window.onload = function(){
    defaultPage();
}



