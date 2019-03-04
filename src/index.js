import reddit from "./redditapi.js";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const body = document.querySelector("body");
const search = document.getElementById("search");
const searchBtn = document.getElementById("searchbtn");

searchForm.addEventListener("submit", e => {
    //get search term
    const searchTerm = searchInput.value;
    //get sort
    const checked = document.querySelector('input[name="sortby"]:checked').value;
    //get limit
    const limit = document.getElementById("limit").value;

    //check input
    if(searchTerm == ""){
        //show message
        showMessage("Please add a search term.", "alert-danger");
    }

    

    reddit.search(searchTerm, limit, checked)
    .then(results => {
        let output = '<div class="card-columns">';

        results.forEach(post => {
            let image = post.preview ? post.preview.images[0].source.url : "https://techcrunch.com/wp-content/uploads/2013/07/reddit-guy.png?w=237"

            output += `
                <div class="card bg${randomBg()} ">
                    <img class="card-img-top" src="${image}">
                    <div class="card-body">
                        <p class="card-title text-white"><b>${post.title}</b></p>
                        <p class="card-text text-white">${post.selftext}</p>
                        <a href="${post.url}" target="_blank" class="btn goto text-white">Read more</a>
                        <hr>
                        <span class="badge badge-warning">Subreddit: ${post.subreddit}</span>
                        <span class="badge badge-secondary">Score: ${post.score}</span>  
                    </div>
                </div>
            `;
        });

        output += '</div>';
        body.classList.add("body-bg");
        search.classList.add("bg-dark");
        search.classList.add("text-white");
        searchBtn.style.backgroundColor = "#1f2123";
        document.getElementById("results").innerHTML = output;
    });

    e.preventDefault();
});

function showMessage(message, className){
    const searchContainer = document.getElementById("search-container");
    const search = document.getElementById("search");

    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message)); 
    searchContainer.insertBefore(div, search);
    
    setTimeout(() => {
        searchContainer.removeChild(div);
    }, 2000);

}

function randomBg(){
    let random = Math.floor(Math.random() * (11 - 1 + 1)) + 1;
    return random;
}