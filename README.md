## Week 1 Assignment: Flixster

Submitted by: **Cesar Monagas Romero**

Estimated time spent: ** 15 ** hours spent in total

Deployed Application (optional): [Flixster Deployed Site](https://cesarmonagas15.github.io/site-week1-project1-flixster/)

### Application Features

#### Core Features

- [X] User can view a list of current movies from The Movie Database API as a grid view
  - The grid element should have an id of `movies-grid`
  - Each movie wrapper element should have a class of `movie-card`
- [X] For each movie displayed, user can see the following details:
  - Title - the element should have a class of `movie-title`
  - Image - the `img` element should have a class of `movie-poster`
  - Votes - the element should have a class of `movie-votes`
- [X] User can load more current movies by clicking a button at the bottom of the list
  - The button should have an id of `load-more-movies-btn`.
  - When clicked, the page should not refresh.
  - New movies should simply be added to the bottom
- [X] Allow users to search for movies and display them in a grid view
  - There should be a search input element with an id of `search-input`
  - Users should be able to type into the input
  - When a user hits 'Enter', it should send a search request to the movies API
  - The results from the search should be displayed on the page
  - There should be a close icon with an id of `close-search-btn` that exits the search, clears results, and shows the current movies displayed previously
- [X] Website accounts for basic HTML/CSS accessibility features
- [X] Website should be responsive

#### Stretch Features

- [X] Deploy website using GitHub Pages.
- [ ] Allow user to view more details about a movie within a popup.
- [X] Improve the user experience through CSS & animation.
- [ ] Allow movie video trailers to be played using [embedded YouTube](https://support.google.com/youtube/answer/171780?hl=en)
- [ ] Implement anything else that you can get done to improve the app functionality!

### Walkthrough Video

`https://watch.screencastify.com/v/QVHYXXB48zt7R3dp1oCp`

### Reflection

- Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

      Some of the topics did help, but the way things were done in the labs was a bit different than the project. Particularly with the search function, I had a lot of trouble getting it to work correctly. Also, in the lab, we would always be able to generate more gifs with load-more, but the movie API has a limited number of movie searches and I didn't know how to stop generating movies after there are no more new ones, so it simply repeats.

      Other than this though, the labs were helpful, but after the 2nd lab, I decided to not do the labs entirely and simply learn from them or the solutions to work on my own project. This helped and didn't make me feel as behind, but other people who did the labs were more behind on the project.

- If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
    I would have wanted to add the pop-up features and display a video.

    I also would have wanted to make my code more readable and work better. I wish I had encapsulated things into functions instead of performing repeated actions over again.

- Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

      When I was demoing, I realized the issue with my load-more function after you searched. It would always load more movies even if the API didn't have more movies with that search, and we did not talk about how to stop that from happening.

      Other than that, my demo was very smooth and I had a lot of fun showcasing what I did in a video.

### Open-source libraries used

- Add any links to open-source libraries used in your project.

### Shout out

Shout out to Khalid, Ana, David, Maria, Paige, Sammy, and A'Shaun!!!!

