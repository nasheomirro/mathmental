type Theme = 'light' | 'dark';

const storageKey = 'theme-manager';

export class ThemeManager {
	theme: Theme = $state(getSavedTheme());

	toggleTheme() {
		this.theme = this.theme === 'light' ? 'dark' : 'light';
		if (document) {
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
