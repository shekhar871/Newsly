// Page Sections
const landingSection = document.getElementById("landing");
const mainAppSection = document.getElementById("main-app");
const exploreBtn = document.getElementById("explore-btn");

// App Controls
const newsContainer = document.getElementById("news-container");
const searchbox = document.getElementById("searchbox");
const sortbox = document.getElementById("sortbox");
const filterbox = document.getElementById("filterbox");
const darkbtn = document.getElementById("darkbtn");

let articles = []; 
let liked = [];    

// Transition from Landing Page to Main App
exploreBtn.addEventListener("click", () => {
    landingSection.classList.add("hidden");
    mainAppSection.classList.remove("hidden");
    gettingnews(); // Fetch news immediately when app opens!
});

// Adding event listeners for our controls
searchbox.addEventListener("input", shownews);
sortbox.addEventListener("change", shownews);
filterbox.addEventListener("change", shownews);
darkbtn.addEventListener("click", darkmode);

// Updated to use a completely free and unlimited open API instead of the restricted API
async function gettingnews() {
    try {
        newsContainer.innerHTML = "<p class='placeholder-text'>Loading latest news for you...</p>";
        
        // This is a free News API wrapper that doesn't block deployed apps and doesn't need an API key
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

// Displaying news on the page
function shownews() {
    let result = articles;
    
    // Filter by search text
    result = result.filter(function(item) {
        return item.title && item.title.toLowerCase().includes(searchbox.value.toLowerCase());
    });
    
    // Filter by liked articles
    if (filterbox.value == "liked") {
        result = result.filter(function(item) {
            return liked.includes(item.url);
        });
    }
    
    // Sort A-Z
    if (sortbox.value == "az") {
        result = result.sort(function(a, b) {
            return a.title.localeCompare(b.title);
        });
    }
    
    // Sort Z-A
    if (sortbox.value == "za") {
        result = result.sort(function(a, b) {
            return b.title.localeCompare(a.title);
        });
    }

    // Check if results are empty after filtering
    if (result.length === 0 && articles.length > 0) {
        newsContainer.innerHTML = "<p class='placeholder-text'>No news found matching your criteria.</p>";
        return;
    }

    // Creating HTML for each article card
    newsContainer.innerHTML = result.map(function(element) {
        let hearticon = "Like ♥";
        if (liked.includes(element.url)) {
            hearticon = "Liked ♥";
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

// Toggling the like status
function togglelike(url) {
    if (liked.includes(url)) {
        liked = liked.filter(function(item) {
            return item != url;
        });
    } else {
        liked.push(url);
    }
    shownews(); // Refresh display
}

// Dark mode toggle function
function darkmode() {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        darkbtn.textContent = "Light Mode ☀️";
    } else {
        darkbtn.textContent = "Dark Mode 🌙";
    }
}