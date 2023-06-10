API_KEY = "a7985326430d6fbc3cd513d95d89bb20"
let url = "https://api.themoviedb.org/3/movie/now_playing?api_key=a7985326430d6fbc3cd513d95d89bb20"
let searchURL = "https://api.themoviedb.org/3/search/movie?query="

 //create star
 function generateCards(movieObject) {
    let star = document.createElement('span');
    star.classList.add('star');
    let starContent = document.createTextNode('⭐️');
    star.appendChild(starContent);

//create rating 
    let rating = document.createElement('span');
    rating.classList.add('movie-votes');
    let ratingContent = document.createTextNode(movieObject.vote_average);
    rating.appendChild(ratingContent);
   
//create average container 
 let averageContainer = document.createElement('div');
 averageContainer.classList.add('averageContainer');
 averageContainer.appendChild(star);
 averageContainer.appendChild(rating);
 //document.body.appendChild(averageContainer);


let image = document.createElement('img');
image.classList.add('movie-poster')
image.src = "https://image.tmdb.org/t/p/w342" + movieObject.poster_path
//document.body.insertBefore(image, averageContainer);

image.alt = movieObject.original_title


let name = document.createElement('div');
name.classList.add('movie-title');
name.innerText = movieObject.original_title
//document.body.insertBefore(name, averageContainer.nextSibling);

//create movie section
let movie = document.createElement('section')
movie.classList.add('movie-card');
movie.appendChild(image);
movie.appendChild(averageContainer);
movie.appendChild(name);
document.body.appendChild(movie);

const parent = document.querySelector("#movies-grid");
parent.appendChild(movie);
 }
 
function moreMovies() {
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzk4NTMyNjQzMGQ2ZmJjM2NkNTEzZDk1ZDg5YmIyMCIsInN1YiI6IjY0ODIwM2QxOTkyNTljMDExYzNlZmQ3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UPPnWQ-g1iOR0VlqHpbf52S39MiOUtisubFnFYa2ATc"
    }
  }
};
  
//API 
fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=a7985326430d6fbc3cd513d95d89bb20')
.then(response => response.json())
.then((data) => {
    for (let i=0; i <data.results.length; i+=1) {
        generateCards(data.results[i])
    }
}
)
//loading more movies 
//moreMovies();
let i = 2
let pageNumber = i.toString();
function morePages () { 
  let result = url.concat("&page=",i);
  fetch(result)
 .then(response => response.json())
 .then((data) => {
     for (let i=0; i <data.results.length; i+=1) {
         generateCards(data.results[i])
     }
 }
 )
 i++;
}

let search = document.querySelector("#search-input")
let form = document.querySelector("#search-form")
let movieContainer = document.querySelector("#movies-grid")
let reset = document.querySelector("#close-search-btn")


// reset.addEventListener("reset", logReset);

reset.addEventListener('click', () =>{
  movieContainer.innerHTML=''
  fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=a7985326430d6fbc3cd513d95d89bb20')
.then(response => response.json())
.then((data) => {
    for (let i=0; i <data.results.length; i+=1) {
        generateCards(data.results[i])
    }
}
)
}
)

 form.addEventListener('submit', (e)=>{
  e.preventDefault()
  let searchValue = search.value
  if(searchValue && searchValue !== ''){
    movieContainer.innerHTML =''
    fetch(searchURL+searchValue +"&api_key=a7985326430d6fbc3cd513d95d89bb20")
 .then(response => response.json())
 .then((data) => {
     for (let i=0; i <data.results.length; i+=1) {
         generateCards(data.results[i])
     }
 }
 )
  searchValue = ''
  }else{
    window.location.reload()
  }
}
)

 window.onload=function(){
  let showMoreButton = document.querySelector("#load-more-movies-btn")
  showMoreButton.addEventListener('click', morePages)
}

