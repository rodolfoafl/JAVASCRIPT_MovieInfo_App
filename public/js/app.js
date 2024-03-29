const form = document.querySelector("#searchForm");
const listMovies = document.querySelector("#movies");
const searchText = document.querySelector("#searchText");

if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();

    getMovies(searchText.value);
  });
}

function movieSelected(id) {
  console.log("teste");
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");

  let selectedMovie = document.querySelector("#movie");

  axios
    .get(`http://www.omdbapi.com/?i=${movieId}&apikey=3f85b66e`)
    .then(res => {
      let movie = res.data;

      let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${
                movie.Genre
              }</li>
              <li class="list-group-item"><strong>Released:</strong> ${
                movie.Released
              }</li>
              <li class="list-group-item"><strong>Rated:</strong> ${
                movie.Rated
              }</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${
                movie.imdbRating
              }</li>
              <li class="list-group-item"><strong>Director:</strong> ${
                movie.Director
              }</li>
              <li class="list-group-item"><strong>Writer:</strong> ${
                movie.Writer
              }</li>
              <li class="list-group-item"><strong>Actors:</strong> ${
                movie.Actors
              }</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${
              movie.imdbID
            }" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-secondary">Go Back To Search</a>
          </div>
        </div>
      `;

      selectedMovie.innerHTML = output;
    })
    .catch(err => {
      console.log(err);
    });
}

function getMovies(text) {
  axios
    .get(`http://www.omdbapi.com/?s=${text}&apikey=3f85b66e`)
    .then(res => {
      let movies = res.data.Search;
      let output = "";

      movies.forEach(movie => {
        let poster = "./img/default-movie.png";
        if (movie.Poster !== "N/A") {
          poster = movie.Poster;
        }

        output += `<div class="movies-container">
            <div class="well text-center">
                <img src="${poster}">
                <h5>${movie.Title}</h5>
                <a onclick="movieSelected('${
                  movie.imdbID
                }')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>`;
      });

      listMovies.innerHTML = output;
    })
    .catch(err => {
      console.log(err);
    });
}
