const playbtn = document.querySelector(".player .play");
const volumebtn = document.querySelector(".player .volume");
const tracks = document.querySelectorAll(".track");

const allAudio = document.querySelectorAll("audio");

const backgroundHtml = document.querySelector(".background");
const backgroundImg = document.querySelector(".background img");
const playingThumb = document.querySelector(".playing .thumb");
const playingImg = document.querySelector(".playing img");
const playingName = document.querySelector(".playing h1");
const playingArtist = document.querySelector(".playing h2");

const playerPlay = document.querySelector(".player .play");
const playerPlaySpan = playerPlay.querySelector("span");
const playerName = document.querySelector(".player .name");
const playerArtist = document.querySelector(".player .artist");
const playerImg = document.querySelector(".player .thumb img");

const playerLength = document.querySelector(".player .length");

const allPlaying = document.querySelectorAll(".play span");

function playCurrent() {
	tracks.forEach((track) => {
		if (track.classList.contains("active")) {
			let audio = track.querySelector("audio");
			let playing = track.querySelector(".play span");
			playing.textContent = playing.textContent === "pause" ? "play_arrow" : "pause";

			if (audio.paused) {
				playerPlaySpan.textContent = "pause";
				audio.play();
			} else {
				audio.pause();
				playerPlaySpan.textContent = "play_arrow";
			}
		}
	});
}
playbtn.addEventListener("click", () => {
	let span = playbtn.children[0];
	playbtn.classList.add("playactive");
	setTimeout(() => {
		playbtn.classList.remove("playactive");
	}, 700);
	if (span.textContent === "play_arrow") {
		playCurrent();

		span.textContent = "pause";
	} else {
		tracks.forEach((track) => {
			allAudio.forEach((audio) => {
				audio.pause();
			});
		});
		allPlaying.forEach((plays) => {
			plays.textContent = "play_arrow";
		});
		span.textContent = "play_arrow";
	}
});

volumebtn.addEventListener("click", () => {
	let span = volumebtn.children[0];

	if (span.textContent === "volume_up") {
		allAudio.forEach((audio) => {
			audio.volume = 0;
		});
		span.textContent = "volume_off";
	} else {
		allAudio.forEach((audio) => {
			audio.volume = 1;
		});
		span.textContent = "volume_up";
	}
});

tracks.forEach((track) => {
	track.addEventListener("click", (e) => {
		let trackElement = e.target.closest(".track");
		let audio = trackElement.querySelector("audio");
		let playing = trackElement.querySelector(".play span");

		if (trackElement.classList.contains("active")) {
			// Toggle play/pause text content
			playing.textContent = playing.textContent === "pause" ? "play_arrow" : "pause";

			if (audio.paused) {
				playerPlaySpan.textContent = "pause";
				audio.play();
			} else {
				audio.pause();
				playerPlaySpan.textContent = "play_arrow";
			}

			return;
		}

		// Remove active class from all others
		tracks.forEach((track) => {
			track.classList.remove("active");
			allAudio.forEach((audio) => {
				audio.pause();
			});
		});

		trackElement.classList.add("active");

		allPlaying.forEach((plays) => {
			plays.textContent = "play_arrow";
		});

		// Toggle play/pause text content
		playing.textContent = playing.textContent === "pause" ? "play_arrow" : "pause";

		if (audio.paused) {
			playerPlaySpan.textContent = "pause";
			audio.play();
		} else {
			audio.pause();
			playerPlaySpan.textContent = "play_arrow";
		}

		playingThumb.style.display = "none";
		backgroundImg.style.display = "none";

		// Get the thumb
		let thumb = trackElement.querySelector("img");
		let thumbSrc;
		if (thumb) {
			thumbSrc = thumb.getAttribute("src");
		}
		playingImg.setAttribute("src", thumbSrc);
		backgroundImg.setAttribute("src", thumbSrc);
		playerImg.setAttribute("src", thumbSrc);

		let name = trackElement.querySelector(".name").textContent;
		let artist = trackElement.querySelector(".artist").textContent;
		let songLength = trackElement.querySelector(".length").textContent;

		playerLength.textContent = songLength;
		playingArtist.textContent = artist;
		playingName.textContent = name;
		playerArtist.textContent = artist;
		playerName.textContent = name;
		setTimeout(() => {
			playingThumb.style.display = "block";
			backgroundImg.style.display = "block";
		}, 1);
	});
});
