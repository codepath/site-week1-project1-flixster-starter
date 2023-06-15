const API_KEY = '7a7de07845bd21df37d2fed08dc1f49c';
const currstate = {
  page: 1,
  searchTerm: ""
};

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("bar");
const resultsEl = document.getElementById("results");

const rootUrl = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&page=';
const filterUrl = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1';
const apiKey = API_KEY;

function generateCards(movieObjects, append = false) {
  if (!append) {
    resultsEl.innerHTML = "";
  }

  movieObjects.forEach((movieObject) => {
    // creates star
    let star = document.createElement('span');
    star.classList.add('star');
    let starContent = document.createTextNode("⭐️");
    star.appendChild(starContent);

    // creates rating
    let rating = document.createElement('span');
    rating.classList.add('rating')
    let ratingContent = document.createTextNode(movieObject.vote_average);
    star.appendChild(ratingContent);

    // create container for rating
    let avgContainer = document.createElement('div');
    avgContainer.classList.add('movie-votes')
    avgContainer.appendChild(star);
    avgContainer.appendChild(rating);

    // create img
    let img = document.createElement('img')
    img.classList.add('movie-poster');
    img.src = "https://image.tmdb.org/t/p/w342" + movieObject.poster_path;

    // create title
    let title = document.createElement('div')
    title.classList.add('movie-title')
    title.innerText = movieObject.original_title

    // create movie container
    let movieContainer = document.createElement('section')
    movieContainer.classList.add('movie-card')
    movieContainer.appendChild(img)
    movieContainer.appendChild(avgContainer)
    movieContainer.appendChild(title)
    document.body.appendChild(movieContainer)

    resultsEl.appendChild(movieContainer);
  });
}

async function fetchMovieData(page) {
  const url = rootUrl + `${page}&api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const response_1 = await response.json();
    return response_1.results;
  } catch (err) {
    console.error(err);
    return [];
  }
}

function showInitialMovieCards() {
  fetchMovieData(currstate.page)
    .then(movieResults => {
      const initialCards = movieResults.slice(0, 9); // Show only the first 9 movie cards
      generateCards(initialCards);
    });
}

async function searchMovies(searchTerm) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&api_key=7a7de07845bd21df37d2fed08dc1f49c&query=${searchTerm}`
      );
    const data = await response.json();
    console.log(data.results)
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== "") {
    searchMovies(searchTerm)
      .then((searchResults) => {
        console.log(searchResults)
        generateCards(searchResults);
      });
  }
}

function loadMore() {
  currstate.page += 1;

  fetch(rootUrl + `${currstate.page}&api_key=${apiKey}`)
    .then((response) => response.json())
    .then((response) => {
      const movieResults = response.results;
      generateCards(movieResults, true);
    })
    .catch((err) => console.error(err));
}

window.onload = function () {
  searchForm.addEventListener("submit", handleFormSubmit);
  const showMoreBtn = document.getElementById("show-more");
  showMoreBtn.addEventListener("click", loadMore);
  showInitialMovieCards();
};
