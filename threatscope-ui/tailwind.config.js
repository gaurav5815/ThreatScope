/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        soc: {
          900: '#0a0a0f',
          800: '#12121c',
          700: '#1a1a2e',
        },
        neon: {
          blue: '#00f0ff',
          red: '#ff003c',
          green: '#00ff66',
          purple: '#b026ff',
          yellow: '#fbff00'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
