module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['Inter', 'sans-serif'],
			serif: ['Playfair Display', 'serif']
		}
	},
	plugins: [require('@tailwindcss/typography')] // Add typography support for better blog post styling
};
