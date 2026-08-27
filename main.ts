import { loadEnvFile } from "node:process";
import { getRecentlyPlayedGames } from "./src/steam-service-v2.ts";

loadEnvFile();

const steamId = process.env.STEAM_ID as string;
const steamApiKey = process.env.STEAM_API_KEY as string;
const url =
  "https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=" +
  steamApiKey +
  "&steamid=" +
  steamId +
  "&format=json";

getRecentlyPlayedGames(steamId, url);
