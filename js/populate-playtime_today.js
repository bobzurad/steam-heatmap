const Client = require('mariasql');
const moment = require('moment');

var c = new Client({
  host: 'localhost',
  user: 'steam',
  password: '',
  db: 'steam'
});

c.query('select steamid, date, appid, playtime_2weeks from recentlyPlayed where playtime_today = -1;',
  {},
  (error, rows) => {
    "use strict";
    
    let minutes = calculateMinutes(steamid, date, appid, c);    
  });


function calculateMinutes(steamid, date, appid, c) {
  "use strict";
  
  c.query('select playtime_2weeks from recentlyPlayed where steamid = :steamid and appid = :appid and date = date_sub(:date, interval 2 day);',
    {
      steamid: steamid,
      date: date,
      appid: appid
    },
    (error, rows) => {
      let blah = "blah";
    });
}
