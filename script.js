// Selecting elements from the HTML
const getneews = document.getElementById("getneews");
const newsContainer = document.getElementById("news-container");
const searchbox = document.getElementById("searchbox");
const sortbox = document.getElementById("sortbox");
const filterbox = document.getElementById("filterbox");
const darkbtn = document.getElementById("darkbtn");

let articles = []; // To store fetched articles
let liked = [];    // To store liked articles URLs

// Adding event listeners for our controls
getneews.addEventListener("click", gettingnews);
searchbox.addEventListener("input", shownews);
sortbox.addEventListener("change", shownews);
filterbox.addEventListener("change", shownews);
darkbtn.addEventListener("click", darkmode);

// Fetching news from the API
async function gettingnews() {
    try {
        // Show loading message while fetching
        newsContainer.innerHTML = "<p class='placeholder-text'>Loading news...</p>";
        
        const a = await fetch("https://gnews.io/api/v4/top-headlines?category=technology&lang=en&apikey=51112354a5ff0910e32f2de0a65d3f02");
        const data = await a.json();
        
        console.log("Data received:", data);
        articles = data.articles;
        shownews();
        
    } catch(err) {
        newsContainer.innerHTML = "<p class='placeholder-text'>Error loading news. Please try again later.</p>";
        console.log("Error:", err);
    }
}

// Displaying news on the page
function shownews() {
    let result = articles;
    
    // Filter by search text
    result = result.filter(function(item) {
        return item.title.toLowerCase().includes(searchbox.value.toLowerCase());
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
            <img src="${element.image || "https://via.placeholder.com/300"}" />
            <h3>${element.title}</h3>
            <p>${element.description}</p>
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