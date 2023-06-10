function generateCards(movieObject){ // function that will generate the movie cards in our mini netflix
    // create star
    let star = document.createElement('span'); // creating a span element
    let starContent = document.createTextNode('⭐️'); // the content of the span star will have the emoji of star
    star.appendChild(starContent); // we then put the content inside the span star
    //document.body.appendChild(star); // we then put the star span inside the body of the html document
    star.classList.add('star')

    // create rating
    let rating = document.createElement('span');
    let ratingContent = document.createTextNode(movieObject.vote_average);
    rating.appendChild(ratingContent);
    document.body.appendChild(rating);
    rating.classList.add('rating')

    // create average container

    let averageContainer = document.createElement('div');
    averageContainer.classList.add('movie-votes');
    averageContainer.appendChild(star);
    averageContainer.appendChild(rating);
    document.body.appendChild(averageContainer);

    // image

    let image = document.createElement('img');
    let defaultImage = "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg"
    image.src = movieObject.poster_path ? "https://image.tmdb.org/t/p/w342" + movieObject.poster_path : defaultImage
    image.className = 'movie-poster'
    image.alt = movieObject.original_title;
    document.body.insertBefore(image, averageContainer);

    // movie name

    let name = document.createElement('div')
    name.classList.add('movie-title');
    name.innerText = movieObject.original_title;
    document.body.insertBefore(name, averageContainer.nextSibling);

    //create movie section
    let movie = document.createElement('section');
    movie.appendChild(image)
    movie.appendChild(averageContainer)
    movie.appendChild(name)
    document.body.appendChild(movie)
    movie.classList.add('movie-card')

    return movie;

}




// // create movie container
const movieContainer = document.querySelector('#movie-grid')


function fetchAndDisplay(page){


    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=4026d59afea2b4fa4ab32088708c56c1&page=${page}`).then((response) => response.json()).then((data) => {
    console.log(data);
    for (let i = 0; i<data.results.length; i++){

        movieContainer.appendChild(generateCards(data.results[i])) ;
        
    
    }
    })

}

window.onload = function(){ 
    
    fetchAndDisplay(1);

}




// LOAD MORE BUTTON

const searchName = document.getElementById('search-input')
let pageSearch = 2;
let pageNum = 1;
let button = document.getElementById('load-more-movies-btn');
button.addEventListener('click', () => {iterate(searchName.value)})


function iterate(movieName){
    
    if (movieName === ''){
    pageNum += 1;
    fetchAndDisplay(pageNum);
    pageSearch = 2;

    }

    else{
        console.log("before",pageSearch)
        fetch(`https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=4026d59afea2b4fa4ab32088708c56c1&page=${pageSearch}`).then((response) => response.json()).then((data) => {
        console.log(data);
        
        //movieContainer.innerHTML = ''; // clearing previous movies
        
        for (let i = 0; i<data.results.length; i++){
    
            movieContainer.appendChild(generateCards(data.results[i])) ;
            
        
        }
        })

        pageSearch += 1;
        console.log("after",pageSearch)
    }



    
  
}

// SEARCH FUNCTION

// Function executed on submit


function logSearch(movieName){

    console.log('The form was submitted.');

    if (movieName === ''){

        pageCount = 0; // Reset position of search
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=4026d59afea2b4fa4ab32088708c56c1&page=1`).then((response) => response.json()).then((data) => {
        console.log(data);

        movieContainer.innerHTML = ''; // clearing previous movies
        
        for (let i = 0; i<data.results.length; i++){

        movieContainer.appendChild(generateCards(data.results[i])) ;
        
    
    }
    })
    pageSearch = 2;


    }

    else{

    fetch(`https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=4026d59afea2b4fa4ab32088708c56c1&page=1`).then((response) => response.json()).then((data) => {
        console.log(data);
        
        movieContainer.innerHTML = ''; // clearing previous movies
        
        for (let i = 0; i<data.results.length; i++){
    
            movieContainer.appendChild(generateCards(data.results[i])) ;
            
        
        }
        })

        pageNum = 1;

    }

}


  
//   // Select form element
  
const form = document.getElementById('search-form');
  
  
// // Connect the function to your form by
// // adding a submit event listener


let pageCount = 1; 
form.addEventListener('submit', function (event) {
    event.preventDefault();
    
    logSearch(searchName.value,pageCount);
});

let buttonClearSearch = document.querySelector('#close-search-btn');
buttonClearSearch.addEventListener('click', function (event) {
    event.preventDefault();
    searchName.value = ''

    logSearch(searchName.value);

    
});





  
  