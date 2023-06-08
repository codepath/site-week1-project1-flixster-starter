
// Global constants
let APIpage = 1;

// function gets movies from API
function getMovies(){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzZlZWIzODJmZmNiMjMyNTFiMjJkNzRlNzg1OTQzMyIsInN1YiI6IjY0ODAwNWRlNjQ3NjU0MDE0MzMyZjQyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tZPmNIXblH37hDQ-EAzomK8hpXr3j9MrxXfEOik9Pms'
        }
      };
      
      fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=' + APIpage.toString(), options)
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            for (let i = 0; i < data.results.length; i++) {
                console.log("in-loop")
                generateCards(data.results[i]);
            }})
}

// //let fakeMoviesAPI = {
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
//         {
//             "adult": false,
//             "backdrop_path": "/1IM8i8HiomFC4y6NRyBuDrHJWg3.jpg",
//             "genre_ids": [
//                 12,
//                 10751,
//                 14,
//                 10749
//             ],
//             "id": 447277,
//             "original_language": "en",
//             "original_title": "The Little Mermaid",
//             "overview": "The youngest of King Triton’s daughters, and the most defiant, Ariel longs to find out more about the world beyond the sea, and while visiting the surface, falls for the dashing Prince Eric. With mermaids forbidden to interact with humans, Ariel makes a deal with the evil sea witch, Ursula, which gives her a chance to experience life on land, but ultimately places her life – and her father’s crown – in jeopardy.",
//             "popularity": 1482.026,
//             "poster_path": "/ym1dxyOk4jFcSl4Q2zmRrA5BEEN.jpg",
//             "release_date": "2023-05-18",
//             "title": "The Little Mermaid",
//             "video": false,
//             "vote_average": 6.1,
//             "vote_count": 510
//         },
//         {
//             "adult": false,
//             "backdrop_path": "/9t0tJXcOdWwwxmGTk112HGDaT0Q.jpg",
//             "genre_ids": [
//                 27,
//                 53
//             ],
//             "id": 890771,
//             "original_language": "en",
//             "original_title": "The Black Demon",
//             "overview": "Oilman Paul Sturges' idyllic family vacation turns into a nightmare when they encounter a ferocious megalodon shark that will stop at nothing to protect its territory. Stranded and under constant attack, Paul and his family must somehow find a way to get his family back to shore alive before it strikes again in this epic battle between humans and nature.",
//             "popularity": 1428.574,
//             "poster_path": "/uiFcFIjig0YwyNmhoxkxtAAVIL2.jpg",
//             "release_date": "2023-04-26",
//             "title": "The Black Demon",
//             "video": false,
//             "vote_average": 6.4,
//             "vote_count": 91
//         },
//         {
//             "adult": false,
//             "backdrop_path": "/aAgGrfBwna1nO4M2USxwFgK5O0t.jpg",
//             "genre_ids": [
//                 53,
//                 27
//             ],
//             "id": 713704,
//             "original_language": "en",
//             "original_title": "Evil Dead Rise",
//             "overview": "A reunion between two estranged sisters gets cut short by the rise of flesh-possessing demons, thrusting them into a primal battle for survival as they face the most nightmarish version of family imaginable.",
//             "popularity": 1218.785,
//             "poster_path": "/5ik4ATKmNtmJU6AYD0bLm56BCVM.jpg",
//             "release_date": "2023-04-12",
//             "title": "Evil Dead Rise",
//             "video": false,
//             "vote_average": 7.1,
//             "vote_count": 1528
//         },
//         {
//             "adult": false,
//             "backdrop_path": "/q3IK7KJPdfl8AeJnBvB1AQbIhBM.jpg",
//             "genre_ids": [
//                 878,
//                 12,
//                 28
//             ],
//             "id": 447365,
//             "original_language": "en",
//             "original_title": "Guardians of the Galaxy Vol. 3",
//             "overview": "Peter Quill, still reeling from the loss of Gamora, must rally his team around him to defend the universe along with protecting one of their own. A mission that, if not completed successfully, could quite possibly lead to the end of the Guardians as we know them.",
//             "popularity": 1080.396,
//             "poster_path": "/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
//             "release_date": "2023-05-03",
//             "title": "Guardians of the Galaxy Vol. 3",
//             "video": false,
//             "vote_average": 8.1,
//             "vote_count": 1839
//         },
//         {
//             "adult": false,
//             "backdrop_path": "/94TIUEhuwv8PhdIADEvSuwPljS5.jpg",
//             "genre_ids": [
//                 28,
//                 10752
//             ],
//             "id": 840326,
//             "original_language": "fi",
//             "original_title": "Sisu",
//             "overview": "Deep in the wilderness of Lapland, Aatami Korpi is searching for gold but after he stumbles upon Nazi patrol, a breathtaking and gold-hungry chase through the destroyed and mined Lapland wilderness begins.",
//             "popularity": 1059.76,
//             "poster_path": "/ygO9lowFMXWymATCrhoQXd6gCEh.jpg",
//             "release_date": "2023-01-27",
//             "title": "Sisu",
//             "video": false,
//             "vote_average": 7.4,
//             "vote_count": 605
//         },
//         {
//             "adult": false,
//             "backdrop_path": "/eTvN54pd83TrSEOz6wbsXEJktCV.jpg",
//             "genre_ids": [
//                 10752,
//                 28,
//                 53
//             ],
//             "id": 882569,
//             "original_language": "en",
//             "original_title": "Guy Ritchie's The Covenant",
//             "overview": "During the war in Afghanistan, a local interpreter risks his own life to carry an injured sergeant across miles of grueling terrain.",
//             "popularity": 1056.899,
//             "poster_path": "/kVG8zFFYrpyYLoHChuEeOGAd6Ru.jpg",
//             "release_date": "2023-04-19",
//             "title": "Guy Ritchie's The Covenant",
//             "video": false,
//             "vote_average": 7.6,
//             "vote_count": 465
//         },
//         {
//             "adult": false,
//             "backdrop_path": "/jAmmb9RApuRckDJtYWeOgBUgQyG.jpg",
//             "genre_ids": [
//                 16,
//                 28,
//                 14,
//                 878
//             ],
//             "id": 893712,
//             "original_language": "ja",
//             "original_title": "劇場版 ソードアート・オンライン -プログレッシブ- 冥き夕闇のスケルツォ",
//             "overview": "Over a month has passed since 10,000 users were trapped inside the \"Sword Art Online\" world. Asuna, who cleared the first floor of the floating iron castle of Aincrad, joined up with Kirito and continued her journey to reach the top floor. With the support of female Information Broker Argo, clearing the floors seemed to be progressing smoothly, but conflict erupts between two major guilds who should be working together – the top player groups ALS (the Aincrad Liberation Squad) and DKB (the Dragon Knights Brigade). And meanwhile, behind the scenes exists a mysterious figure pulling the strings…",
//             "popularity": 870.912,
//             "poster_path": "/2lEyzOq6ILNgBpLLpTRckQhbNNt.jpg",
//             "release_date": "2022-10-22",
//             "title": "Sword Art Online the Movie -Progressive- Scherzo of Deep Night",
//             "video": false,
//             "vote_average": 7.8,
//             "vote_count": 60
//         },
//         {
//             "adult": false,
//             "backdrop_path": "/hiHGRbyTcbZoLsYYkO4QiCLYe34.jpg",
//             "genre_ids": [
//                 27,
//                 53
//             ],
//             "id": 758323,
//             "original_language": "en",
//             "original_title": "The Pope's Exorcist",
//             "overview": "Father Gabriele Amorth, Chief Exorcist of the Vatican, investigates a young boy's terrifying possession and ends up uncovering a centuries-old conspiracy the Vatican has desperately tried to keep hidden.",
//             "popularity": 849.755,
//             "poster_path": "/gNPqcv1tAifbN7PRNgqpzY8sEJZ.jpg",
//             "release_date": "2023-04-05",
//             "title": "The Pope's Exorcist",
//             "video": false,
//             "vote_average": 7.3,
//             "vote_count": 1324
//         },
//         {
//             "adult": false,
//             "backdrop_path": "/A5UrOppVdGHPfz1QnrOOdHV7G5A.jpg",
//             "genre_ids": [
//                 28,
//                 53,
//                 27
//             ],
//             "id": 799379,
//             "original_language": "ko",
//             "original_title": "늑대사냥",
//             "overview": "While under heavily armed guard, the dangerous convicts aboard a cargo ship unite in a coordinated escape attempt that soon escalates into a bloody, all-out riot. But as the fugitives continue their brutal campaign of terror, they soon discover that not even the most vicious among them is safe from the horror they unknowingly unleashed from the darkness below deck.",
//             "popularity": 808.577,
//             "poster_path": "/dniWicB6fa7NvpGbguxWlNPMc5f.jpg",
//             "release_date": "2022-09-21",
//             "title": "Project Wolf Hunting",
//             "video": false,
//             "vote_average": 6.4,
//             "vote_count": 151
//         },
//         {
//             "adult": false,
//             "backdrop_path": "/T5xXoFqyc9jNXZIbH4Sw0jwWjw.jpg",
//             "genre_ids": [
//                 28,
//                 80,
//                 53,
//                 9648
//             ],
//             "id": 605886,
//             "original_language": "en",
//             "original_title": "To Catch a Killer",
//             "overview": "Baltimore. New Year's Eve. A talented but troubled police officer is recruited by the FBI's chief investigator to help profile and track down a mass murderer.",
//             "popularity": 777.129,
//             "poster_path": "/mFp3l4lZg1NSEsyxKrdi0rNK8r1.jpg",
//             "release_date": "2023-04-06",
//             "title": "To Catch a Killer",
//             "video": false,
//             "vote_average": 6.9,
//             "vote_count": 239
//         },
//         {
//             "adult": false,
//             "backdrop_path": "/i1eghEBiC0gN4KnwuUGC2fNiX1f.jpg",
//             "genre_ids": [
//                 28,
//                 53
//             ],
//             "id": 552688,
//             "original_language": "en",
//             "original_title": "The Mother",
//             "overview": "A deadly female assassin comes out of hiding to protect the daughter that she gave up years before, while on the run from dangerous men.",
//             "popularity": 770.278,
//             "poster_path": "/vnRthEZz16Q9VWcP5homkHxyHoy.jpg",
//             "release_date": "2023-05-04",
//             "title": "The Mother",
//             "video": false,
//             "vote_average": 6.8,
//             "vote_count": 714
//         },
//         {
//             "adult": false,
//             "backdrop_path": "/44immBwzhDVyjn87b3x3l9mlhAD.jpg",
//             "genre_ids": [
//                 27,
//                 9648,
//                 53
//             ],
//             "id": 934433,
//             "original_language": "en",
//             "original_title": "Scream VI",
//             "overview": "Following the latest Ghostface killings, the four survivors leave Woodsboro behind and start a fresh chapter.",
//             "popularity": 559.437,
//             "poster_path": "/wDWwtvkRRlgTiUr6TyLSMX8FCuZ.jpg",
//             "release_date": "2023-03-08",
//             "title": "Scream VI",
//             "video": false,
//             "vote_average": 7.3,
//             "vote_count": 1325
//         },
//         {
//             "adult": false,
//             "backdrop_path": "/qElNES0sHVQcbzvGrTx7ccpGzij.jpg",
//             "genre_ids": [
//                 878,
//                 28,
//                 18
//             ],
//             "id": 842675,
//             "original_language": "zh",
//             "original_title": "流浪地球2",
//             "overview": "A prequel to The Wandering Earth.",
//             "popularity": 499.78,
//             "poster_path": "/pR858ihc6Ls9xohpdRJVjV787ml.jpg",
//             "release_date": "2023-01-22",
//             "title": "The Wandering Earth II",
//             "video": false,
//             "vote_average": 7.3,
//             "vote_count": 258
//         },
//         {
//             "adult": false,
//             "backdrop_path": "/vQ5T84t8h4N2xAswNFW9fkVIyZq.jpg",
//             "genre_ids": [
//                 80,
//                 9648,
//                 53
//             ],
//             "id": 536437,
//             "original_language": "en",
//             "original_title": "Hypnotic",
//             "overview": "A detective becomes entangled in a mystery involving his missing daughter and a secret government program while investigating a string of reality-bending crimes.",
//             "popularity": 489.46,
//             "poster_path": "/3IhGkkalwXguTlceGSl8XUJZOVI.jpg",
//             "release_date": "2023-05-11",
//             "title": "Hypnotic",
//             "video": false,
//             "vote_average": 6.6,
//             "vote_count": 112
//         },
//         {
//             "adult": false,
//             "backdrop_path": "/rOKBBs0Hn4yu60wDF7xZUH7CVgh.jpg",
//             "genre_ids": [
//                 28,
//                 80,
//                 53
//             ],
//             "id": 1105803,
//             "original_language": "en",
//             "original_title": "Snag",
//             "overview": "An Australian lone wolf's quiet existence is shattered when he learns that the woman he once loved and thought was dead is alive and held captive by ruthless gangsters. Now, to take on this dangerous criminal organization, he must seek out allies and storm into a world of violence to rescue the love of his life in this gritty, modern day violent fairytale.",
//             "popularity": 467.428,
//             "poster_path": "/nhj4Q39qMSk6X5Ly9j9Yqyjrg5A.jpg",
//             "release_date": "2023-04-28",
//             "title": "Snag",
//             "video": false,
//             "vote_average": 6.1,
//             "vote_count": 29
//         },
//         {
//             "adult": false,
//             "backdrop_path": "/bqMWZ5hB7bcI1KK2TH29odwCgWX.jpg",
//             "genre_ids": [
//                 12,
//                 14,
//                 35
//             ],
//             "id": 493529,
//             "original_language": "en",
//             "original_title": "Dungeons & Dragons: Honor Among Thieves",
//             "overview": "A charming thief and a band of unlikely adventurers undertake an epic heist to retrieve a lost relic, but things go dangerously awry when they run afoul of the wrong people.",
//             "popularity": 458.887,
//             "poster_path": "/A7AoNT06aRAc4SV89Dwxj3EYAgC.jpg",
//             "release_date": "2023-03-23",
//             "title": "Dungeons & Dragons: Honor Among Thieves",
//             "video": false,
//             "vote_average": 7.5,
//             "vote_count": 1604
//         },
//         {
//             "adult": false,
//             "backdrop_path": "/ceYZCBfwbBwSpGJ6PapNVw5jqLG.jpg",
//             "genre_ids": [
//                 16,
//                 18,
//                 12,
//                 14
//             ],
//             "id": 916224,
//             "original_language": "ja",
//             "original_title": "すずめの戸締まり",
//             "overview": "Suzume, 17, lost her mother as a little girl. On her way to school, she meets a mysterious young man. But her curiosity unleashes a calamity that endangers the entire population of Japan, and so Suzume embarks on a journey to set things right.",
//             "popularity": 434.825,
//             "poster_path": "/vIeu8WysZrTSFb2uhPViKjX9EcC.jpg",
//             "release_date": "2022-11-11",
//             "title": "Suzume",
//             "video": false,
//             "vote_average": 7.9,
//             "vote_count": 423
//         }
//     ],
//     "total_pages": 98,
//     "total_results": 1951
// }

