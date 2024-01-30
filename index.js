var loopOn = false;
var shuffleOn = false;

const playlist = document.querySelector(".list");
const playbtn = document.querySelector(".player .play");
const nextbtn = document.querySelector(".player .next");
const prevbtn = document.querySelector(".player .prev");
const shufflebtn = document.querySelector(".player .shuffle");
const repeatbtn = document.querySelector(".player .loop");

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

const time = document.querySelector(".time");
const playerPlayedTime = document.querySelector(".playedtime");

const tracker = document.getElementById("tracker");

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
				updateTime(audio);
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

function formatTime(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60);
	return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

function updateTime(audio) {
	audio.addEventListener("timeupdate", () => {
		const currentTime = audio.currentTime;
		const duration = audio.duration;

		const timeLeft = duration - currentTime;

		const formattedTimeLeft = formatTime(timeLeft);

		const percentageLeft = 100 - (timeLeft / audio.duration) * 100;
		playerPlayedTime.style.width = percentageLeft + "%";

		playerLength.textContent = formattedTimeLeft;

		if (currentTime >= duration) {
			nextTrack();
		}
	});
}

function updateInfo(active) {
	let playing = active.querySelector(".play span");
	allPlaying.forEach((plays) => {
		plays.textContent = "play_arrow";
	});
	// Toggle play/pause text content
	playing.textContent = playing.textContent === "pause" ? "play_arrow" : "pause";

	playingThumb.style.display = "none";
	backgroundImg.style.display = "none";

	// Get the thumb
	let thumb = active.querySelector("img");
	let thumbSrc;
	if (thumb) {
		thumbSrc = thumb.getAttribute("src");
	}
	playingImg.setAttribute("src", thumbSrc);
	backgroundImg.setAttribute("src", thumbSrc);
	playerImg.setAttribute("src", thumbSrc);

	let name = active.querySelector(".name").textContent;
	let artist = active.querySelector(".artist").textContent;
	let songLength = active.querySelector(".length").textContent;

	playerLength.textContent = songLength;
	playingArtist.textContent = artist;
	playingName.textContent = name;
	playerArtist.textContent = artist;
	playerName.textContent = name;
	setTimeout(() => {
		playingThumb.style.display = "block";
		backgroundImg.style.display = "block";
	}, 0);
}

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

		updateTime(audio);

		trackElement.classList.add("active");

		allPlaying.forEach((plays) => {
			plays.textContent = "play_arrow";
		});

		updateInfo(trackElement);

		if (audio.paused) {
			playerPlaySpan.textContent = "pause";
			audio.play();
		} else {
			audio.pause();
			playerPlaySpan.textContent = "play_arrow";
		}
	});
});

var randomArray = [];

function nextTrack() {
	let activeSong;
	let nextTrack;
	if (shuffleOn) {
		do {
			random = Math.floor(Math.random() * playlist.children.length);
			nextTrack = playlist.children[random];
		} while (nextTrack.classList.contains("active"));

		randomArray.push(random);
	} else {
		activeSong = document.querySelector(".active");
		nextTrack = activeSong.nextElementSibling;
	}

	if (!nextTrack) {
		if (loopOn) {
			nextTrack = document.querySelector(".track:first-child");
		} else {
			return;
		}
	}

	let audio = nextTrack.querySelector("audio");

	tracks.forEach((track) => {
		track.classList.remove("active");
		allAudio.forEach((audio) => {
			audio.pause();
		});
	});

	audio.play();
	updateTime(audio);
	updateInfo(nextTrack);
	playerPlaySpan.textContent = "pause";
	nextTrack.classList.add("active");
}

function prevTrack() {
	let activeSong = document.querySelector(".active");
	let prevTrack;
	if (shuffleOn) {
		randomArray.pop();
		let randomNumber = randomArray[randomArray.length - 1];
		prevTrack = playlist.children[randomNumber];
	} else {
		prevTrack = activeSong.previousElementSibling;
	}

	if (!prevTrack) {
		prevTrack = document.querySelector(".track:last-of-type");
	}

	let audio = prevTrack.querySelector("audio");

	tracks.forEach((track) => {
		track.classList.remove("active");
		allAudio.forEach((audio) => {
			audio.pause();
		});
	});

	audio.play();
	updateTime(audio);
	updateInfo(prevTrack);
	playerPlaySpan.textContent = "pause";
	prevTrack.classList.add("active");
}

nextbtn.addEventListener("click", () => {
	nextTrack();
});

prevbtn.addEventListener("click", () => {
	prevTrack();
});

shufflebtn.addEventListener("click", () => {
	if (shuffleOn) {
		shufflebtn.classList.remove("on");
		shuffleOn = false;
	} else {
		shufflebtn.classList.add("on");
		shuffleOn = true;
	}
});

repeatbtn.addEventListener("click", () => {
	if (loopOn) {
		repeatbtn.classList.remove("on");
		loopOn = false;
	} else {
		repeatbtn.classList.add("on");
		loopOn = true;
	}
});

// Created with help of AI all of the below
let isDragging = false;

tracker.addEventListener("mousedown", (e) => {
	isDragging = true;
	document.addEventListener("mousemove", handleMouseMove);
	document.addEventListener("mouseup", handleMouseUp);
});

function handleMouseMove(e) {
	if (isDragging) {
		const offsetX = e.clientX - time.getBoundingClientRect().left;
		const percentage = (offsetX / time.clientWidth) * 100;

		const clampedPercentage = Math.max(0, Math.min(100, percentage));

		playerPlayedTime.style.width = `${clampedPercentage}%`;
	}
}

function handleMouseUp() {
	if (isDragging) {
		let currentElement = document.querySelector(".active");
		let audio = currentElement.querySelector("audio");
		const duration = audio.duration;
		const percentage = parseFloat(playerPlayedTime.style.width);

		// Calculate the time based on the percentage
		const timeInSeconds = (percentage / 100) * duration;
		// Set the audio currentTime to the calculated time
		audio.currentTime = timeInSeconds;
	}

	isDragging = false;
	document.removeEventListener("mousemove", handleMouseMove);
	document.removeEventListener("mouseup", handleMouseUp);
}

function handleTimeClick(e) {
	let currentElement = document.querySelector(".active");
	let audio = currentElement.querySelector("audio");
	const offsetX = e.clientX - time.getBoundingClientRect().left;
	const percentage = (offsetX / time.clientWidth) * 100;

	// Ensure the percentage is within the bounds of 0% to 100%
	const clampedPercentage = Math.max(0, Math.min(100, percentage));

	playerPlayedTime.style.width = `${clampedPercentage}%`;

	// Calculate the time based on the percentage
	const timeInSeconds = (clampedPercentage / 100) * audio.duration;

	// Set the audio currentTime to the calculated time
	audio.currentTime = timeInSeconds;
}

time.addEventListener("click", handleTimeClick);
