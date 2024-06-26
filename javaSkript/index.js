let username = localStorage.getItem("username");
console.log(username);

fetch('https://api.jikan.moe/v4/top/anime')
    .then(resp => resp.json())
    .then(response => {
        console.log(response);
        renderHtml(response);
    });

let cont = document.querySelector('.topAnimes');
let user_name = document.querySelector('.user-name');
let log_out_btn = document.querySelector('.log-out-btn');

user_name.innerHTML += username.toUpperCase();

// Function to handle logout
function handleLogout() {
    localStorage.removeItem("username");
    
    window.location.href = "login.html";
}

// Add click event listener to the logout button
log_out_btn.addEventListener('click', handleLogout);

function renderHtml(response) {
    const animes = response.data;

    for (let anime of animes) {
        cont.innerHTML += `<div class="card" style="width: 18rem;">
            <div class="imgParent">
              <img src="${anime.images.jpg.image_url}" class="card-img-top" alt="...">
           </div>
        <div class="card-body">
        <div class="titleParent">
            <h5 class="card-title myCardTitle">${anime.title}</h5>
        </div>
          <p class="card-text">Show Type: ${anime.type},  Ranking: ${anime.rank},  Popularity: ${anime.popularity}</p>
          <button class="btn"><a href="https://myanimelist.net/anime/${anime.mal_id}" class="btn btn-primary" target="_blank">See More</a></button>
          </div>
      </div>`;
    }
}