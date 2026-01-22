/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0f172a', // Slate 900
                surface: '#1e293b',    // Slate 800
                surfaceHover: '#334155', // Slate 700
                primary: '#f43f5e',    // Rose 500 (Hot Red)
                secondary: '#3b82f6',  // Blue 500
                textMain: '#f8fafc',   // Slate 50
                textMuted: '#94a3b8',  // Slate 400
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Orbitron', 'sans-serif'], // Sci-fi/Fast look
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-pattern': "url('https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=2070&auto=format&fit=crop')",
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
