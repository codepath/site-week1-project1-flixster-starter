 // global constants
 API_KEY = "7588252b35a0bbe04a7685828388c9e8"
 BASE_API_URL  = "https://api.themoviedb.org/3"
 API_KEY_QUERY = "?api_key=" + API_KEY
 
 // variables
 let searchTerm = "";
 let currentPage = 1;
 
 // DOM selectors
 const closeSearchBtn = document.querySelector("#close-search-btn");
 const moviesGrid = document.querySelector("#movies-grid");
 const loadMoreBtn = document.querySelector("#load-more-movies-btn");
 const searchBtn = document.querySelector("#clicker");
 
 
 // TESTER
 let latestApiCall = ""
 currentPage = 1
 
 // event listeners
 closeSearchBtn.addEventListener("click", closeSearch);
 loadMoreBtn.addEventListener("click", loadMoreMovies);
 searchBtn.addEventListener("click", handleSearchFormSubmit);
 
 async function getResults (apiRequestURL){
     latestApiCall = apiRequestURL
     console.log("called URL:", apiRequestURL);
     let response = await fetch(apiRequestURL);
     console.log("response:", response)
     let resultsData = await response.json();
     console.log("resultsData:", resultsData);
     
     return resultsData
 }
 
 function displayResults (resultsData){
     movieResults = resultsData.results 
     movieResults.forEach( movie => 
         moviesGrid.innerHTML += `
         <div class="movie-card">
             <img class="movie-poster" src="${"https://image.tmdb.org/t/p/original"+movie.poster_path}">
             <div class="movie-card-info">
                 <h2 class="movie-title">${movie.title}</h2>
                 <h3 class="movie-votes">${movie.vote_average}</h3>
             </div>
         </div>
     `
 )}
 
 async function displayNowPlaying (){
     results = await getResults(BASE_API_URL + "/movie/now_playing" + API_KEY_QUERY);
     displayResults(results);
 }
 
 async function handleSearchFormSubmit (evt){
     // prevent from reloading
     evt.preventDefault();
     
     // clear current movies so results show up at the top
     moviesGrid.innerHTML = "";
 
     // reset current page to 1
     currentPage = 1;
 
     // grab input from search form
     searchTerm = document.getElementById('search-input').value;
     
     let apiRequestURL = BASE_API_URL + "/search/movie" + API_KEY_QUERY + "&query=" + searchTerm
     results = await getResults(apiRequestURL)
 
     displayResults(results)
 
     // show close search button
     closeSearchBtn.classList.remove("hidden");
 
 }
 
 async function loadMoreMovies (){
     currentPage += 1
     results = await getResults(latestApiCall+"&page=" + currentPage)
     console.log(results)
     displayResults(results)
 }
 
 function closeSearch (evt){
     moviesGrid.innerHTML = "";
     currentPage = 1;
     displayNowPlaying();
     closeSearchBtn.classList.add("hidden");
 }
 
 window.onload = function () {
     currentPage = 1;
     displayNowPlaying();
   }