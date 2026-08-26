import { getRecentlyPlayedGames } from "./js/steam-service-v2.js";

const steamid = "76561197970976199";
const url =
  "https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=4AE08FBFA9A2DD49137F77B169B63720&steamid=" +
  steamid +
  "&format=json";

getRecentlyPlayedGames(steamid, url);
