function testZellowFunctions(){
  // Create variable to test the fetchZillow functionality
  var zillowUrl = '';
  Logger.log("Input Zillow URL: \"" + zillowUrl + "\"");
  
  // Call the getZillow methods
  var locationName    = getZillowLocationName(zillowUrl);
  Logger.log("Location Name: \"" + locationName + "\"");
  
  var locationAddress = getZillowLocationAddress(zillowUrl);
  Logger.log("Location Address: \"" + locationAddress + "\"");
  
  var locationPrice   = getZillowLocationPrice(zillowUrl);
  Logger.log("Location Price: \"" + locationPrice + "\"");
  
  var locationSqft    = getZillowLocationSqft(zillowUrl);
  Logger.log("Location SqFt: \"" + locationSqft + "\"");
  
  var locationBeds    = getZillowLocationBeds(zillowUrl);
  Logger.log("Location Beds: \"" + locationBeds + "\"");
  
  var locationBaths   = getZillowLocationBaths(zillowUrl);
  Logger.log("Location Baths: \"" + locationBaths + "\"");
}

function getZillowLocationName(inputUrl) {
  // Fetch URL and parse (with old xml.parse method)
  var pageContentText = getZillowUrl(inputUrl);
  
  // Pull out the title on a zillow page
  var lookForTag   = "title";
  var lookForText  = "";
  
  var titleTextRegexp = new RegExp("<" + lookForTag + ">(.*?)" + lookForText + "(.*?)<\\/" + lookForTag + ">");
  var titleTextTemp = titleTextRegexp(pageContentText);
  
  if (titleTextTemp != null && titleTextTemp.length>2) {
    var regexpCleanup = new RegExp("(.*)");
    var titleText = regexpCleanup(titleTextTemp[2])[0];
    
    //  // Remove the extra 'zillow' bit
    var titleText = titleText.replace("  \| Zillow","");
    
    return titleText;
  }
  return titleTextTemp;
}

function getZillowLocationAddress(inputUrl) {
  // Fetch URL and parse (with old xml.parse method)
  var pageContentText = getZillowUrl(inputUrl);
  
  // Pull out the address on a zillow page
  var lookForTag   = "h2";
  var lookForClass = "bdp-sub-header";
  var lookForText  = "";
  
  var locationAddressRegexp = new RegExp("<" + lookForTag + " class=\"[^\"]*?(?:.*?)" + lookForClass + "(?:.*?)[^\"]*?\">((?:.*?)" + lookForText + "(?:.*?))<\\/" + lookForTag + ">");
  var locationAddressTemp = locationAddressRegexp(pageContentText);
  
  if (locationAddressTemp != null && locationAddressTemp.length > 1) {
    var locationAddress = '';
    if (locationAddressTemp[1].indexOf('<br>')>0) {
      var regexpCleanup = new RegExp("(.*?)<br>");
      locationAddress = regexpCleanup(locationAddressTemp[1])[1];
    } else {
      locationAddress = locationAddressTemp[1];
    }
    return locationAddress;
  } else {
    // Pull out the address on a zillow page
    var lookForTag   = "header"; 
    var lookForClass = "zsg-content-header"; //"zsg-content-header"
    var lookForText  = ">(.*?)(?:<span.*?>)(.*?)<\\/span>";
    
    var locationAddressRegexp = new RegExp("<" + lookForTag + " class=\"[^\"]*? ?" + lookForClass + " ?[^\"]*?\">(?:.*?)" + lookForText + "(?:.*?)<\\/" + lookForTag + ">");
    var locationAddressTemp = locationAddressRegexp(pageContentText);
    
    if (locationAddressTemp.length > 2) {
      var combinedText = locationAddressTemp[1] + locationAddressTemp[2];
      var regexpCleanup = new RegExp("^(?:.*?)(<.*>)(?:.*)$");
      var locationJunk = regexpCleanup(combinedText);
      
      if (locationJunk != null && locationJunk.length > 1) {
        var temp = combinedText.replace(locationJunk[1],"");
        return combinedText.replace(locationJunk[1],"");
      } else {
        return combinedText;
      }
    } else {
      return "";
    }
  }
  return "";
}

