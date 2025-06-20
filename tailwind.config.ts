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
      animation:{
        'glide-in':'glideIn 2s ease-out forwards',
        'glide-out':'glideOut 2s ease-out forwards'

      },
      keyframes:{
        glideIn:{
          '0%':{transform: 'translateX(100%)', opacity:'0'},
          '100%':{transform: 'translateX(0)', opacity:'1'},

        },
        glideOut:{
          '0%':{transform: 'translateX(-100%)', opacity:'0'},
          '100%':{transform: 'translateX(0)', opacity:'1'},

        }
      }
    },
  },
  plugins: [],
} 

