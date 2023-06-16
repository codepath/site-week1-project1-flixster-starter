
// Global constants
let APIpage = 1;

/////////////////////////////
///// DISPLAY MOVIES ///////
/////////////////////////////

// function gets movies from API
function getMovies(){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzZlZWIzODJmZmNiMjMyNTFiMjJkNzRlNzg1OTQzMyIsInN1YiI6IjY0ODAwNWRlNjQ3NjU0MDE0MzMyZjQyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tZPmNIXblH37hDQ-EAzomK8hpXr3j9MrxXfEOik9Pms'
        }
      };
      // add page counter
      fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=' + APIpage.toString(), options)
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            for (let i = 0; i < data.results.length; i++) {
                generateCards(data.results[i]);
            }})
}


function generateCards(movieObject){
    // create star
    let star = document.createElement('span');
    star.classList.add('star');
    let starContent = document.createTextNode('⭐️');
    star.appendChild(starContent);

    // create rating
    let rating = document.createElement('span');
    let ratingContent = document.createTextNode(movieObject.vote_average);
    rating.classList.add('movie-votes');
    rating.appendChild(ratingContent);

    // create average container 
    let averageContainer = document.createElement('div');
    averageContainer.appendChild(star);
    averageContainer.appendChild(rating);
    averageContainer.classList.add('average');
    //document.body.appendChild(averageContainer);

    // create image
    let image = document.createElement('img');
    image.classList.add('movie-poster');
    image.src="https://image.tmdb.org/t/p/w342" + movieObject.poster_path;
    //document.body.insertBefore(image,averageContainer);

    // create name
    let title = document.createElement('div');
    title.classList.add('movie-title');
    title.innerText = movieObject.original_title;
    //document.body.insertBefore(name,averageContainer.nextSibling)

    // create section
    let movie = document.createElement('section');
    movie.classList.add('movie-card');
    movie.appendChild(image);
    movie.setAttribute("id", movieObject.id)
    movie.appendChild(averageContainer);
    movie.appendChild(title);
    // select flexbox item and add movie as items
    let grid = document.querySelector("#movie-grid");
    grid.appendChild(movie);


}

// DEFAULT LOAD //
// when page loads call function to get movies from API
document.onload = getMovies();

////////////////////////
// LOAD MORE FEATURE //
///////////////////////
let loadMore = document.getElementById("load-more-movies-btn");

// // variables 
let searchInput = document.getElementById("search-input");
let grid = document.querySelector("#movie-grid");

loadMore.addEventListener('click', () => {
    if (searchInput.value === ''){
    APIpage++;
    getMovies();
    } else {
            const options = {
            method: 'GET',
            headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzZlZWIzODJmZmNiMjMyNTFiMjJkNzRlNzg1OTQzMyIsInN1YiI6IjY0ODAwNWRlNjQ3NjU0MDE0MzMyZjQyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tZPmNIXblH37hDQ-EAzomK8hpXr3j9MrxXfEOik9Pms'
            }
            };
        
            fetch('https://api.themoviedb.org/3/search/movie?query=' + searchInput.value.toString() +'&include_adult=false&language=en-US&page=' + APIpage.toString(), options)
            .then(response => response.json())
            .then((data) => {
                for (let i = 0; i < data.results.length; i++) {
                    generateCards(data.results[i]);
                }})
    }
})


// ////////////////////
/// SEARCH FEATURE ////
//////////////////////



// search function

searchInput.addEventListener('keyup',()=> {
    grid.innerHTML = "";
    console.log(searchInput.value);
    if (searchInput.value.length >= 1) {
            const options = {
            method: 'GET',
            headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzZlZWIzODJmZmNiMjMyNTFiMjJkNzRlNzg1OTQzMyIsInN1YiI6IjY0ODAwNWRlNjQ3NjU0MDE0MzMyZjQyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tZPmNIXblH37hDQ-EAzomK8hpXr3j9MrxXfEOik9Pms'
            }
            };
        
            fetch('https://api.themoviedb.org/3/search/movie?query=' + searchInput.value.toString() +'&include_adult=false&language=en-US&page=' + APIpage.toString(), options)
            .then(response => response.json())
            .then((data) => {
                for (let i = 0; i < data.results.length; i++) {
                    generateCards(data.results[i]);
                }})
    } else {
        APIpage = 1;
        getMovies();
    }
});

/////////////////////
// TOGLE DARK MODE //
/////////////////////
let themeButton = document.getElementById("theme-button");

function toggleDarkMode(){
    document.body.classList.toggle("dark-mode");
  }

themeButton.addEventListener("click", toggleDarkMode);

// CLEAR SEARCH BUTTON //

if (searchInput.value !== ''){
    let clearBtn = document.getElementById("clear-button");
    clearBtn.addEventListener('click')
};