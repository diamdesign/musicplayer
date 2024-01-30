const playbtn = document.querySelector(".player .play");
playbtn.addEventListener("click", () => {
	let span = playbtn.children[0];
	playbtn.classList.add("playactive");
	setTimeout(() => {
		playbtn.classList.remove("playactive");
	}, 700);
	if (span.textContent === "play_arrow") {
		span.textContent = "pause";
	} else {
		span.textContent = "play_arrow";
	}
});
