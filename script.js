const API_KEY  = "ec19ad523e949b880b38dce4fe91d6fe"
let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=ec19ad523e949b880b38dce4fe91d6fe`
let search_url = 'https://api.themoviedb.org/3/search/movie?query='

let form = document.querySelector('#search-form')
let search = document.querySelector('#search')
let movieContainer = document.querySelector('#movies-grid')
let loadMore = document.querySelector('#load-more') 
let home = document.querySelector("h1")

populateMovieSpace(url)

home.addEventListener('click', () => {
    movieContainer.innerHTML = ''
    populateMovieSpace(url)
})
async function populateMovieSpace(url) {
    const response = await fetch(url)
    const data = await response.json()
    console.log(data.results)
    data.results.forEach( (movie) => {
        generateCard(movie);
    })
}

function generateCard(movieAPI){
    //create star
    let star = document.createElement('span') 
    let starContent = document.createTextNode("⭐️")
    star.appendChild(starContent)
    star.classList.add("star")

    //create rating
    let rating = document.createElement('span')
    let vote_average = (movieAPI.vote_average).toFixed(1);
    let ratingContent = document.createTextNode(vote_average)
    rating.appendChild(ratingContent)
    rating.classList.add("rating")

    //create average container
    let averageContainer = document.createElement('div')
    averageContainer.appendChild(star)
    averageContainer.appendChild(rating)
    averageContainer.classList.add("average")

    //create image
    let image = document.createElement('img')
    if(movieAPI.poster_path !== null){
        image.src = "https://image.tmdb.org/t/p/w342" + movieAPI.poster_path
    }
    else{
       image.src = "assets/error.webp" 
    }
    image.alt = movieAPI.original_title

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

form.addEventListener('submit', (e) => {
    e.preventDefault()
    searchValue = search.value
    console.log(searchValue)
    if (searchValue && searchValue !==''){
        movieContainer.innerHTML = ''
        populateMovieSpace(search_url+searchValue+"&api_key="+API_KEY)
        search.value = ''
    }
    else{
        window.location.reload()
    }
})

let pageNum = 2
loadMore.addEventListener('click', () => {
    populateMovieSpace(url+"&page="+pageNum.toString())
    pageNum += 1
})


