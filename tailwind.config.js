import defaultTheme from "tailwindcss/defaultTheme";

export default {
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", ...defaultTheme.fontFamily.sans],
      },
    },
        keyframes: {
          cardIn: {
            from: { opacity: '0', transform: 'translateY(16px)' },
            to:   { opacity: '1', transform: 'translateY(0)' },
          },
          shake: {
            '0%, 100%': { transform: 'translateX(0)' },
            '25%':       { transform: 'translateX(-4px)' },
            '75%':       { transform: 'translateX(4px)' },
          },
        },
        animation: {
          cardIn: 'cardIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
          shake:  'shake 0.3s ease-in-out',
        },
  },
};