parseEpisode = function(episode) {
  return {
    tmdbEpisodeID: episode.id,
    seasonNumber: episode.season,
    episodeNumber: episode.number,
    airDate: episode.airdate,
    name: episode.name,
    description: episode.summary,
    image: episode.image ? episode.image.original : null,
    watched: false
  }

}

parseLanguage = function(code) {

  switch(code) {
    case "en":
      return "English";
    case "fr":
      return "French";
    case "de":
      return "German";
    case "it":
      return "Italian";
    case "es":
      return "Spanish";
    case "zh":
      return "Chinese";
    default:
      return "English";
  }

}

parseMovie = function(movie, item) {
  item.title = movie.title;
  item.image = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
  item.description = movie.overview;
  item.airDate = movie.release_date;
  item.language = parseLanguage(movie.original_language);
}

parseSearchResults = function(response) {
  let results = [];

  response.map(item => {

    if (item.show) {
      item = item.show;
      item.type = "TV";

      if(item.image) {
        item.image = item.image.original;
      }

    } else {
      item.type = "Movie";
      item.image = `https://image.tmdb.org/t/p/original${item.poster_path}`;
    }

    results.push({
      tmdbID: item.id,
      title: item.name || item.title,
      description: item.summary || item.overview,
      language: item.language || parseLanguage(item.original_language),
      image: item.image,
      type: item.type
    });

  });

  return results;
}

parseTVShow = function(show, item) {
  item.title = show.name;
  item.description = show.summary.replace(/(<([^>]+)>)/ig,'');
  item.image = show.image ? show.image.original : '';
  item.language = show.language;
}

module.exports = {
  parseEpisode: parseEpisode,
  parseLanguage: parseLanguage,
  parseMovie: parseMovie,
  parseSearchResults: parseSearchResults,
  parseTVShow: parseTVShow
}
