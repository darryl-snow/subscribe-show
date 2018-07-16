/**
 * Format a given date string into YYYY-MM-DD.
 * @param  {String} date The date to be formatted.
 * @return {String}      The formatted date.
 */
export function formatDate(date) {
  const year = date.getFullYear()
  const month = (`0${date.getMonth() + 1}`).slice(-2)
  const day = (`0${date.getDate()}`).slice(-2)
  return (`${year}-${month}-${day}`)
}

export function formatSeasonEpisodeNumbers(season, episode) {
  const s = (`0${season}`).slice(-2)
  const e = (`0${episode}`).slice(-2)
  return (`S${s}E${e}`)
}

export function slugify(title) { return title.toLowerCase().replace(/\s/g, '-') }
