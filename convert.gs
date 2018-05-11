/**
* A custom function that converts meters to miles.
*
* @param {Number} meters The distance in meters.
* @return {Number} The distance in miles.
*/
function metersToMiles(meters) {
  if (typeof meters != 'number') {
    return null;
  }
  return meters / 1000 * 0.621371;
}

/**
* A custom function that converts seconds to minutes
*
* @param {Number} seconds. The travel time in seconds.
* @return {Number} The travel time in minutes.
*/
function secondsToMinutes(seconds) {
  if (typeof seconds != 'number') {
    return null;
  }
  return seconds / 60;
}


// Optional shorter custom functions
function convertMtoMi(meters){
  return metersToMiles(meters);
}

function convertStoM(seconds){
  return secondsToMinutes(seconds);
}
