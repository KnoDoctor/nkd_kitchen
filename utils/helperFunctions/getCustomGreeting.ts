export default function getCustomGreeting(name: string | null | undefined): string {
	const currentTime: Date = new Date();
	const currentHour: number = currentTime.getHours();

	if (currentHour >= 5 && currentHour < 12) {
		return `🌞 Welcome back${
			name ? " " + name : ""
		}, what would you like to work on this morning?`;
	} else if (currentHour >= 12 && currentHour < 17) {
		return `☀️ Welcome back${
			name ? " " + name : ""
		}, what would you like to work on this afternoon?`;
	} else if (currentHour >= 17 || currentHour < 2) {
		return `🌙 Welcome back${
			name ? " " + name : ""
		}, what would you like to work on this evening?`;
	} else {
		return `🌜 It's getting late${name ? " " + name : ""}, time to go to bed...`;
	}
}
