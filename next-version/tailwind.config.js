/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#F9C300',
        background: '#0B0B0B',
        foreground: '#FFFFFF',
      },
    },
  },
  plugins: [],
};
