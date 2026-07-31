/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: '#0a0508', /* Deep pinkish black */
        surface: 'rgba(255, 255, 255, 0.03)',
        border: 'rgba(236, 72, 153, 0.15)', /* Subtle pink border */
        accent: '#ec4899', /* Pink-500 */
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(145deg, rgba(236,72,153,0.05) 0%, rgba(0,0,0,0.6) 100%)',
        'pink-glow': 'radial-gradient(circle at center, rgba(236,72,153,0.15) 0%, rgba(10,5,8,0) 70%)',
      },
      boxShadow: {
        '3d': '0 10px 30px -10px rgba(236, 72, 153, 0.2), 0 4px 6px -2px rgba(236, 72, 153, 0.1)',
        '3d-hover': '0 20px 40px -10px rgba(236, 72, 153, 0.4), 0 8px 12px -4px rgba(236, 72, 153, 0.2)',
      }
    },
  },
  plugins: [],
}
