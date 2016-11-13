const Client = require('mariasql');
const fs = require('fs');
const util = require('util');
const request = require('request');
const moment = require('moment');

//const log_file = fs.createWriteStream(__dirname + '/../debug.log', {flags : 'w'});

const steamid = '76561197970976199';
const url = 'http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=4AE08FBFA9A2DD49137F77B169B63720&steamid=76561197970976199&format=json';

/*
console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  process.stdout.write(util.format(d) + '\n');
};
*/

console.log(moment().format("YYYY-MM-DD:HH-mm-ss-SSS") + " - starting");

request(url, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    console.log(moment().format("YYYY-MM-DD:HH-mm-ss-SSS") + " - got response");

    const data = JSON.parse(body);
    
    var c = new Client({
      host: 'localhost',
      user: 'steam',
      password: '',
      db: 'steam'
    });

    for (var i = 0; i < data.response.total_count; i++) {
      c.query('insert into recentlyPlayed values (:steamid, :date, :appid, :name, :playtime_today, :playtime_2weeks, :playtime_forever, :img_icon_url, :img_logo_url)', {
          steamid: steamid,
          date: moment().format('YYYY-MM-DD'),
          appid: data.response.games[i].appid,
          name: data.response.games[i].name,
          playtime_today: -1,
          playtime_2weeks: data.response.games[i].playtime_2weeks,
          playtime_forever: data.response.games[i].playtime_forever,
          img_icon_url: data.response.games[i].img_icon_url,
          img_logo_url: data.response.games[i].img_logo_url
        }, 
        (error, rows) =>  {
          if (error) {
              console.log(moment().format("YYYY-MM-DD:HH-mm-ss-SSS") + " - " + error);
          }
        }
	     );
    }
      console.log(moment().format("YYYY-MM-DD:HH-mm-ss-SSS") + " - data written");

    c.query('select * from recentlyPlayed where date > date_sub(curdate(), interval 2 day);', 
      {},
      (error, rows) => {
        if (error) {
            console.log(moment().format("YYYY-MM-DD:HH-mm-ss-SSS") + " - " + error);
        } else {
            console.log(moment().format("YYYY-MM-DD:HH-mm-ss-SSS") + " - calculating minutes");
          var minutesData = calculateMinutes(rows);
            console.log(moment().format("YYYY-MM-DD:HH-mm-ss-SSS") + " - done");
        }
      });

    c.end();
  } else {
      console.log(moment().format("YYYY-MM-DD:HH-mm-ss-SSS") + " - " + error);
  }
});

function calculateMinutes(data) {

}
