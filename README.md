# Music Player in JavaScript

It's time to create a real music player in JavaScript. With everything we have learned so far, this will be a good challenge for you.

<br>
<div style="margin: auto; width: 200px;">
  <img src="./assets/inspiration_screenshot.png">
</div>
<br>

By using the `<audio>` tag in JavaScript we get a working music player out of the box that is fully equipped with everything we need in order to make shrimp paste of this exercise!

To you help you have these resources:

- [w3shools `<audio>` tag](https://www.w3schools.com/tags/tag_audio.asp)
- [w3schools `<audio>` DOM reference](https://www.w3schools.com/tags/ref_av_dom.asp)
- [`<audio>`: The Embed Audio element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio#usage_notes)
- [Jamendo Music](https://www.jamendo.com/start) - Free download of independent music, needs account but it's free.

In the assets folder you already have access to six random rock songs and their album cover. If you want other songs, you are free to add them on your own. Use the [Jamendo Music](https://www.jamendo.com/start) webpage or from another source.

## Requirements

- The application must be written in vanilla JavaScript and "vanilla" CSS.

- I want to see a nice looking UI of the music player. 

- There should be at least six different songs that you can listen to.

- All the songs should be available locally, which means they need to be inside your application. No external requests.

- One view where you can see a playlist. The playlist must not include every available song, but at least six of them.

- One view where you can see the current song that is being played.

- Every song must come with at least one image, it could be an album cover for instance.

- Both artist name and song name must be visible for every song. Bonus would be to also see the name of the album.

- By clicking on a song in the playlist, that song should be played and the UI should reflect which song is playing.

- By clicking on a song that is being played, that song should be paused and the UI should reflect that.

- By clicking on song that is not being played, should start playing that song, and stop the song that is being played. The UI should reflect that.

- There should be music controls in the application _(NOT the default controls)_ including the following: `play`, `pause`, `next song`, `previous song`, `loop playlist`, `shuffle playlist` and a `range` to show how long a song is, how much of the song that has been played and to be able to go back and forth within the song.

- When a song is done, the next song in the playlist should start playing automatically. If you have reached the bottom of the list, no other song should be played, unless you have clicked the `loop playlist` button, then the first song in the list should start playing again.

- If `shuffle playlist` has been clicked, when a song is done, a random song in the list should be played. But every song should be played at least once before they are eligible at random again. So there should always be a new song ready when the `shuffle playlist` button has been clicked.

### Bonus features

- The playlist should be empty from the beginning and you should have a view where you can find all available songs. Here there should be options, clicking a song might play it directly, or add it to the playlist. Then you could go back to the playlist view and play it from there.

- A view where all the albums are listed. If you click an album, you go to a view where you can see all available songs of that album. Requires more song files. Here there should be options, clicking a song might play it directly, or add it to the playlist.

- A view where all the artists are listed, if you click an artist you go to a view where you can see all available songs of that artist. Requires more song files. Here there should be options, clicking a song might play it directly, or add it to the playlist.

- The two features above could be solved with some sort of search or filter feature, if you find that more appropriate instead.

- It should be possible to create more playlists, now it gets tricky. A view for the different playlist might be necessary.

###  Thoughts from teacher

The different views described in the requirements above doesen't necessarily have to be different HTML documents, they could share space in the same. It all depends on how you want to structure your application. Try to seperate as much as possible of course. It helps with readability.

You only need one `<audio>` element in your application, and it should be hidden, since you are creating the controls on your own. 
