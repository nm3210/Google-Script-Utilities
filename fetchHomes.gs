function testHomesFunctions(){
  // Create variable to test the fetchHomes functionality
  var homesUrl = '';
  Logger.log("Input Homes URL: \"" + homesUrl + "\" -> \"" + urlEncode(homesUrl) + "\"");
  
  // Call the getHomes methods
  var locationName    = getHomesLocationName(homesUrl);
  Logger.log("Location Name: \"" + locationName + "\"");
  
  var locationAddress = getHomesLocationAddress(homesUrl);
  Logger.log("Location Address: \"" + locationAddress + "\"");
  
  var locationPrice   = getHomesLocationPrice(homesUrl);
  Logger.log("Location Price: \"" + locationPrice + "\"");
  
  var locationSqft    = getHomesLocationSqft(homesUrl);
  Logger.log("Location SqFt: \"" + locationSqft + "\"");
  
  var locationBeds    = getHomesLocationBeds(homesUrl);
  Logger.log("Location Beds: \"" + locationBeds + "\"");
  
  var locationBaths   = getHomesLocationBaths(homesUrl);
  Logger.log("Location Baths: \"" + locationBaths + "\"");
}

function getHomesLocationName(inputUrl) {
  // Fetch URL and parse (with old xml.parse method)
  var homesJson = getHomesJson(inputUrl);
  
  var locationName = homesJson.property_detail.address.primary_address + " " + // Steet address
    homesJson.property_detail.address.locality.label + ", " + // Town
    homesJson.property_detail.address.region.label + " " + // City
    homesJson.property_detail.address.postal_code.label; // Postal code
  
  return locationName;
}

function getHomesLocationAddress(inputUrl) {
  // Fetch URL and parse (with old xml.parse method)
  var homesJson = getHomesJson(inputUrl);
  
  var locationAddress = homesJson.property_detail.address.primary_address + " " + // Steet address
    homesJson.property_detail.address.locality.label + ", " + // Town
    homesJson.property_detail.address.region.label + " " + // City
    homesJson.property_detail.address.postal_code.label; // Postal code
  
  return locationAddress;
}

function getHomesLocationPrice(inputUrl) {
  // Fetch URL and parse (with old xml.parse method)
  var homesJson = getHomesJson(inputUrl);
  
  var locationPrice = Number(homesJson.property_detail.price.value);
  
  return locationPrice;
}

function getHomesLocationSqft(inputUrl) {
  // Fetch URL and parse (with old xml.parse method)
  var homesJson = getHomesJson(inputUrl);
  
  var locationSqft = Number(homesJson.property_detail.square_footage.value);
  
  return locationSqft;
}

function getHomesLocationBeds(inputUrl) {
  // Fetch URL and parse (with old xml.parse method)
  var homesJson = getHomesJson(inputUrl);
  
  var locationBeds = Number(homesJson.property_detail.beds.value);
  
  return locationBeds;
}

function getHomesLocationBaths(inputUrl) {
  // Fetch URL and parse (with old xml.parse method)
  var homesJson = getHomesJson(inputUrl);
  
  var locationBaths = Number(homesJson.property_detail.baths.value);
  
  return locationBaths;
}

function getHomesJson(inputUrl) {
  // Base URL
  var baseHomesApiUrl = 'https://heliosapi.homes.com/v1/atlas/experience';
  
  var uriName  = 'uri';
  var homesUriRegexp = new RegExp("(?:https?)?(?:\:\/\/)?(?:www)?\.?homes\.com(.*)");
  var uriValue = urlEncode(homesUriRegexp(inputUrl)[1]);
  
  // Set up other input parameters
  var appName       = 'app';
  var appValue      = 'hdc_portal';
  var appPlatformName  = 'app_platform';
  var appPlatformValue = 'desktop';
  var homesApiKeyName  = 'api_key';
  var homesApiKeyValue = '583d4771-baa2-483b-92bb-b4f210451dac'; // Just from one of their websites, not requested
  
  // Construct url
  var fetchUrl = baseHomesApiUrl + 
    "?" + uriName +         "=" + uriValue + 
    "&" + appName +         "=" + appValue + 
    "&" + appPlatformName + "=" + appPlatformValue + 
    "&" + homesApiKeyName + "=" + homesApiKeyValue;
  
  // Define the cache keyword
  var cacheKeyword = "homes-url:";
  
  var homesApiJsonText = getUrlContentTextWithCache(cacheKeyword, fetchUrl);
  var homesApiJson = JSON.parse(homesApiJsonText);
  
  // Call the 'getUrlContentTextWithCache' method
  return homesApiJson;
}