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
      return "Unknown";
  }

}

module.exports = {
  parseSearchResults: parseSearchResults,
  parseLanguage: parseLanguage
}
