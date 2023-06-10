const APIkey = '1e320c36139d1385dc507f9cd8c3890d'
let page_number = 1
let query = ""
let url = 'https://api.themoviedb.org/3/movie/now_playing?page='+  page_number +'&api_key=' + APIkey
let searchURL ='https://api.themoviedb.org/3/search/movie?query=' + query + '&page='+page_number + '&api_key=' +APIkey
let movieList = document.getElementById('movies-grid') 
let searching = false 

async function ApiCall(){
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

async function ApiCallSearch(){
    const res = await fetch(searchURL);
    const data = await res.json();
    return data;
}

function generateCards(movieObject) {
    // create star
    let star = document.createElement('span');
    star.classList.add('star');
    let starContent = document.createTextNode('⭐️');
    star.appendChild(starContent);

    //create rating
    let rating = document.createElement('span');
    let ratingContent = document.createTextNode(movieObject.vote_average);
    rating.classList.add('movie-votes');
    rating.appendChild(ratingContent);

    let image = document.createElement('img');
    image.classList.add("movie-poster")
    image.src = "https://image.tmdb.org/t/p/w342" + movieObject.poster_path;

    let name = document.createElement ('div');
    name.classList.add('name');
    name.innerText = movieObject.original_title;
    //create average container
    let averageContainer = document.createElement('div');
    averageContainer.classList.add('movie-card');
    averageContainer.appendChild(image);
    averageContainer.appendChild(name)
    averageContainer.appendChild(star);
    averageContainer.appendChild(rating);
    movieList.appendChild(averageContainer);

}

document.querySelector("#search-input").addEventListener("input",(event) =>{
    query = event.target.value
})

document.querySelector('#srch-button').addEventListener("click", async ()=> {
    if (query.length>0){
        event.preventDefault()
        searchURL ='https://api.themoviedb.org/3/search/movie?query=' + query + '&api_key=' +APIkey
        searching = true
        console.log(query)
        movieList.innerHTML = ""
        data = await ApiCallSearch()
        for(let i=0; i< data.results.length; i++){
            generateCards(data.results[i])
        }
    }
    

})

const searchInput= document.querySelector("#search-input")

searchInput.addEventListener("input",(event) =>{
    query = event.target.value
    // event.target.value=''
})

document.querySelector('#slay-btn').addEventListener("click", async ()=> {
    //searchURL ='https://api.themoviedb.org/3/search/movie?query=' + query + '&api_key=' +APIkey

    page_number +=1
    console.log(query,'pg', page_number)
    if (searching) {
        searchURL= 'https://api.themoviedb.org/3/search/movie?query=' + query + '&page='+page_number + '&api_key=' +APIkey
        data = await ApiCallSearch()

    } else {
        url = 'https://api.themoviedb.org/3/movie/now_playing?page='+  page_number +'&api_key=' + APIkey
    data = await ApiCall()
    }
   // page_number +=1
    console.log(data)
    for(let i=0; i< data.results.length; i++){
        generateCards(data.results[i])
       }

})

document.querySelector('#close-search-btn').addEventListener("click", async ()=> {
    movieList.innerHTML=""
    page_number = 1
    searching = false
    url = 'https://api.themoviedb.org/3/movie/now_playing?page='+  page_number +'&api_key=' + APIkey
    query = ""
    searchInput.value=''
    data = await ApiCall()
    for(let i=0; i< data.results.length; i++){
        generateCards(data.results[i])
       }

})


window.onload = async function(){
    console.log('function working')
    data = await ApiCall()
    console.log(data)
     for(let i=0; i< data.results.length; i++){
     generateCards(data.results[i])
    }
}