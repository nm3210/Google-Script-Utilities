/**
* A special function that runs when the spreadsheet is open, used to add a
* custom menu to the spreadsheet.
*/
function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    {name: 'Test01...', functionName: 'testFunction01_'},
    {name: 'Convert cell/range to value', functionName: 'activeRangeToValue_'}
  ];
  spreadsheet.addMenu('Testing', menuItems);
}
