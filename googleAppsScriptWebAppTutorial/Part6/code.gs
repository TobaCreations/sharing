var url = ""; //ENTER HERE YOUR URL

function doGet(e){

  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Options");
  var list = ws.getRange(1,1,ws.getRange("A1").getDataRegion().getLastRow(), 1).getValues();
  var htmlListArray = list.map(function(r){ return '<option>' + r[0] + '</option>'; }).join('');
  
  var tmp = HtmlService.createTemplateFromFile("page");
  tmp.list = htmlListArray;
  return tmp.evaluate();
  
}


function userClicked(userInfo){
  
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Data");
  
  ws.appendRow([userInfo.firstName, userInfo.lastName, userInfo.app, userInfo.zip, userInfo.est, userInfo.prefDate, new Date()]) 
  
  //Logger.log(name + " Clicked the Button");
}


function getCost(zipCode){
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Estimate");
  var data = ws.getRange(1, 1, ws.getLastRow(), 2).getValues();
  
  var zipCodesList = data.map(function(r){ return r[0]; });
  var costList = data.map(function(r){ return r[1]; });
  
  var position = zipCodesList.indexOf(zipCode); if(position > -1){
    return "$" + costList[position].toFixed(2);
  } else {
    return 'Unavailable';
  }
}


function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getCalendarBusyDays(){
  var startDate = new Date();
  var endDate = new Date(new Date().setYear(startDate.getFullYear()+1));
  
  var calendar = CalendarApp.getCalendarsByName("")[0]; //ENTER HERE YOUR CALENDAR NAME (GMAIL)
  var events = calendar.getEvents(startDate, endDate);
  
  var days = events.map(function(e){ return e.getStartTime().setHours(0,0,0,0); });
  var uniqueDays = [];
    days.forEach(function(d){
      if(uniqueDays.indexOf(d) === - 1){ uniqueDays.push(d);
      }
    });
    
  return uniqueDays;
}
