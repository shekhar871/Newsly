let landing = document.getElementById("landing");
let myapp = document.getElementById("myapp");
let explore = document.getElementById("explore-btn");

let grid = document.getElementById("news-grid");
let side = document.getElementById("summary-container");
let dhead = document.getElementById("date-header"); 

let searchb = document.getElementById("searchbox");
let sortb = document.getElementById("sortbox");
let filters = document.getElementById("filterbox");
let drk = document.getElementById("darkbtn");

let articles = []; 
let liked = [];    
let cat = "technology"; 

explore.addEventListener("click", function() {
    landing.style.display = "none";
    myapp.style.display = "block";
    getneews(); 
});

searchb.addEventListener("input", loaded);
sortb.addEventListener("change", loaded);
filters.addEventListener("change", loaded);
drk.addEventListener("click", dark);

function clickCat(c) {
    cat = c;
    getneews();
}

async function getneews() {
    try {
        grid.innerHTML = "<p>Loading " + cat + " news...</p>";
        side.innerHTML = "<p>Loading...</p>";
      
        let url = "https://saurav.tech/NewsAPI/top-headlines/category/" + cat + "/us.json";
        
        let a = await fetch(url);
        let b = await a.json();
        
        articles = b.articles;

        let td = new Date();
        dhead.textContent = "Top " + cat.toUpperCase() + " Stories - " + td.toDateString();

        loaded();
        
    } catch(err) {
        grid.innerHTML = "<p>Error.</p>";
        side.innerHTML = "";
    }
}

function loaded() {
    let res = articles;

    res = res.filter(function(x) {
        if (x.title) {
            return x.title.toLowerCase().includes(searchb.value.toLowerCase());
        } else {
            return false;
        }
    });
    
    if (filters.value == "liked") {
        res = res.filter(function(x) {
            return liked.includes(x.url);
        });
    }
    
    if (sortb.value == "az") {
        res = res.sort(function(o1, o2) {
            return o1.title.localeCompare(o2.title);
        });
    }
    
    if (sortb.value == "za") {
        res = res.sort(function(o1, o2) {
            return o2.title.localeCompare(o1.title);
        });
    }

    if (res.length == 0) {
        grid.innerHTML = "<p>No news.</p>";
        side.innerHTML = "";
        return;
    }

    let h1 = "";
    for (let c = 0; c < 5; c++) {
        let n = res[c];
        if (n) {
            let txt = "";
            if (n.description) {
                txt = n.description.substring(0, 75) + "...";
            } else {
                txt = "Read article.";
            }

            h1 = h1 + `
            <div class="summary-item">
                <strong>${n.title}</strong>
                <p>${txt}</p>
                <a href="${n.url}" target="_blank">Read Article</a>
            </div>
            `;
        }
    }
    side.innerHTML = h1;

    let h2 = "";
    for (let c = 0; c < res.length; c++) {
        let el = res[c];
        let h = "Like";
        
        if (liked.includes(el.url)) {
            h = "Liked";
        }

        let img = el.urlToImage;
        if (!img) {
            img = "https://via.placeholder.com/300";
        }
        
        let t = el.title;
        if (!t) {
            t = "No Title";
        }

        let desc = el.description;
        if (!desc) {
            desc = "Click below to read!";
        }
        
        h2 = h2 + `
        <div class="card">
            <img src="${img}" />
            <h3>${t}</h3>
            <p>${desc}</p>
            <a href="${el.url}" target="_blank">Read more</a>
            <br>
            <button onclick="toggle('${el.url}')">${h}</button>
        </div>
        `;
    }
    grid.innerHTML = h2;
}

function toggle(u) {
    if (liked.includes(u)) {
        liked = liked.filter(function(x) {
            return x != u;
        });
    } else {
        liked.push(u);
    }
    loaded(); 
}

function dark() {
    let bd = document.body;
    bd.classList.toggle("dark");
    
    if (bd.classList.contains("dark")) {
        drk.textContent = "Light Mode";
    } else {
        drk.textContent = "Dark Mode";
    }
}