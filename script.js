const API_KEY  = "ec19ad523e949b880b38dce4fe91d6fe"
let url = `https://api.themoviedb.org/3/discover/movie?api_key=ec19ad523e949b880b38dce4fe91d6fe`

async function populateMovieSpace() {
    const response = await fetch(url)
    const data = await response.json()
    data.results.forEach( (movie) => {
        generateCard(movie);
    })
    
}


let movieContainer = document.querySelector('#movie-container')
// movieContainer.classList.add("movieContainer")
// document.body.appendChild(movieContainer)

function generateCard(movieAPI){
    //create star
    let star = document.createElement('span') 
    let starContent = document.createTextNode("⭐️")
    star.appendChild(starContent)
    star.classList.add("star")

    //create rating
    let rating = document.createElement('span')
    let ratingContent = document.createTextNode(movieAPI.vote_average)
    rating.appendChild(ratingContent)
    rating.classList.add("rating")

    //create average container
    let averageContainer = document.createElement('div')
    averageContainer.appendChild(star)
    averageContainer.appendChild(rating)
    averageContainer.classList.add("average")

    //create image
    let image = document.createElement('img')
    image.src = "https://image.tmdb.org/t/p/w342" + movieAPI.poster_path

    //create movie-name
    let movieName = document.createElement('div')
    movieName.classList.add('movie-name')
    movieName.innerText = movieAPI.original_title

    let movie = document.createElement('section')
    movie.classList.add('movie')
    movie.appendChild(image)
    movie.appendChild(averageContainer)
    movie.appendChild(movieName)

    movieContainer.appendChild(movie)
}

populateMovieSpace()