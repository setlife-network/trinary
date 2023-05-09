/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './srcv2/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                'setlife': '#00C2D4',
                'light': '#E2E2E2',
                'grey': '#9BAAB9',
                'black': '#000000',
                'white-light': '#F4F4F4',
                'med-grey': '#E5E5E5'
            }
        },
    },
    plugins: [],
}