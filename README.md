## Week 1 Assignment: Flixster

Submitted by: **Annesa Tran**

Estimated time spent: **10** hours spent in total

### Application Features

#### CORE FEATURES

- [x] User can view a list of current movies from The Movie Database API as a grid view
  - The grid element should have an id of `movies-grid`
  - Each movie wrapper element should have a class of `movie-card`
- [x] For each movie displayed, user can see the following details:
  - Title - the element should have a class of `movie-title`
  - Image - the `img` element should have a class of `movie-poster`
  - Votes - the element should have a class of `movie-votes`
- [x] User can load more current movies by clicking a button at the bottom of the list
  - The button should have an id of `load-more-movies-btn`.
  - When clicked, the page should not refresh.
  - New movies should simply be added to the bottom
- [x] Allow users to search for movies and display them in a grid view
  - There should be a search input element with an id of `search-input`
  - Users should be able to type into the input
  - When a user hits 'Enter', it should send a search request to the movies API
  - The results from the search should be displayed on the page
  - There should be a close icon with an id of `close-search-btn` that exits the search, clears results, and shows the current movies displayed previously
- [x] Website accounts for basic HTML/CSS accessibility features
- [x] Website should be responsive

#### STRETCH FEATURES

- [ ] Deploy website using GitHub Pages. 
- [x] Allow user to view more details about a movie within a popup.
- [x] Improve the user experience through CSS & animation.
- [ ] Allow movie video trailers to be played using [embedded YouTube](https://support.google.com/youtube/answer/171780?hl=en)

### Walkthrough Video

`TODO://` Add the embedded URL code to your animated app walkthrough below, `ADD_EMBEDDED_CODE_HERE`. Make sure the video or gif actually renders and animates when viewing this README. (🚫 Remove this paragraph after adding walkthrough video)

![](https://github.com/annesatran/SITE_Project1_flixster/blob/main/Program1_GIF1.gif)
Site brings up "Now Playing", and the Load More button works.

![](https://github.com/annesatran/SITE_Project1_flixster/Program1_GIF4.gif)
User can search for movies using a search bar, and the Load More button works.

![](https://github.com/annesatran/SITE_Project1_flixster/Program1_GIF5.gif)
User can clear a search that they made, returning to the Now Playing results.

![](https://github.com/annesatran/SITE_Project1_flixster/Program1_GIF2.gif)
The site is responsive.

![](https://github.com/annesatran/SITE_Project1_flixster/Program1_GIF3.gif)
User can click on any movie cards to bring up a popup.

`ADD_EMBEDDED_CODE_HERE`

### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

Yes, I would say that the project followed what we did in the labs, especially what we did with event listeners, APIs, and DOM methods. The feature that I felt the least prepared for was probably all the API calls. Although I feel that I understand them pretty thoroughly, I found myself looking back at the Giphy party lab the most because I needed to reference the syntax and code flow.

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.

I think I would want to spend some more time refactoring the API calling functions in order to be as reusable as possible. I already went in at the end of the lab to do this, but I feel like it could still be better. I'd also want pay more attention to and follow good-practice guidelines since I sometimes felt that my code consisted of a lot of "workarounds." 

Thinking of it more specifically, I would want to flesh out the popup boxes a lot more. Currently, they don't have a lot of information in them, so I want to spend more time with the available APIs to include more information. I'd also like to spend more time on the CSS to add animations.
  
Add your response here

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

I was able to get the basics of each of the core features pretty easily, but I ran into more trouble while dealing with some of the more fine-grained implementation details. This was especially true for the popup part, since I was able to get everything working on the console, but had a harder time getting it to display how I wanted. Another thing that was frustrating was adding the event handlers for each of the movie cards. I ran into a couple errors I was unsure how to get around, but I was able to find another method to accomplish the job.

### Open-source libraries used

- N/A

### Shout out

Shoutout to Mariam and Deland! We were partnered for the two days I worked on this project, and I was able to get a lot of feedback and help from them.
