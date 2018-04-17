const axios = require('axios');

function parseResponse(response, type) {
  let results = [];

  response.map(show => {
    results.push({
      tmdbID: show.id,
      title: show.name || show.title,
      image: 'https://image.tmdb.org/t/p/original' + show.poster_path,
      description: show.overview,
      type
    })
  });

  return results;

}

module.exports = function(req, res, next) {
  const title = req.body.title;
  let results = [];

  if (!title) {
    return res.status(422).send({ error: 'You must provide a title for the movie or TV show' });
  }

  axios.get(`https://api.themoviedb.org/3/search/tv?api_key=d8ddc598dbea57864e979b53c2d12b0c&query=${title}`)
    .then(response => {
      results = results.concat(parseResponse(response.data.results, 'tv'));
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=d8ddc598dbea57864e979b53c2d12b0c&query=${title}`)
        .then(response => {
          results = results.concat(parseResponse(response.data.results, 'movie'));
          res.status(200).json(results);
        });
    });
};