function getZillowLocationPrice(inputUrl) {
  // Fetch URL and parse (with old xml.parse method)
  var pageContentText = getZillowUrl(inputUrl);
  
  // Pull out the price on a zillow page
  var lookForTag   = "div";
  var lookForClass = "main-row";
  var lookForText  = "";
  
  var locationPriceRegexp = new RegExp("<" + lookForTag + " class=\"[^\"]*?" + lookForClass + "[^\"]*?\">(.*?)" + lookForText + "(.*?)<\\/" + lookForTag + ">");
  var locationPriceTemp = locationPriceRegexp(pageContentText);
  
  if (locationPriceTemp != null) {
    var regexpCleanup = new RegExp("\\$([0-9]{1,2},?[0-9]{3})");
    var locationPrice = regexpCleanup(locationPriceTemp);//[0];
    
    if (locationPrice != null && locationPrice.length > 1){
      return Number(locationPrice[1].replace(",",""));
    }
    return locationPrice;
  }
  return locationPriceTemp;
}

function getZillowLocationSqft(inputUrl) {
  // Fetch URL and parse (with old xml.parse method)
  var pageContentText = getZillowUrl(inputUrl);
  
  // Pull out the square feet on a zillow page
  var lookForTag   = "span";
  var lookForClass = "addr_bbs";
  var lookForText  = "sqft";
  
  var locationSqftRegexp = new RegExp("<" + lookForTag + " class=\"[^\"]*?" + lookForClass + "[^\"]*?\">(.*?)" + lookForText + "(.*?)<\\/" + lookForTag + ">");
  var locationSqftTemp = locationSqftRegexp(pageContentText);
  
  if (locationSqftTemp != null) {
    var regexpCleanup = new RegExp("([0-9]{1,2},?[0-9]{3}) " + lookForText);
    var locationSqft = regexpCleanup(locationSqftTemp);
    
    if (locationSqft != null && locationSqft.length > 1){
      return Number(locationSqft[1].replace(",",""));
    } else if (locationSqft == null) {
      return "";
    } else {
      return locationSqft;
    }
  }
  return locationSqftTemp;
}

function getZillowLocationBeds(inputUrl) {
  // Fetch URL and parse (with old xml.parse method)
  var pageContentText = getZillowUrl(inputUrl);
  
  // Pull out the number of beds on a zillow page
  var lookForTag   = "span";
  var lookForClass = "addr_bbs";
  var lookForText  = "beds?";
  
  var locationBedsRegexp = new RegExp("<" + lookForTag + " class=\"[^\"]*?" + lookForClass + "[^\"]*?\">(.*?)" + lookForText + "(.*?)<\\/" + lookForTag + ">");
  var locationBedsTemp = locationBedsRegexp(pageContentText);
  
  if (locationBedsTemp != null) {
    var regexpCleanup = new RegExp("([0-9]{1,2}) " + lookForText);
    var locationBeds = regexpCleanup(locationBedsTemp);//[1];
    
    if (locationBeds.length > 1){
      return Number(locationBeds[1]);
    }
    return locationBeds
  }
  return locationBedsTemp
}

function getZillowLocationBaths(inputUrl) {
  // Fetch URL and parse (with old xml.parse method)
  var pageContentText = getZillowUrl(inputUrl);
  
  // Pull out the number of baths on a zillow page
  var lookForTag   = "span";
  var lookForClass = "addr_bbs";
  var lookForText  = "baths?";
  
  var locationBathsRegexp = new RegExp("<" + lookForTag + " class=\"[^\"]*?" + lookForClass + "[^\"]*?\">(.*?)" + lookForText + "(.*?)<\\/" + lookForTag + ">");
  var locationBathsTemp = locationBathsRegexp(pageContentText);
  
  if (locationBathsTemp != null) {
    var regexpCleanup = new RegExp("([0-9]{1,2}(?:\.[0-9]{1,2})?) " + lookForText);
    var locationBaths = regexpCleanup(locationBathsTemp);//[0];
    
    if (locationBaths.length > 1){
      return Number(locationBaths[1]);
    }
    return locationBaths;
  }
  return locationBathsTemp;
}

function getZillowUrl(inputUrl) {
  // Define the cache keyword
  var cacheKeyword = "zillow-url:";
  
  // Call the 'getUrlContentTextWithCache' method
  return getUrlContentTextWithCache(cacheKeyword, inputUrl);
}