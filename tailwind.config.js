/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './public/index.html',
        './node_modules/ag-grid-community/**/*.{html,js,ts,jsx,tsx}', // Include AG Grid if you're using its internal components
    ],
    theme: {
        extend: {},
    },
    variants: {
        fill: ['hover', 'focus'],
    },
    plugins: [],
}
