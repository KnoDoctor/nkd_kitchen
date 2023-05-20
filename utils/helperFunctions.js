export function convertToSlug(Text) {
	try {
		return Text.toLowerCase()
			.replace(/ /g, "-")
			.replace(/[^\w-]+/g, "");
	} catch (e) {
		console.log(e);
	}
}

export function returnCurrentModule(router) {
	let path = router.asPath;

	let currentModule = path.split("/")[2];
	return currentModule;
}

export function referenceStagingMedia(mediaUrl) {
	let isMediaUrl = mediaUrl ? mediaUrl.indexOf("https://media.butterfield.com") > -1 : "";
	let returnUrl = mediaUrl;

	if (isMediaUrl) {
		let fileName = mediaUrl.match(/([^\/]*)\/*$/)[1];
		returnUrl = "https://staging.media.butterfield.com/" + fileName;
	}

	return returnUrl;
}

export function parseWpCharacters(s) {
	let string = s;
	string = string.replace(/&#038;/g, "&");
	string = string.replace(/&#8217;/g, "'");
	string = string.replace(/&amp;/g, "&");
	return string;
}

// Convert a slug to a page lookup string
export function createLookupString(str) {
	if (str) {
		try {
			return str.toLowerCase().replace(/\//g, "___");
		} catch (e) {
			console.log(e);
		}
	} else {
		return "Page Lookup String creation failed.";
	}
}

// Convert a slug to a page lookup string
export function parseLookupString(str) {
	if (str) {
		try {
			return str.toLowerCase().replace(/___/g, "/").toLowerCase();
		} catch (e) {
			console.log(e);
		}
	} else {
		return "Page Lookup String parse failed.";
	}
}

export function getUnique(arr, comp) {
	if (arr) {
		const unique = arr
			.map((e) => e[comp])

			// store the keys of the unique objects
			.map((e, i, final) => final.indexOf(e) === i && i)

			// eliminate the dead keys & store unique objects
			.filter((e) => arr[e])
			.map((e) => arr[e]);

		return unique;
	}

	return [];
}

export function scrollToTarget(target, mobileWidth, extraOffset) {
	if (target) {
		const element = document.getElementById(target);
		if (element) {
			const headerOffset = mobileWidth ? 65 : 100;
			const bodyRect = document.body.getBoundingClientRect().top;
			const elementRect = element.getBoundingClientRect().top;
			const elementPosition = elementRect - bodyRect;
			const offsetPosition = elementPosition - headerOffset;

			window.scrollTo({
				top: extraOffset ? offsetPosition - extraOffset : offsetPosition,
				behavior: "smooth",
			});
		}
	}
}

//Convert number or string to Currency
export function toCurrency(value) {
	let number = parseFloat(value);

	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumSignificantDigits: Math.trunc(Math.abs(number)).toFixed().length,
	}).format(number);
}

//Filter and Find Functions
export function where(collection, constraint) {
	return collection.filter((collectionItem) =>
		Object.keys(constraint).every(
			(key) => collectionItem.hasOwnProperty(key) && constraint[key] === collectionItem[key]
		)
	);
}

export function search(keyValue, key, array) {
	if (array) {
		for (var i = 0; i < array.length; i++) {
			if (array[i][key] === keyValue) {
				return array[i];
			}
		}
	}
}
