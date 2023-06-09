// let fakeMoviesAPI = {
//     "dates": {
//         "maximum": "2023-06-05",
//         "minimum": "2023-04-18"
//     },
//     "page": 1,
//     "results": [
//         {
//             "adult": false,
//             "backdrop_path": "/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg",
//             "genre_ids": [
//                 16,
//                 10751,
//                 12,
//                 14,
//                 35
//             ],
//             "id": 502356,
//             "original_language": "en",
//             "original_title": "The Super Mario Bros. Movie",
//             "overview": "While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe and wander into a magical new world. But when the brothers are separated, Mario embarks on an epic quest to find Luigi.",
//             "popularity": 3392.2,
//             "poster_path": "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
//             "release_date": "2023-04-05",
//             "title": "The Super Mario Bros. Movie",
//             "video": false,
//             "vote_average": 7.8,
//             "vote_count": 4327
//         },
//         {
//             "adult": false,
//             "backdrop_path": "/2I5eBh98Q4aPq8WdQrHdTC8ARhY.jpg",
//             "genre_ids": [
//                 28,
//                 12,
//                 16,
//                 878
//             ],
//             "id": 569094,
//             "original_language": "en",
//             "original_title": "Spider-Man: Across the Spider-Verse",
//             "overview": "After reuniting with Gwen Stacy, Brooklyn’s full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider Society, a team of Spider-People charged with protecting the Multiverse’s very existence. But when the heroes clash on how to handle a new threat, Miles finds himself pitted against the other Spiders and must set out on his own to save those he loves most.",
//             "popularity": 2921.844,
//             "poster_path": "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
//             "release_date": "2023-05-31",
//             "title": "Spider-Man: Across the Spider-Verse",
//             "video": false,
//             "vote_average": 8.8,
//             "vote_count": 739
//         },
//         {
//             "adult": false,
//             "backdrop_path": "/4t0oBFrJyweYPt0hocW6RUa0b6H.jpg",
//             "genre_ids": [
//                 28,
//                 80,
//                 53
//             ],
//             "id": 385687,
//             "original_language": "en",
//             "original_title": "Fast X",
//             "overview": "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path. Now, they confront the most lethal opponent they've ever faced: A terrifying threat emerging from the shadows of the past who's fueled by blood revenge, and who is determined to shatter this family and destroy everything—and everyone—that Dom loves, forever.",
//             "popularity": 2334.66,
//             "poster_path": "/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
//             "release_date": "2023-05-17",
//             "title": "Fast X",
//             "video": false,
//             "vote_average": 7.1,
//             "vote_count": 854
//         },
//     ],
//     "total_pages": 98,
//     "total_results": 1951
// }

// async function fn() {
//     const res = await fetch(url)
//     const data = await response.json()
//     console.log(data)
//   }
  
//   fn()



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
    averageContainer.classList.add('average');
    averageContainer.appendChild(star);
    averageContainer.appendChild(rating);
    document.body.appendChild(averageContainer);

    // image

    let image = document.createElement('img');
    image.src = "https://image.tmdb.org/t/p/w342" + movieObject.poster_path
    document.body.insertBefore(image, averageContainer);

    // movie name

    let name = document.createElement('div')
    name.classList.add('name');
    name.innerText = movieObject.original_title;
    document.body.insertBefore(name, averageContainer.nextSibling);

    //create movie section
    let movie = document.createElement('section');
    movie.appendChild(image)
    movie.appendChild(averageContainer)
    movie.appendChild(name)
    document.body.appendChild(movie)
    movie.classList.add('movie')

    return movie;

}


// let firstCard = generateCards(firstMovie);
// let secondCard = generateCards(secondMovie);
// let thirdCard= generateCards(thirdMovie);

// generateCards(firstMovie);
// generateCards(secondMovie);
// generateCards(thirdMovie);

// for (let i = 0; i<3; i++){

//     generateCards(fakeMoviesAPI.results[i]);

// }
//console.log(generateCards(fakeMoviesAPI.results[0]))

// // create movie container
const movieContainer = document.querySelector('#movie-container')
// let movieContainer = document.createElement('section');
// movieContainer.classList.add('movieContainer')

function fetchAndDisplay(page){


    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=4026d59afea2b4fa4ab32088708c56c1&page=${page}`).then((response) => response.json()).then((data) => {
    console.log(data);
    for (let i = 0; i<data.results.length; i++){

        movieContainer.appendChild(generateCards(data.results[i])) ;
        //console.log(fakeMoviesAPI.results[i]);
    
    }
    })

}

fetchAndDisplay(1);



// document.body.appendChild(movieContainer)

// LOAD MORE BUTTON

let pageNum = 1;
let button = document.getElementById('loadMore-button');
button.addEventListener('click', iterate)


function iterate(){

    pageNum += 1;
    fetchAndDisplay(pageNum);
  
}





// SEARCH FUNCTION

// Function executed on submit

const logSearch = (event) => {
    console.log('The form was submitted.');
    event.preventDefault();
    
  }
  
  // Select form element
  
const form = document.getElementById('search-form');
  
  
// Connect the function to your form by
// adding a submit event listener
  
  form.addEventListener('submit', logSearch);
  
  