import { songs } from "./songs.js";
import { createSongItem } from "./utilities.js";

const songList = document.querySelector(".song-list");
const audioPlayer = document.querySelector(".audio-player");

// Create the song items
const songsHtml = songs.map((song) => createSongItem(song));
songList.innerHTML = songsHtml.join("");
