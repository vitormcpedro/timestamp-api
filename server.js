var express = require('express')
var app = express()

var monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

app.get('/', function (req, res) {
  res.send('Homepage!')
})

app.get("/:inputDate", function(req, res) {
  var result = {
      unix: null,
      natural: null,
  }
  
  // Get date from natural language
  var date = new Date(req.params.inputDate)
  
  // Or Get date from timestamp
  if(!date.getTime()) {
     date = new Date(parseInt(req.params.inputDate,10)*1000) // unix timestamp is in seconds, Date object receives ms
  }
  
  var unixTime = date.getTime()
  if(unixTime) {
      result.unix = unixTime/1000
      result.natural = monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
  }
  
  res.send(result);
});

app.listen(8080)