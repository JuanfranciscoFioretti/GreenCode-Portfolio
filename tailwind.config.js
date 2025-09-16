/** @type {import('tailwindcss').Config} */
import 'tailwindcss-animate';
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
//   theme: {
//     extend: {
//       animation: {
//         'shiny-text': 'shiny-text 8s ease-in-out infinite',
//       },
//       keyframes: {
//         'shiny-text': {
//           '0%, 90%, 100%': {
//             'background-position': 'calc(-100% - var(--shiny-width)) 0',
//           },
//           '30%, 60%': {
//             'background-position': 'calc(100% + var(--shiny-width)) 0',
//           },
//         },
//       },
//     },
//   },
  theme: {
	extend: {
      animation: {
        'shiny-text': 'shiny-text 8s ease-in-out infinite',
      },
      keyframes: {
        'shiny-text': {
          '0%, 90%, 100%': {
            'background-position': 'calc(-100% - var(--shiny-width)) 0',
          },
          '30%, 60%': {
            'background-position': 'calc(100% + var(--shiny-width)) 0',
          },
        },
      },
    },
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			highlight: '#00E0FF',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
  			'radial-gradient': 'radial-gradient(circle at top left, #0F1117 0%, #0A0B0F 100%)',
  			'button-gradient': 'linear-gradient(90deg, #33BBCF 0%, #00E0FF 100%)',
  			'button-hover-gradient': 'linear-gradient(90deg, #00E0FF 0%, #33BBCF 100%)',
  			'text-gradient': 'linear-gradient(90deg, #33BBCF 0%, #00E0FF 100%)'
  		},
  		fontFamily: {
  			poppins: [
  				'Poppins',
  				'sans-serif'
  			]
  		},
  		borderRadius: {
  			default: '12px',
  			button: '8px',
  			'button-secondary': '50px',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			card: '0px 4px 20px rgba(0,0,0,0.25)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
  darkMode: ['class', 'class'],
};