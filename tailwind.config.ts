import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      fontFamily:{
         dos: ['Dos', 'sans-serif'],
         uno: ['Uno', 'sans-serif'],
         tres: ['Tres', 'sans-serif'],
         sinco: ['Sinco', 'sans-serif']
      },
      animation:{
        'glide-in':'glideIn 2s ease-out forwards',
        'glide-out':'glideOut 2s ease-out forwards',
        'large':'Large 0.5s ease-out 0.5s forwards'

      },
      keyframes:{
        glideIn:{
          '0%':{transform: 'translateX(100%)', opacity:'0'},
          '100%':{transform: 'translateX(0)', opacity:'1'},

        },
        glideOut:{
          '0%':{transform: 'translateX(-100%)', opacity:'0'},
          '100%':{transform: 'translateX(0)', opacity:'1'},

        },
        Large:{
          '0%':{transform: 'translateY(-15%)', opacity:'0'},
            '100%':{transform: 'translateY(0)', opacity: '1'}

        }
      }
    },
  },
  plugins: [],
} 

