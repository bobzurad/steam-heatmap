import { loadEnvFile } from 'node:process';
import { getRecentlyPlayedGames } from "./js/steam-service-v2.js";

loadEnvFile();

const steamId = process.env.STEAM_ID;
const steamApiKey = process.env.STEAM_API_KEY;
const url =
  "https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=" +
  steamApiKey +
  "&steamid=" +
  steamId +
  "&format=json";

getRecentlyPlayedGames(steamId, url);
