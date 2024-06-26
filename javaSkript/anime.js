let animes = [];
const cont = document.querySelector('.topAnimes');
const searchInput = document.getElementById('searchBar');

searchInput.addEventListener('input', filterAnimes);

fetch('https://api.jikan.moe/v4/anime')
  .then(resp => resp.json())
  .then(response => {
    console.log(response);
    animes = response.data;
    renderHtml(animes);
  });

function renderHtml(animes) {
  cont.innerHTML = '';
  if (animes.length === 0) {
    cont.innerHTML = '<div class="no-results">No results found.</div>';
    return;
  }
  for (let anime of animes) {
    cont.innerHTML += `<div class="card" style="width: 18rem;">
      <div class="imgParent">
        <img src="${anime.images.jpg.image_url}" class="card-img-top" alt="${anime.title}">
      </div>
      <div class="card-body">
        <div class="titleParent">
          <h5 class="card-title myCardTitle">${anime.title}</h5>
        </div>
        <p class="card-text">Show Type: ${anime.type}, Ranking: ${anime.ranking}, Popularity: ${anime.popularity}</p>
        <button class="btn"><a href="https://myanimelist.net/anime/${anime.mal_id}" class="btn btn-primary" target="_blank">See More</a></button>
      </div>
    </div>`;
  }
}

function filterAnimes() {
  const searchTerm = searchInput.value.toLowerCase();
  cont.innerHTML = '<div class="loading">Loading...</div>';
  const filteredAnimes = animes.filter(anime => {
    const title = anime.title.toLowerCase();
    return title.includes(searchTerm);
  });
  renderHtml(filteredAnimes);
}