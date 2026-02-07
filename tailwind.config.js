/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      colors: {
        background: {
          primary: '#0f172a',
          secondary: '#1e293b',
          tertiary: '#334155',
        },
        surface: {
          primary: '#1e293b',
          secondary: '#334155',
          elevated: '#475569',
        },
        accent: {
          primary: '#3b82f6',
          secondary: '#60a5fa',
          highlight: '#93c5fd',
        },
        text: {
          primary: '#f1f5f9',
          secondary: '#cbd5e1',
          muted: '#94a3b8',
        },
      },
    },
  },
  plugins: [],
}

