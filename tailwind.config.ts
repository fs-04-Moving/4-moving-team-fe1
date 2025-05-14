// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
      },
      boxShadow: {
        'soft-gray': '2px 2px 10px 0px #DCDCDC24',
        'soft-gray-reverse': '-2px -2px 10px 0px #DCDCDC24',
      },
    },
  },
  plugins: [],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Storybook용 경로 추가
    './stories/**/*.{js,ts,jsx,tsx,mdx}',
    './**/*.stories.@(js|ts|jsx|tsx|mdx)',
  ],
};
