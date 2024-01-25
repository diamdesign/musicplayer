export function createSongItem(songItem) {
  const assetsPath = "../assets/";

  return /*html*/ `
  <article class="song">
    <figure>
      <img src="${assetsPath}/album-covers/${songItem.albumCover}">
    </figure>
    <span>${songItem.song}</span>
    <span class="icon material-symbols-outlined">
      play_arrow
    </span>
  </article>
  `;
}
