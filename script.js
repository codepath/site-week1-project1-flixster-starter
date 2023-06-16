
const APIKey= 'ef60cd7a93d72315d97d352ed875d11c'
const baseURL= 'https://api.themoviedb.org/3/movie/now_playing'
const baseSearchURL= 'https://api.themoviedb.org/3/search/movie'

const state= {
    searchTerm: '',
    page: 1,
    searching: false
}
let url= `${baseURL}?page=${state.page}&api_key=${APIKey}`


const searchForm= document.getElementById('search-form')
const searchInput= document.getElementById('search-input')
const movie_container= document.getElementById('movies-grid')
const showMoreBtn= document.getElementById('load-more-movies-btn')
const closeSearchBtn= document.getElementById('close-search-btn')


function displayResults(results){
    //updating DOM
    for (const movie of results){
        generateCards(movie)
    }
}



/**
 * 
 * @param {string} searchTerm 
 * @param {boolean} initial 
 * @returns data requested from API 
 */
async function getMovieAPIRes(searchTerm, page, searching=false){
    if (searching){
        url= `${baseSearchURL}?query=${searchTerm}&page=${page}&api_key=${APIKey}`
    } else {
        url= `${baseURL}?page=${page}&api_key=${APIKey}`
    }
    console.log(url)
    const data= fetch(url)
        .then((response) => response.json())
    const result= await data
    return result
}   


function generateCards(movieObj){
    // create star
    let star= document.createElement('span')
    star.classList.add('star')
    let starContent= document.createTextNode('⭐️')
    star.appendChild(starContent)
    document.body.appendChild(star)


    // create rating
    let avg= movieObj.vote_average
    let rating= document.createElement('span')
    rating.classList.add('avg')
    let ratingContent= document.createTextNode(avg)
    rating.appendChild(ratingContent)
    document.body.appendChild(rating)

    //create average container
    let avgContainer= document.createElement('div')
    avgContainer.classList.add('movie-votes')
    avgContainer.appendChild(star)
    avgContainer.appendChild(rating)
    document.body.appendChild(avgContainer)

    //create image
    let image= document.createElement('img')
    image.classList.add('movie-poster')
    image.src= 'https://image.tmdb.org/t/p/w342' + movieObj.poster_path
    document.body.insertBefore(image, avgContainer)


    //create name
    let name= document.createElement('div')
    name.classList.add('movie-title')
    name.innerHTML= movieObj.original_title
    document.body.insertBefore(name, avgContainer.nextSibling)

    //create movie
    let movie= document.createElement('section')
    movie.classList.add('movie-card')
    movie.appendChild(image)
    movie.appendChild(avgContainer)
    movie.appendChild(name)

    const movie_container= document.getElementById('movies-grid')
    movie_container.appendChild(movie)
    
}

async function handleFormSubmit(event){
    event.preventDefault()

    // reset results display section
    movie_container.innerHTML = ""

    state.searching=true
    
    state.page=1
    state.searchTerm= searchInput.value
    const movies= await getMovieAPIRes(state.searchTerm, state.page, true)
    state.results=movies.results
    displayResults(movies.results)
    state.page+=1
}

async function handleShowMore(event){
    
    let movies 
    if (state.searching){
        movies= await getMovieAPIRes(state.searchTerm, state.page,true)
    } else{
        movies= await getMovieAPIRes(state.searchTerm, state.page)
    }
    
    displayResults(movies.results)
    state.page+=1
}

async function closeSearch(event){
        movie_container.innerHTML = ""
        state.page= 1
        state.searching= false
        state.searchTerm, searchInput.value = ''
        const movies= await getMovieAPIRes('')
        displayResults(movies.results)
        state.page+=1
    
}


window.onload = async () =>{
    const movies= await getMovieAPIRes('')
    displayResults(movies.results)
    state.page+=1
    closeSearchBtn.addEventListener('click', closeSearch)
    searchForm.addEventListener('submit', handleFormSubmit)
    showMoreBtn.addEventListener('click', handleShowMore)
    

}