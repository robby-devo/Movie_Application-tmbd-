// const API_URL =
//   "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3379e2e0994553fc1d0d3c5fac2bfca1";

// const IMG_PATH = "https://image.tmbd.org/t/p/w1280";

// const SEARCH_API =
//   'https://api.themoviedb.org/3/search/movie?api_key=3379e2e0994553fc1d0d3c5fac2bfca1&query="';

const api_link =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3379e2e0994553fc1d0d3c5fac2bfca1&page=1";
const img_link = "https://image.tmdb.org/t/p/w1280";
const search_api =
  'https://api.themoviedb.org/3/search/movie?api_key=3379e2e0994553fc1d0d3c5fac2bfca1&query="';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// Get initial movies
getMovies(api_link);

async function getMovies(url) {
  const res = await fetch(url);

  const data = await res.json();

  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
            <img src="${img_link + poster_path}" alt="${title}">
            <div class="movie-information">
          <h3>${title}</h3>
          <p class=" ${getClassByRate(
            vote_average
          )}">Rating: ${vote_average}</p>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `;
    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(search_api + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});
