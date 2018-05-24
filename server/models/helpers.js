/**
 * Convert and normalize the fields returned by the Episode API.
 * @param  {Episode} episode The instance of the Episode model to be updated.
 * @return {Object}          The new object to update the instance model.
 */
const parseEpisode = episode => ({
  tmdbEpisodeID: episode.id,
  seasonNumber: episode.season,
  episodeNumber: episode.number,
  airDate: episode.airdate,
  name: episode.name,
  description: episode.summary,
  image: episode.image ? episode.image.original : null,
  watched: false,
});

/**
 * Take a 2 letter ISO language code and return the full name (in English) for
 * the language. Defaults to "English".
 * @param  {String} code The 2 letter language code.
 * @return {String}      The full name of the language.
 */
const parseLanguage = (code) => {
  switch (code) {
    case 'en':
      return 'English';
    case 'fr':
      return 'French';
    case 'de':
      return 'German';
    case 'it':
      return 'Italian';
    case 'es':
      return 'Spanish';
    case 'zh':
      return 'Chinese';
    default:
      return 'English';
  }
};

/**
 * Convert and normalize the fields returned by the Movie API.
 * @param  {Object} movie           The movie object returned by the API.
 * @param  {WatchListItem} newItem  The instance of the WatchListItem model to
 *                                  be updated.
 * @return {Object}                 The new object to update the instance model.
 */
const parseMovie = (movie, item) => {
  item.title = movie.title;
  item.image = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
  item.description = movie.overview.replace(/(<([^>]+)>)/ig, '');
  item.airDate = movie.release_date;
  item.language = parseLanguage(movie.original_language);
};

/**
 * Take the search results from the 2 APIs (TV Shows and Movies) and normalize
 * into 1 single collection.
 * @param  {Array} response The collection of objects returned by the API.
 * @return {Array}          The collection of normalized results.
 */
const parseSearchResults = (response) => {
  const results = [];

  // For each item returned by the API
  response.map((newItem) => {
    let item = newItem;

    // If TV Show
    if (item.show) {
      item = item.show;
      item.type = 'TV';

      if (item.image)
        item.image = item.image.original;

    } else { // If Movie
      item.type = 'Movie';

      if(item.image)
        item.image = `https://image.tmdb.org/t/p/original${item.poster_path}`;
    }

    let description = '';
    if (item.summary)
      description = item.summary.replace(/(<([^>]+)>)/ig, '');
    else
      description = item.overview.replace(/(<([^>]+)>)/ig, '');

    // Append parsed object to the results array
    results.push({
      tmdbID: item.id,
      title: item.name || item.title,
      description,
      language: item.language || parseLanguage(item.original_language),
      image: item.image,
      type: item.type,
    });

    return item;
  });

  return results;
};

/**
 * Convert and normalize the fields returned by the TV Show API.
 * @param  {Object} show            The TV Show object returned by the API.
 * @param  {WatchListItem} newItem  The instance of the WatchListItem model to be updated.
 * @return {Object}                 The new object to update the instance model.
 */
const parseTVShow = (show, item) => {
  item.title = show.name;
  item.description = show.summary.replace(/(<([^>]+)>)/ig, '');
  item.image = show.image ? show.image.original : '';
  item.language = show.language;
};

/**
 * Export the helper functions to be used within model methods.
 * @type {Object}
 */
module.exports = {
  parseEpisode,
  parseLanguage,
  parseMovie,
  parseSearchResults,
  parseTVShow,
};
