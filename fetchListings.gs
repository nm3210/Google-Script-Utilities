function testListingFunctions(){
  // Create variable to test the fetchHomes functionality
  var zillowUrl = '';
  var homesUrl  = '';
  
  var pickUrl = zillowUrl;
  Logger.log("Input URL: \"" + pickUrl + "\"");
  
  // Call the getHomes methods
  var locationName    = getLocationName(pickUrl);
  Logger.log("Location Name: \"" + locationName + "\"");
  
  var locationAddress = getLocationAddress(pickUrl);
  Logger.log("Location Address: \"" + locationAddress + "\"");
  
  var locationPrice   = getLocationPrice(pickUrl);
  Logger.log("Location Price: \"" + locationPrice + "\"");
  
  var locationSqft    = getLocationSqft(pickUrl);
  Logger.log("Location SqFt: \"" + locationSqft + "\"");
  
  var locationBeds    = getLocationBeds(pickUrl);
  Logger.log("Location Beds: \"" + locationBeds + "\"");
  
  var locationBaths   = getLocationBaths(pickUrl);
  Logger.log("Location Baths: \"" + locationBaths + "\"");
}

function getLocationName(inputUrl) {
  // Parse domain name
  var regexDomain = new RegExp("(?:https?)?(?:\:\/\/)?(?:www)?\.?(.*?)\.com");
  var domainName  = regexDomain(inputUrl)[1];
  
  // Switch between different domains
  switch (domainName) {
    case "zillow":
      return getZillowLocationName(inputUrl);
    case "homes":
      return getHomesLocationName(inputUrl);
    default:
      return "Unsupported URL";
  }
}

function getLocationAddress(inputUrl) {
  // Parse domain name
  var regexDomain = new RegExp("(?:https?)?(?:\:\/\/)?(?:www)?\.?(.*?)\.com");
  var domainName  = regexDomain(inputUrl)[1];
  
  // Switch between different domains
  switch (domainName) {
    case "zillow":
      return getZillowLocationAddress(inputUrl);
    case "homes":
      return getHomesLocationAddress(inputUrl);
    default:
      return "Unsupported URL";
  }
}

function getLocationPrice(inputUrl) {
  // Parse domain name
  var regexDomain = new RegExp("(?:https?)?(?:\:\/\/)?(?:www)?\.?(.*?)\.com");
  var domainName  = regexDomain(inputUrl)[1];
  
  // Switch between different domains
  switch (domainName) {
    case "zillow":
      return getZillowLocationPrice(inputUrl);
    case "homes":
      return getHomesLocationPrice(inputUrl);
    default:
      return "Unsupported URL";
  }
}

function getLocationSqft(inputUrl) {
  // Parse domain name
  var regexDomain = new RegExp("(?:https?)?(?:\:\/\/)?(?:www)?\.?(.*?)\.com");
  var domainName  = regexDomain(inputUrl)[1];
  
  // Switch between different domains
  switch (domainName) {
    case "zillow":
      return getZillowLocationSqft(inputUrl);
    case "homes":
      return getHomesLocationSqft(inputUrl);
    default:
      return "Unsupported URL";
  }
}

function getLocationBeds(inputUrl) {
  // Parse domain name
  var regexDomain = new RegExp("(?:https?)?(?:\:\/\/)?(?:www)?\.?(.*?)\.com");
  var domainName  = regexDomain(inputUrl)[1];
  
  // Switch between different domains
  switch (domainName) {
    case "zillow":
      return getZillowLocationBeds(inputUrl);
    case "homes":
      return getHomesLocationBeds(inputUrl);
    default:
      return "Unsupported URL";
  }
}

function getLocationBaths(inputUrl) {
  // Parse domain name
  var regexDomain = new RegExp("(?:https?)?(?:\:\/\/)?(?:www)?\.?(.*?)\.com");
  var domainName  = regexDomain(inputUrl)[1];
  
  // Switch between different domains
  switch (domainName) {
    case "zillow":
      return getZillowLocationBaths(inputUrl);
    case "homes":
      return getHomesLocationBaths(inputUrl);
    default:
      return "Unsupported URL";
  }
}