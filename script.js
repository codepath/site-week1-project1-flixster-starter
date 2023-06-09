API_KEY = "a7985326430d6fbc3cd513d95d89bb20"
let url = "https://api.themoviedb.org/3/discover/movie?api_key=a7985326430d6fbc3cd513d95d89bb20"

 //create star
 function generateCards(movieObject) {
    let star = document.createElement('span');
    star.classList.add('star');
    let starContent = document.createTextNode('⭐️');
    star.appendChild(starContent);

//create rating 
    let rating = document.createElement('span');
    rating.classList.add('rating');
    let ratingContent = document.createTextNode(movieObject.vote_average);
    rating.appendChild(ratingContent);
   
//create average container 
 let averageContainer = document.createElement('div');
 averageContainer.classList.add('averageContainer');
 averageContainer.appendChild(star);
 averageContainer.appendChild(rating);
 //document.body.appendChild(averageContainer);


let image = document.createElement('img');
image.src = "https://image.tmdb.org/t/p/w342" + movieObject.poster_path
//document.body.insertBefore(image, averageContainer);


let name = document.createElement('div');
name.classList.add('name');
name.innerText = movieObject.original_title
//document.body.insertBefore(name, averageContainer.nextSibling);

//create movie section
let movie = document.createElement('section')
movie.classList.add('name');
movie.appendChild(image);
movie.appendChild(averageContainer);
movie.appendChild(name);
document.body.appendChild(movie);

const parent = document.querySelector("#movieContainer");
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
fetch('https://api.themoviedb.org/3/discover/movie?api_key=a7985326430d6fbc3cd513d95d89bb20')
.then(response => response.json())
.then((data) => {
    for (let i=0; i <data.results.length; i+=1) {
        generateCards(data.results[i])
    }
}
)
//loading more movies 
moreMovies();
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

 //
 window.onload=function(){
  let showMoreButton = document.querySelector("#show-more-button")
  showMoreButton.addEventListener('click', morePages)
}






