import { get } from "node:https";
import process from "node:process";
import mariadb from "mariadb";

function getRecentlyPlayedGames(steamid, url) {
  process.stdout.write(new Date() + " - starting\n");

  get(url, (res) => {
    if (res.statusCode === 200) {
      process.stdout.write(new Date() + " - got response\n");

      const pool = mariadb.createPool({
        host: "localhost",
        user: "steam",
        password: "steamhm",
        database: "steam",
      });

      res.on("data", async (d) => {
        const data = JSON.parse(d);

        if (data.response.total_count > 0) {
          let conn;
          try {
            conn = await pool.getConnection();
            for (let i = 0; i < data.response.total_count; i++) {
              const result = await conn.query(
                "INSERT INTO recentlyPlayed VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [
                  steamid,
                  new Date(),
                  data.response.games[i].appid,
                  data.response.games[i].name,
                  -1,
                  data.response.games[i].playtime_2weeks,
                  data.response.games[i].playtime_forever,
                  data.response.games[i].img_icon_url,
                  data.response.games[i].img_logo_url,
                ],
              );
            }
            process.stdout.write(new Date() + " - data written\n");
          } finally {
            if (conn) conn.release();
            await pool.end();
            process.stdout.write(new Date() + " - done\n");
          }
        }
      });
    }
  }).on("error", (error) => {
    process.stdout.write(new Date() + " - " + error);
  });
}

export { getRecentlyPlayedGames };
