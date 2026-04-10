const landingSection = document.getElementById("landing");
const mainAppSection = document.getElementById("main-app");
const exploreBtn = document.getElementById("explore-btn");

const newsGrid = document.getElementById("news-grid");
const summaryContainer = document.getElementById("summary-container");
const dateHeader = document.getElementById("date-header"); // Get Date Header

const searchbox = document.getElementById("searchbox");
const sortbox = document.getElementById("sortbox");
const filterbox = document.getElementById("filterbox");
const darkbtn = document.getElementById("darkbtn");

let articles = []; 
let liked = [];    
let currentCategory = "technology"; // Default category

exploreBtn.addEventListener("click", function() {
    landingSection.style.display = "none";
    mainAppSection.style.display = "block";
    gettingnews(); 
});

searchbox.addEventListener("input", shownews);
sortbox.addEventListener("change", shownews);
filterbox.addEventListener("change", shownews);
darkbtn.addEventListener("click", darkmode);

// Function for category buttons to use
function changeCategory(categoryName) {
    currentCategory = categoryName;
    gettingnews();
}

async function gettingnews() {
    try {
        newsGrid.innerHTML = "<p>Loading " + currentCategory + " news...</p>";
        summaryContainer.innerHTML = "<p>Loading...</p>";
      
        // Very basic string combination to change the URL Category!
        let url = "https://saurav.tech/NewsAPI/top-headlines/category/" + currentCategory + "/us.json";
        
        const response = await fetch(url);
        const data = await response.json();
        
        articles = data.articles;

        // Basic Live Date Logic for Header
        let today = new Date();
        dateHeader.textContent = "Top " + currentCategory.toUpperCase() + " Stories - " + today.toDateString();

        shownews();
        
    } catch(err) {
        newsGrid.innerHTML = "<p>Error loading news.</p>";
        summaryContainer.innerHTML = "";
    }
}

function shownews() {
    let result = articles;

    result = result.filter(function(item) {
        if (item.title) {
            return item.title.toLowerCase().includes(searchbox.value.toLowerCase());
        } else {
            return false;
        }
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
    }
    
    if (sortbox.value == "za") {
        result = result.sort(function(a, b) {
            return b.title.localeCompare(a.title);
        });
    }

    if (result.length == 0) {
        newsGrid.innerHTML = "<p>No news found.</p>";
        summaryContainer.innerHTML = "";
        return;
    }

    let summaryHTML = "";
    for (let i = 0; i < 5; i++) {
        let item = result[i];
        if (item) {
            let summaryText = "";
            if (item.description) {
                summaryText = item.description.substring(0, 75) + "...";
            } else {
                summaryText = "Read the full article to learn more.";
            }

            summaryHTML = summaryHTML + `
            <div class="summary-item">
                <strong>${item.title}</strong>
                <p>${summaryText}</p>
                <a href="${item.url}" target="_blank">Read Article</a>
            </div>
            `;
        }
    }
    summaryContainer.innerHTML = summaryHTML;

    let newsHTML = "";
    for (let i = 0; i < result.length; i++) {
        let element = result[i];
        let hearticon = "Like";
        
        if (liked.includes(element.url)) {
            hearticon = "Liked";
        }

        let imageSrc = element.urlToImage;
        if (!imageSrc) {
            imageSrc = "https://via.placeholder.com/300";
        }
        
        let title = element.title;
        if (!title) {
            title = "No Title";
        }

        let description = element.description;
        if (!description) {
            description = "Click the link below to read more about this article!";
        }
        
        newsHTML = newsHTML + `
        <div class="card">
            <img src="${imageSrc}" />
            <h3>${title}</h3>
            <p>${description}</p>
            <a href="${element.url}" target="_blank">Read more</a>
            <br>
            <button onclick="togglelike('${element.url}')">${hearticon}</button>
        </div>
        `;
    }
    newsGrid.innerHTML = newsHTML;
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
    let body = document.body;
    body.classList.toggle("dark");
    
    if (body.classList.contains("dark")) {
        darkbtn.textContent = "Light Mode";
    } else {
        darkbtn.textContent = "Dark Mode";
    }
}