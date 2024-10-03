/** @type {import('tailwindcss').Config} */
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins'],
        playfairDisplaySC: ['Playfair Display SC'],
      },
      colors: {
        'custom-name': '#BA5E5E',
        'custom-title': '#F2F2F2',
        'custom-black': '#504848',
        'custom-bg': '#FFABAD',
        'custom-teste': '#F0F0F0',
      },
      transformOrigin: {
        0: '0%',
      },
      zIndex: {
        '-1': '-1',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  variants: {
    borderColor: ['responsive', 'hover', 'focus', 'focus-within'],
  },
  plugins: [tailwindcss, autoprefixer],
};
