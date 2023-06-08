async function fetchMoviesJSON() {
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxN2ZkNjVlOGVhNTQ0MDJkOTVjODljMzg0OWE3YzA2YiIsInN1YiI6IjY0ODIxZDYyYmYzMWYyMDBlM2ZiZWI1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KdnfglABbjrMPqqWICxofwlpa9nt9TRC9GRSbupnvPI'
        }
    };
    const res = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options);
    const data = await res.json();
    return data;
}

function displayNowPlayingMovies() {
    // Call async function and obtain the array of 'Now playing' movies by checking data.results
    fetchMoviesJSON().then((data) => {
        // Find 'movie-container' div (parent node) using querySelector method
        const generalMovieCont = document.querySelector(".movie-container");
        // Fetch an image and create an image element to append to 'movie-container'
        // Create individual movie container and append to general movie container
        // By appending, add attributes/classes to the individual movie container
        for (const movie of data.results) {
            // Appending individual movie container to general container
            const indivMovieCont = document.createElement('div');
            generalMovieCont.appendChild(indivMovieCont);
            // Movie Poster
            let moviePoster = document.createElement('img');
            moviePoster.className = "movie-poster"
            const moviePosterImg = "https://image.tmdb.org/t/p/w342" + movie.poster_path;
            moviePoster.src = moviePosterImg;
            indivMovieCont.appendChild(moviePoster);
            // Title and Rating
            let titleRate = document.createElement('h3');
            titleRate.className = "movie-title-rating";
            const titleRateTxt = movie.original_title + " - ⭐ " + movie.vote_average;
            titleRate.innerText = titleRateTxt;
            indivMovieCont.appendChild(titleRate);
        }
    });
}

function init() {
    displayNowPlayingMovies();
}

init();
