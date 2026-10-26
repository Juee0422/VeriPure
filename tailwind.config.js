/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FBFBFB',
        cream: '#F4F6F4',
        surface: {
          light: 'rgba(255, 255, 255, 0.85)',
          glass: 'rgba(255, 255, 255, 0.72)',
          card: '#FFFFFF',
          hover: '#F8FAF9',
        },
        sage: {
          50: '#F1F8F1',
          100: '#E8F5E9',
          200: '#C8E6C9',
          300: '#A5D6A7',
          400: '#81C784',
          500: '#4CAF50',
          600: '#388E3C',
          700: '#2E7D32', // Authentic Primary
          800: '#1B5E20',
          900: '#0F3813',
        },
        amberRisk: {
          50: '#FFF8E1',
          100: '#FFF3E0', // Suspicious Light
          200: '#FFE0B2',
          300: '#FFCC80',
          400: '#FFA726',
          500: '#FF9800',
          600: '#FB8C00',
          700: '#EF6C00', // Suspicious Primary
          800: '#E65100',
        },
        crimsonRisk: {
          50: '#FFEBEE', // Fake Light
          100: '#FFCDD2',
          200: '#EF9A9A',
          300: '#E57373',
          400: '#EF5350',
          500: '#F44336',
          600: '#E53935',
          700: '#C62828', // Fake Primary
          800: '#B71C1C',
        },
        navy: {
          50: '#F0F3FA',
          100: '#DCE4F5',
          200: '#B6C7EC',
          300: '#8AA5E1',
          400: '#5F82D5',
          500: '#3D61C4',
          600: '#2C49A8',
          700: '#1A237E', // Deep Navy Contrast
          800: '#121A5E',
          900: '#0A192F', // Deepest Navy
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Cabinet Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 30px rgba(0, 0, 0, 0.04)',
        'glass-hover': '0 14px 40px rgba(0, 0, 0, 0.08)',
        'glass-sm': '0 4px 16px rgba(0, 0, 0, 0.03)',
        'glow-sage': '0 0 25px -4px rgba(46, 125, 50, 0.3)',
        'glow-amber': '0 0 25px -4px rgba(239, 108, 0, 0.3)',
        'glow-crimson': '0 0 25px -4px rgba(198, 40, 40, 0.3)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan-line': 'scan 2.5s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        scan: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
}
