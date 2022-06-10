const api_key = "b920971799aea823aa7b41503946a6e9"
const Movie_list = []

var innerHTM =""
//https://api.themoviedb.org/3/movie/550?api_key=b920971799aea823aa7b41503946a6e9

//https://api.themoviedb.org/3/movie/550?api_key={api_key}&callback=test
let page_Num=1
const grid_cont = document.querySelector(".grid-container")
const search_bar = document.getElementById("search_item")

async function getMovie_data(page_Num)
{
    const api_url = "https://api.themoviedb.org/3/movie/now_playing?api_key=" +api_key+ "&page="+page_Num
    let response = await fetch(api_url);
    let responseData = await response.json(); 
    Movie_list.push(responseData)

    return responseData

}
 async function getAllMovies(page_Num)
{
     console.log(page_Num)
     const responseData = await getMovie_data(page_Num)
     console.log(responseData)
     display(responseData)
    
}
function display(responseData)
{
    if (responseData)
    {
            responseData.results.forEach(element => {
        var image_path =""

        if ("poster_path" in element)
        {
              image_path = element.poster_path
        }
        
      
        const title = element.title
        const votes = element.vote_average
    

        grid_cont.innerHTML +=
            '<div id="grid-item">' +
        '<img class= "movie_pic" src= "https://image.tmdb.org/t/p/w500/' + image_path + ' " ' + ' />' +
        '<div class = "rating"> ' +
        '<div class= "star"> ⭐ ' + 
        '</div>'+    
        '<div class= "rat_num" > ' + votes +  
        '</div>'+    
        '</div>' +
          '<div class="title">' + title+ '</div>'
            '</div>'
     
    })
    }
    innerHTM = grid_cont.innerHTML

}

async function getSearchMovies(evt)
{
    const user_input = search_bar.value
    console.log(search_bar.value)

    if (user_input.length > 0)
    {
        apiURL = "https://api.themoviedb.org/3/search/movie?api_key=" + api_key + "&query=" + user_input
        
        let response = await fetch(apiURL)

        let responseData = await response.json()

        return responseData
    }
    else {
         const api_url = "https://api.themoviedb.org/3/movie/now_playing?api_key=" +api_key+ "&page="+page_Num
         let response = await fetch(api_url);
        let responseData = await response.json(); 
      
        display(responseData)
        
        
    }

}
async function myFunction() {
    if (search_bar.value.length > 0)
    {
    const movies = await getSearchMovies()
    console.log(search_bar.value)
    grid_cont.innerHTML =""
    display(movies)
    }
    else {
        await getAllMovies(1)
    }
    
   
}

async function LoadMore(evt)
{
    page_Num += 1
    const load_data = await getMovie_data(page_Num)
    console.log(load_data)
    display(load_data)  
}
const search_icon = document.querySelector(".search_icon").addEventListener("click", displaySearch)

function displaySearch(evt)
{
    evt.preventDefault()

    
    let visibility = window.getComputedStyle(search_bar).visibility
    
    if (visibility == "hidden")
    {
        search_bar.setAttribute('style', 'visibility : visible')
      
        

    }
  
 
    

}
document.addEventListener('mouseup', function (e)
{
    var container = this.getElementById("search_item")
    if (!container.contains(e.target))
    {
        container.setAttribute('style', 'visibility : hidden')
       
    }
})



window.onload = async function () {
  // execute your functions here to make sure they run as soon as the page loads

    getAllMovies()

  
}
document.getElementById("button1").addEventListener("click",LoadMore)
