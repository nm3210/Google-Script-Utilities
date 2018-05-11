/**
* 
*/
function activeRangeToValue_() {
  // Get current sheet/range
  var sheet = SpreadsheetApp.getActiveSheet()
  var curRange = sheet.getActiveRange();
  
  // Convert to A1 notation
  var rangeA1Notation = curRange.getA1Notation();
  
  // Call function
  rangeToValue(rangeA1Notation);
}

/**
* 
*/
function rangeToValue(pRange){
  var sheet = SpreadsheetApp.getActiveSheet();
  
  var range = sheet.getRange(pRange);
  var numRows = range.getNumRows();
  var numCols = range.getNumColumns();
  var writeValues = []
  for (var i = 1; i <= numRows; i++) {
    var row = []
    for (var j = 1; j <= numCols; j++) {
      var currentValue = range.getCell(i,j).getValue();
      var withString = currentValue;
      row.push(withString)
    }
    writeValues.push(row)
  }
  range.setValues(writeValues)
}

/**
* 
*/
function getUrlContentTextWithCache(cacheKeyword, inputUrl){
  // Define the cache key (based on the url)
  var currentCacheKey = cacheKeyword + inputUrl;
  
  // Trim key to the maximum size
  var maximumKeyLength = 250 - 50; // leave some wiggle room
  currentCacheKey = currentCacheKey.substring(0,maximumKeyLength);
  
  // Create key for storing the number of caches needed
  var cacheKeyLength = currentCacheKey + ";" + "length";
  
  // Define the desired cache interval before needing a refresh
  var cacheIntervalSec = 21600; // six hours
  
  // Define maximum cache size
  var cacheMaximumSize = 75*1024; // bytes
  
  // Check the cache service for a copy of the 
  var cache = CacheService.getDocumentCache();
  var cachedDataLength = cache.get(cacheKeyLength);
  
  // Initialize data output variable (will be concatenated)
  var cachedData = '';
  
  // Loop through and pull out all the caches
  for(var curCacheIdx = 0; curCacheIdx < cachedDataLength; curCacheIdx++){
    // Create url
    var cacheKeyIndex = currentCacheKey + ";" + curCacheIdx;
    
    // Pull out data
    var curCachedData = cache.get(cacheKeyIndex);
    
    // Combine together (dirty way of combining strings)
    cachedData = cachedData + curCachedData;
  }
  
  // Return the cached data if valid
  if (cachedData != null && cachedData.length>0) {
//    Logger.log("Used cache for \"" + currentCacheKey + "\"; Length = " + cachedData.length);
    Logger.log("Used cache (length = " + cachedData.length + ")");
    return cachedData;
  }
  
  /****  Update cache  ****/
  
  // Otherwise, fetch the URL again (or for the first time)
  var result = UrlFetchApp.fetch(inputUrl);
  var contentString = result.getContentText();
  var contentLength = contentString.length;
  
//  Logger.log("Did not use cache, got new info for \"" + currentCacheKey + "\"; Length = " + contentLength)
  Logger.log("Did not use cache, got new info  (length = " + contentLength + ")")
  
  // Calculate the number of cache keys needed
  var numCachesNeeded = Math.ceil(contentLength/cacheMaximumSize);
  
  // Save key for lenth
  cache.put(cacheKeyLength, numCachesNeeded, cacheIntervalSec);
  
  // Loop through and save all caches
  for(var curCacheIdx = 0; curCacheIdx < numCachesNeeded; curCacheIdx++){
    // Create url
    var cacheKeyIndex = currentCacheKey + ";" + curCacheIdx;
    
    // Split up data
    var currentContent = contentString.substring(0+curCacheIdx*cacheMaximumSize,0+(curCacheIdx+1)*cacheMaximumSize);
    
    // And store the results in the cache
    cache.put(cacheKeyIndex, currentContent, cacheIntervalSec);
  }
  
  return contentString;
}