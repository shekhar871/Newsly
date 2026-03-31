const getNews= document.getElementById("getneews")
const newsContainer= document.getElementById("news-container")
getNews.addEventListener("click",gettingnews)
async function gettingnews(){
    try{
        const a = await fetch("https://gnews.io/api/v4/top-headlines?category=technology&lang=en&apikey=51112354a5ff0910e32f2de0a65d3f02")
        const data = await a.json()
        console.log(data)
       data.articles.forEach(element => {
    newsContainer.innerHTML += `
        <div class="card">
            <img src="${element.image || "https://via.placeholder.com/300"}" />
            <h3>${element.title}</h3>
            <p>${element.description}</p>
            <a href="${element.url}" target="_blank">Read more</a>
        </div>
    `;
});
    }
    catch(err){
        newsContainer=""
        newsContainer+=err
    }
}