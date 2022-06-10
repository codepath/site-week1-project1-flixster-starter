const api_key = "b920971799aea823aa7b41503946a6e9"
//https://api.themoviedb.org/3/movie/550?api_key=b920971799aea823aa7b41503946a6e9

//https://api.themoviedb.org/3/movie/550?api_key={api_key}&callback=test
let page_Num=1
const grid_cont = document.querySelector(".grid-container")


async function getMovie_data(page_Num)
{
    const api_url = "https://api.themoviedb.org/3/movie/now_playing?api_key=" +api_key+ "&page="+page_Num
    let response = await fetch(api_url);
    let responseData = await response.json(); 
    return responseData

}
 async function getAllMovies(page_Num)
{
     const responseData = await getMovie_data(page_Num)
     console.log(responseData)
     display(responseData)
    
}
function display(responseData)
{
 responseData.results.forEach(element => {
        const image_path = element.poster_path
        console.log(image_path)
        const title = element.title
        const votes = element.vote_average
        console.log(votes)

        grid_cont.innerHTML +=
            '<div class="grid-item">' +
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
async function getSearchMovies(evt)
{
 //apiURL= "https://api.themoviedb.org/3/search/movie/?api_key="+ api_key+ "&query="+ //
}

async function LoadMore(evt)
{
 
    
    page_Num += 1
    const load_data = await getMovie_data(page_Num)
    console.log(load_data)
    display(load_data)


    
}
document.getElementById("button1").addEventListener("click",LoadMore)
getAllMovies()
