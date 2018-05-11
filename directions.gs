function testDirectionFunctions() {
  // Create variable to test the directions functionality
  var locAddress = '';
  var destination = urlEncode('');
  var origin = urlEncode(locAddress);
  
  var direction = getDrivingDirection(origin,destination);
  
  Logger.log("Destination: " + destination);
  Logger.log("Origin: "      + locAddress);
  Logger.log("Direction: "   + direction);
}

/**
* A custom function that gets the driving distance between two addresses.
*
* @param {String} origin The starting address.
* @param {String} destination The ending address.
* @return {Number} The distance in meters.
*/
function getDrivingDistance(origin, destination) {
  var directions = getDirections_(origin, destination);
  return directions.routes[0].legs[0].distance.value;
}

/**
* A custom function that gets the driving time between two addresses.
*
* @param {String} origin The starting address.
* @param {String} destination The ending address.
* @return {Number} The travel time in seconds.
*/
function getDrivingDuration(origin, destination) {
  var directions = getDirections_(origin, destination);
  return directions.routes[0].legs[0].duration.value;
}

/**
* A custom function that gets the driving cardinal direction from origin to the destination
*
* @param {String} origin The starting address.
* @param {String} destination The ending address.
* @return {Number} The travel time in seconds.
*/
function getDrivingDirection(origin, destination) {
  var directions = getDirections_(origin, destination);
  
  // Pull out lat/lons
  var originLat = directions.routes[0].legs[0].start_location.lat;
  var originLon = directions.routes[0].legs[0].start_location.lng;
  var destLat   = directions.routes[0].legs[0].end_location.lat;
  var destLon   = directions.routes[0].legs[0].end_location.lng;
  
  // Calculate bearing, from https://www.movable-type.co.uk/scripts/latlong.html
  // using the initial bearing/forward azimuth form.
  var φ1 = originLat / 180*Math.PI;
  var λ1 = originLon / 180*Math.PI;
  var φ2 = destLat   / 180*Math.PI;
  var λ2 = destLon   / 180*Math.PI;
  
  var y = Math.sin(λ2-λ1) * Math.cos(φ2);
  var x = Math.cos(φ1)*Math.sin(φ2) - Math.sin(φ1)*Math.cos(φ2)*Math.cos(λ2-λ1);
  var bearing = Math.atan2(y, x)*180/Math.PI;
  
  var bearingAdjust = 22.5 - 180; // Used just for the cardinal direction lookup
  var bearingNew = (bearing-bearingAdjust + 360) % 360;
  
  // Convert to a lookup index
  var bearingIdx = Math.floor(bearingNew/45);
  
  // Create lookup array
  var cardinalDirections = new Array(8);
  cardinalDirections[0] = "SW";
  cardinalDirections[1] = "W";
  cardinalDirections[2] = "NW";
  cardinalDirections[3] = "N";
  cardinalDirections[4] = "NE";
  cardinalDirections[5] = "E";
  cardinalDirections[6] = "SE";
  cardinalDirections[7] = "S";
  
  return cardinalDirections[bearingIdx];
}

/**
* A shared helper function used to obtain the full set of directions
* information between two addresses. Uses the Apps Script Maps Service.
*
* @param {String} origin The starting address.
* @param {String} destination The ending address.
* @return {Object} The directions response object.
*/
function getDirections_(origin, destination) {
  var defaultMode = 'driving';
  return getDirectionsFull_(origin,destination,defaultMode);
}

function getDirectionsFull_(inputOrigin, inputDestination, inputNavigationMode) {
  // Set up base URL options
  var baseUrl      = "https://maps.googleapis.com/maps/api/directions/";
  var outputFormat = 'json'; // options are 'json' or 'xml', but only json is being used here
  
  // Input map directions api key
  var mapApiKeyName  = 'key';
  var mapApiKeyValue = ''; // Insert key here
  
  // Set up other input parameters
  var originName       = 'origin';
  var originValue      = inputOrigin;
  var destinationName  = 'destination';
  var distinationValue = inputDestination;
  var modeName         = 'mode';
  var modeValue        = inputNavigationMode;
  
  // Construct url
  var fetchUrl = baseUrl + outputFormat +  
    "?" + mapApiKeyName +   "=" + mapApiKeyValue + 
    "&" + originName +      "=" + originValue + 
    "&" + destinationName + "=" + distinationValue + 
    "&" + modeName +        "=" + modeValue;
      
  // Define the cache keyword
  var cacheKeyword = "googlemapsdirections-url:";
  
  // Fetch context text (using the cache feature)
  var json = getUrlContentTextWithCache(cacheKeyword, fetchUrl);
  
  // Parse the JSON
  var directions = JSON.parse(json);
  
  return directions;
}