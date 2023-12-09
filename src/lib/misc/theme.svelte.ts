type Theme = 'light' | 'dark';

const storageKey = 'theme-manager';

export class ThemeManager {
	theme: Theme = $state('light');

	constructor() {
		this.theme = getSavedTheme();
		this.setTheme(this.theme);
	}

	toggleTheme() {
		const newTheme = this.theme === 'light' ? 'dark' : 'light';
		this.setTheme(newTheme);
	}

	setTheme(theme: Theme) {
		this.theme = theme;
		if (document) {
			localStorage.setItem(storageKey, this.theme);
			document.querySelector('html')?.setAttribute('data-theme', this.theme);
		}
	}
}

function getSavedTheme(): Theme {
	let theme = localStorage.getItem(storageKey);
	if (theme && (theme === 'light' || theme === 'dark')) {
		return theme;
	} else {
		// TODO: check what user prefers instead
		setSavedTheme('light');
		return 'light';
	}
}

function setSavedTheme(theme: Theme) {
	localStorage.setItem(storageKey, theme);
}
