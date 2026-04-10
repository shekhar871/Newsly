
const landingSection = document.getElementById("landing");
const mainAppSection = document.getElementById("main-app");
const exploreBtn = document.getElementById("explore-btn");

const newsContainer = document.getElementById("news-container");
const searchbox = document.getElementById("searchbox");
const sortbox = document.getElementById("sortbox");
const filterbox = document.getElementById("filterbox");
const darkbtn = document.getElementById("darkbtn");

let articles = []; 
let liked = [];    

exploreBtn.addEventListener("click", () => {
    landingSection.classList.add("hidden");
    mainAppSection.classList.remove("hidden");
    gettingnews(); 
});


searchbox.addEventListener("input", shownews);
sortbox.addEventListener("change", shownews);
filterbox.addEventListener("change", shownews);
darkbtn.addEventListener("click", darkmode);

async function gettingnews() {
    try {
        newsContainer.innerHTML = "<p class='placeholder-text'>Loading latest news for you...</p>";
        
      
        const a = await fetch("https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json");
        const data = await a.json();
        
        console.log("Data successfully received:", data);
        articles = data.articles;
        shownews();
        
    } catch(err) {
        newsContainer.innerHTML = "<p class='placeholder-text'>Oops! Error loading news. Please try again later.</p>";
        console.log("Fetch Error:", err);
    }
}


function shownews() {
    let result = articles;

    result = result.filter(function(item) {
        return item.title && item.title.toLowerCase().includes(searchbox.value.toLowerCase());
    });
    
    if (filterbox.value == "liked") {
        result = result.filter(function(item) {
            return liked.includes(item.url);
        });
    }
    
    if (sortbox.value == "az") {
        result = result.sort(function(a, b) {
            return a.title.localeCompare(b.title);
        });
    }if (sortbox.value == "za") {
        result = result.sort(function(a, b) {
            return b.title.localeCompare(a.title);
        });
    }
 if (result.length === 0 && articles.length > 0) {
        newsContainer.innerHTML = "<p class='placeholder-text'>No news found matching your criteria.</p>";
        return;
    }

    newsContainer.innerHTML = result.map(function(element) {
        let hearticon = "Like";
        if (liked.includes(element.url)) {
            hearticon = "Liked";
        }
        
        return `
        <div class="card">
            <img src="${element.urlToImage || "https://via.placeholder.com/300?text=No+Image"}" onerror="this.src='https://via.placeholder.com/300?text=No+Image'" alt="News Cover" />
            <h3>${element.title || "No Title"}</h3>
            <p>${element.description || "Click the link below to read more about this article!"}</p>
            <a href="${element.url}" target="_blank">Read more</a>
            <br>
            <button onclick="togglelike('${element.url}')">${hearticon}</button>
        </div>
        `;
    }).join("");
}
function togglelike(url) {
    if (liked.includes(url)) {
        liked = liked.filter(function(item) {
            return item != url;
        });
    } else {
        liked.push(url);
    }
    shownews(); 
}

function darkmode() {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        darkbtn.textContent = "Light Mode";
    } else {
        darkbtn.textContent = "Dark Mode";
    }
}