let playing = false;

export default function playConfetti() {
	if (playing) return;

	playing = true;

	const duration = 15 * 1000,
		animationEnd = Date.now() + duration;

	function conffetiExplosion(x: number, y: number) {
		confetti({
			origin: {
				x: x,
				y: y,
			},
			spread: 360,
			ticks: 100,
			gravity: 0,
			decay: 0.94,
			startVelocity: 30,
			particleCount: 100,
			scalar: 2,
			shapes: ["emoji"],
			colors: ["#FFBF00"],
			shapeOptions: {
				emoji: {
					value: ["🍀", "🪙", "💸"],
				},
			},
		});
	}

	//left
	conffetiExplosion(0.2, 0.3);

	//center
	setTimeout(() => conffetiExplosion(0.5, 0.2), 90);

	//right
	setTimeout(() => conffetiExplosion(0.8, 0.3), 180);

	(function frame() {
		const timeLeft = animationEnd - Date.now(),
			ticks = Math.max(200, 500 * (timeLeft / duration));

		confetti({
			particleCount: 3,
			startVelocity: 0,
			ticks: ticks,
			scalar: 1.3,
			origin: {
				x: Math.random(),
				y: Math.random() * 1 - 0.2,
			},
			colors: ["#ffffff"],
			shapes: ["emoji"],
			shapeOptions: {
				emoji: {
					value: ["🍀", "💸"],
				},
			},
		});

		if (timeLeft > 0) {
			requestAnimationFrame(frame);
		} else {
			playing = false;
		}
	})();
}
