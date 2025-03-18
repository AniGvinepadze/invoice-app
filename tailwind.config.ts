import type { Config } from 'tailwindcss';

export default {
    darkMode: ['class'],
    content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
  	extend: {
  		fontFamily: {
  			publicSans: [
  				'Public Sans',
  				'sans-serif'
  			]
  		},
  		screens: {
  			'max-1400': {
  				max: '1400px'
  			},
  			'max-1350': {
  				max: '1350px'
  			},
  			'max-1300': {
  				max: '1300px'
  			},
  			'max-1250': {
  				max: '1250px'
  			},
  			'max-1200': {
  				max: '1200px'
  			},
  			'max-1150': {
  				max: '1150px'
  			},
  			'max-1100': {
  				max: '1100px'
  			},
  			'max-1050': {
  				max: '1050px'
  			},
  			'max-1000': {
  				max: '1000px'
  			},
  			'max-950': {
  				max: '950px'
  			},
  			'max-900': {
  				max: '900px'
  			},
  			'max-850': {
  				max: '850px'
  			},
  			'max-800': {
  				max: '800px'
  			},
  			'max-750': {
  				max: '750px'
  			},
  			'max-700': {
  				max: '700px'
  			},
  			'max-650': {
  				max: '650px'
  			},
  			'max-600': {
  				max: '600px'
  			},
  			'max-550': {
  				max: '550px'
  			},
  			'max-500': {
  				max: '500px'
  			},
  			'max-450': {
  				max: '450px'
  			},
  			'max-400': {
  				max: '400px'
  			},
			'max-350': {
  				max: '350px'
  			},
			'max-300': {
  				max: '300px'
  			}
  		},
  		backgroundColor: {
  			'new-budget': 'rgba(0, 0, 0, 0.5)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
