import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		screens: {
			"1xs": "375px",
			// => @media (min-width: 375px) { ... }
	  
			xs: "450px",
			// => @media (min-width: 450px) { ... }
	  
			sm: "575px",
			// => @media (min-width: 576px) { ... }
	  
			md: "768px",
			// => @media (min-width: 768px) { ... }
	  
			lg: "992px",
			// => @media (min-width: 992px) { ... }
	  
			xl: "1200px",
			// => @media (min-width: 1200px) { ... }
	  
			"2xl": "1400px",
			// => @media (min-width: 1400px) { ... }
		},
		extend: {
			colors: {
				primary: {
				  50: '#f0f9ff',
				  100: '#e0f2fe',
				  200: '#bae6fd',
				  300: '#7dd3fc',
				  400: '#38bdf8',
				  500: '#0ea5e9',
				  600: '#0284c7',
				  700: '#0369a1',
				  800: '#075985',
				  900: '#0c4a6e',
				},
				secondary: {
				  50: '#f8fafc',
				  100: '#f1f5f9',
				  200: '#e2e8f0',
				  300: '#cbd5e1',
				  400: '#94a3b8',
				  500: '#64748b',
				  600: '#475569',
				  700: '#334155',
				  800: '#1e293b',
				  900: '#0f172a',
				},
				accent: {
				  50: '#fdf4ff',
				  100: '#fae8ff',
				  200: '#f5d0fe',
				  300: '#f0abfc',
				  400: '#e879f9',
				  500: '#d946ef',
				  600: '#c026d3',
				  700: '#a21caf',
				  800: '#86198f',
				  900: '#701a75',
				}
			}
		}
	},

	plugins: [typography, forms, containerQueries]
} satisfies Config;
