module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['Inter', 'sans-serif'],
			serif: ['Playfair Display', 'serif']
		},
		extends: {
			colors: {
				text: '#f2f2f2',
				background: '#121212',
				primary: '#7bc5e5',
				secondary: '#87d996',
				accent: '#8597e5'
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