// let firstMovie = fakeMoviesAPI.results[0] 
// console.log(firstMovie)

function generateCards(movieObject){
    // create star
    let star = document.createElement('span');
    star.classList.add('star');
    let starContent = document.createTextNode('⭐️');
    star.appendChild(starContent);

    // create rating
    let rating = document.createElement('span');
    let ratingContent = document.createTextNode(movieObject.vote_average);
    rating.classList.add('movie-votes');
    rating.appendChild(ratingContent);

    // create average container 
    let averageContainer = document.createElement('div');
    averageContainer.appendChild(star);
    averageContainer.appendChild(rating);
    averageContainer.classList.add('average');
    //document.body.appendChild(averageContainer);

    // create image
    let image = document.createElement('img');
    image.classList.add('movie-poster');
    image.src="https://image.tmdb.org/t/p/w342" + movieObject.poster_path;
    //document.body.insertBefore(image,averageContainer);

    // create name
    let title = document.createElement('div');
    title.classList.add('movie-title');
    title.innerText = movieObject.original_title;
    //document.body.insertBefore(name,averageContainer.nextSibling)

    // create section
    let movie = document.createElement('section');
    movie.classList.add('movie-card');
    movie.appendChild(image);
    movie.setAttribute("id", movieObject.id)
    movie.appendChild(averageContainer);
    movie.appendChild(title);
    // select flexbox item and add movie as items
    let grid = document.querySelector("#movie-grid");
    grid.appendChild(movie);


}

// generate cards for all elements in API
// for (let i = 0; i < fakeMoviesAPI.results.length; i++) {
//     generateCards(fakeMoviesAPI.results[i]);
//   }
//generateCards(firstMovie);

// call function to get movies from API
getMovies();

let loadMore = document.getElementById("load-more");

loadMore.addEventListener('click', () => {
    APIpage++;
    getMovies();
})

