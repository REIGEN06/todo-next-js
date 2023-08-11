'use client';
import { createTheme, responsiveFontSizes } from '@mui/material';

declare module '@mui/material/styles' {
	interface Palette {
		BGcolors: Palette['primary'];
		border: Palette['primary'];
	}

	interface PaletteOptions {
		BGcolors?: PaletteOptions['primary'];
		border?: PaletteOptions['primary'];
	}

	interface Theme {
		BGcolors: {
			default: string;
			paper: string;
		};
	}

	interface ThemeOptions {
		BGcolors?: {
			default?: string;
			paper?: string;
		};
	}
}

let theme = createTheme({
	palette: {
		primary: {
			main: '#79818c',
			dark: 'black',
		},
		secondary: {
			main: '#2775fc',
			dark: '#6d18f5',
		},
		border: {
			main: '#dce1e6',
		},
		BGcolors: {
			main: '#ffffff',
			dark: 'edeef0',
		},
	},
	typography: {
		fontFamily: ['sans-serif', 'Verdana', 'Roboto'].join(','),
	},
});

theme = responsiveFontSizes(theme);

export default theme;
