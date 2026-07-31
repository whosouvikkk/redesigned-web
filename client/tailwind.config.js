/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: '#0a0508',
        surface: 'rgba(255, 255, 255, 0.03)',
        border: 'rgba(236, 72, 153, 0.15)',
        accent: '#ec4899',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(145deg, rgba(236,72,153,0.08) 0%, rgba(0,0,0,0.8) 100%)',
        'pink-glow': 'radial-gradient(circle at center, rgba(236,72,153,0.2) 0%, rgba(10,5,8,0) 70%)',
      },
      boxShadow: {
        '3d': '0 20px 40px -10px rgba(0,0,0,0.8), 0 10px 20px -5px rgba(236, 72, 153, 0.15)',
        '3d-hover': '0 30px 60px -15px rgba(0,0,0,0.9), 0 15px 30px -10px rgba(236, 72, 153, 0.4)',
        /* The 3D Glass Edge Reflection */
        'glass-edge': 'inset 0 1px 1px rgba(255, 255, 255, 0.15), inset 0 -1px 1px rgba(236, 72, 153, 0.15)',
      }
    },
  },
  plugins: [],
}
