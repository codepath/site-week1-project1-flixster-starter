let fakeMoviesAPI = {
    "dates": {
        "maximum": "2023-06-05",
        "minimum": "2023-04-18"
    },
    "page": 1,
    "results": [
        {
            "adult": false,
            "backdrop_path": "/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg",
            "genre_ids": [
                16,
                10751,
                12,
                14,
                35
            ],
            "id": 502356,
            "original_language": "en",
            "original_title": "The Super Mario Bros. Movie",
            "overview": "While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe and wander into a magical new world. But when the brothers are separated, Mario embarks on an epic quest to find Luigi.",
            "popularity": 3392.2,
            "poster_path": "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
            "release_date": "2023-04-05",
            "title": "The Super Mario Bros. Movie",
            "video": false,
            "vote_average": 7.8,
            "vote_count": 4327
        },
        {
            "adult": false,
            "backdrop_path": "/2I5eBh98Q4aPq8WdQrHdTC8ARhY.jpg",
            "genre_ids": [
                28,
                12,
                16,
                878
            ],
            "id": 569094,
            "original_language": "en",
            "original_title": "Spider-Man: Across the Spider-Verse",
            "overview": "After reuniting with Gwen Stacy, Brooklyn’s full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider Society, a team of Spider-People charged with protecting the Multiverse’s very existence. But when the heroes clash on how to handle a new threat, Miles finds himself pitted against the other Spiders and must set out on his own to save those he loves most.",
            "popularity": 2921.844,
            "poster_path": "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
            "release_date": "2023-05-31",
            "title": "Spider-Man: Across the Spider-Verse",
            "video": false,
            "vote_average": 8.8,
            "vote_count": 739
        },
        {
            "adult": false,
            "backdrop_path": "/4t0oBFrJyweYPt0hocW6RUa0b6H.jpg",
            "genre_ids": [
                28,
                80,
                53
            ],
            "id": 385687,
            "original_language": "en",
            "original_title": "Fast X",
            "overview": "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path. Now, they confront the most lethal opponent they've ever faced: A terrifying threat emerging from the shadows of the past who's fueled by blood revenge, and who is determined to shatter this family and destroy everything—and everyone—that Dom loves, forever.",
            "popularity": 2334.66,
            "poster_path": "/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
            "release_date": "2023-05-17",
            "title": "Fast X",
            "video": false,
            "vote_average": 7.1,
            "vote_count": 854
        },
    ],
    "total_pages": 98,
    "total_results": 1951
}
const APIkey = '1e320c36139d1385dc507f9cd8c3890d'
let page_number = 1
let query = ""
let url = 'https://api.themoviedb.org/3/movie/now_playing?page='+  page_number +'&api_key=' + APIkey
let searchURL ='https://api.themoviedb.org/3/search/movie?query=' + query + '&page='+page_number + '&api_key=' +APIkey
let movieList = document.querySelector('.movie-list') 
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
    rating.classList.add('rating');
    rating.appendChild(ratingContent);

    let image = document.createElement('img');
    image.src = "https://image.tmdb.org/t/p/w342" + movieObject.poster_path;

    let name = document.createElement ('div');
    name.classList.add('name');
    name.innerText = movieObject.original_title;
    //create average container
    let averageContainer = document.createElement('div');
    averageContainer.classList.add('average');
    averageContainer.appendChild(image);
    averageContainer.appendChild(name)
    averageContainer.appendChild(star);
    averageContainer.appendChild(rating);
    movieList.appendChild(averageContainer);

}

document.querySelector("#srch-input").addEventListener("input",(event) =>{
    query = event.target.value
})

document.querySelector('#srch-button').addEventListener("click", async ()=> {
    searchURL ='https://api.themoviedb.org/3/search/movie?query=' + query + '&api_key=' +APIkey
    searching = true
    console.log(query)
    movieList.innerHTML = ""
    data = await ApiCallSearch()
    for(let i=0; i< data.results.length; i++){
        generateCards(data.results[i])
       }

})

const searchInput= document.querySelector("#srch-input")

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