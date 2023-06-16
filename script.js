
const searchButton = document.querySelector('#search-button');
let searchBar = document.querySelector('#search-input');

function generateCards(movieObject){
    let star = document.createElement('span');
    star.classList.add('star');
    let starContent = document.createTextNode('⭐️ ');
    star.appendChild(starContent);
    // document.body.appendChild(star);


    //create rating
    let rating = document.createElement('span');
    let ratingContent = document.createTextNode(movieObject.vote_average);
    star.classList.add('rating');
    star.appendChild(ratingContent);
    // document.body.appendChild(rating);

    //create average 
    let averageContainer = document.createElement('div');
    star.classList.add('average');
    averageContainer.appendChild(star);
    averageContainer.appendChild(rating);
    // document.body.appendChild(averageContainer);

    // create image 
    let image = document.createElement('img');
    let defaultImage = "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg"
    image.src = movieObject.poster_path ? "https://image.tmdb.org/t/p/w342" + movieObject.poster_path : defaultImage
    image.className = 'movie-poster'; 
    image.alt = movieObject.original_title; 

    //create name section
    let name = document.createElement('div');
    name.classList.add('name');
    name.innerText = movieObject.original_title;
    // document.body.insertBefore(name, averageContainer.nextSibling);

    //create movie section
    let movie = document.createElement('section');
    name.classList.add('movie');
    movie.appendChild(image);
    movie.appendChild(averageContainer);
    movie.appendChild(name);
    document.body.appendChild(movie);
    
    return movie;

}

const  movieContainer = document.querySelector('#movie-grid') 
// const loadMoreButton = document.querySelector('#load-more-button')

function display (page){
fetch( `https://api.themoviedb.org/3/discover/movie?api_key=57b58a649f61e3a9ea0cf603c932ffec&page=${page} `)
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < data.results.length; i++) {
      movieContainer.appendChild(generateCards(data.results[i]));
    }
  });



}
//////////////////////

let pageNumber = 1; 
let button = document.getElementById('load-more-movies-btn');

button.addEventListener('click',nextPage);

let searchMade = false;
let searchTerm = '';

function nextPage(){
    pageNumber += 1;
    if (searchMade) {
        search(searchTerm,pageNumber)
    } else {
        display(pageNumber)
    }
    

}
function search(keyword, page = 1){
    searchMade = true;
    searchTerm = keyword;
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1N2I1OGE2NDlmNjFlM2E5ZWEwY2Y2MDNjOTMyZmZlYyIsInN1YiI6IjY0ODIwNjAyZDJiMjA5MDEwYzE3Y2Y0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o-USUsNsrlcEm9NNKSAJ7022AYC37EhewmyoWt2Xhwg'
        }
      };
      
      fetch(`https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=${page}`, options)        .then(response => response.json())
        .then((data) => {
            console.log(data)
            for (let i = 0; i < data.results.length; i++) {
                movieContainer.appendChild(generateCards(data.results[i]));
                console.log(data.results[i])
            }

})
}
///////////////////////////
searchButton.addEventListener('click', function(event){
    event.preventDefault()
    movieContainer.innerHTML = ''
    let searchValue = searchBar.value
    search(searchValue);
    console.log(searchBar.value)
});
//////////////////////////////
const closeSearchButton = document.getElementById('close-search-btn');

closeSearchButton.addEventListener('click', function () {
    movieContainer.innerHTML = ''; 
    pageNumber = 1; 
    display(pageNumber); 
    searchBar.value = ''; 
    searchMade = false; 
});





window.onload = function(){
    display(1);

}

