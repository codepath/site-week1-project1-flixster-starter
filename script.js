const API_KEY = '7a7de07845bd21df37d2fed08dc1f49c'



function generateCards(movieObject){
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
}



  
  fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + API_KEY)
    .then(response => response.json())
    .then(response => {
        response.results.forEach(generateCards)
    })
    .catch(err => console.error(err));


    // function search() {

    // }

    let currAllowed = 0

    async function loadMore() {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=7a7de07845bd21df37d2fed08dc1f49c&offset=${currAllowed + 20}`);
          if (!response.ok) {
            throw new Error('Failed to fetch data from the API');
          }
          const data = await response.json();
          
          // Update the UI with the new results
          displayMovies(data.results);
          
          // Increment the page number for the next fetch
          currAllowed += 20;
        } catch (error) {
          console.error(error);
        }
      }

    const loadButton = document.querySelector('#load-button')
    loadButton.addEventListener('click', loadMore)
      

