import type { Config } from 'tailwindcss';

/**
 * OnTurningPoint design tokens (BRIEF.md §2).
 * WHITE-FORWARD: white/almost-white is the page background. Espresso brown is the
 * single primary. Muted blue + lavender are quiet section tints only.
 *
 * To rebrand: change the CSS variables in src/app/globals.css — every token below
 * reads from them, so colors flow through the whole site from one place.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    container: { center: true },
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        primary: {
          DEFAULT: 'var(--primary)',
          soft: 'var(--primary-soft)',
        },
        ink: {
          DEFAULT: 'var(--text)',
          muted: 'var(--text-muted)',
          subtle: 'var(--text-subtle)',
        },
        section: {
          blue: 'var(--section-blue)',
          lavender: 'var(--section-lavender)',
          sand: 'var(--section-sand)',
        },
        line: 'var(--border)',
      },
      fontFamily: {
        sans: ['var(--font-grotesk)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'ui-serif', 'Georgia', 'serif'],
      },
      fontSize: {
        /**
         * Sentence-case display scale, tracked at a flat -0.5px everywhere.
         * Fixed px rather than em keeps the value exact at every step instead
         * of scaling with size. Uppercase labels are the one exception and keep
         * positive tracking — see globals.css.
         */
        display: ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.5px' }],
        'display-sm': ['clamp(1.75rem, 3.2vw, 2.625rem)', { lineHeight: '1.13', letterSpacing: '-0.5px' }],
        'display-xs': ['clamp(1.3125rem, 1.9vw, 1.625rem)', { lineHeight: '1.28', letterSpacing: '-0.5px' }],
        body: ['1.0625rem', { lineHeight: '1.6', letterSpacing: '-0.5px' }],
        nav: ['0.875rem', { lineHeight: '1.4', letterSpacing: '-0.5px' }],
        eyebrow: ['0.6875rem', { lineHeight: '1.2', letterSpacing: '0.1em' }],
      },
      spacing: {
        // BRIEF §2.3 spacing scale
        '2': '0.5rem', '4': '1rem', '6': '1.5rem', '8': '2rem',
        '12': '3rem', '16': '4rem', '24': '6rem', '30': '7.5rem',
        gutter: 'var(--gutter)',
      },
      maxWidth: {
        container: '1400px',
        prose: '68ch',
      },
      borderRadius: {
        /**
         * Minimal radii. Down from 32px originally: at this size the corner
         * stops being a visual feature and the eye reads the grid instead of
         * the rounding. Buttons stay fully pill for contrast.
         */
        card: '0.25rem', // 4px — cards, panels
        media: '0.375rem', // 6px — photographic surfaces
        md2: '0.25rem',
        lg2: '0.375rem',
        pill: '999px',
      },
      boxShadow: {
        /* Layered, low-opacity shadows — a tight contact shadow plus a wide
           ambient one. Reads as depth rather than as a drop shadow. */
        card: '0 1px 2px rgba(36,21,20,.04), 0 8px 24px rgba(36,21,20,.05)',
        subtle: '0 1px 2px rgba(36,21,20,.04), 0 4px 12px rgba(36,21,20,.04)',
        lift: '0 2px 4px rgba(36,21,20,.05), 0 16px 40px rgba(36,21,20,.09)',
        glass: '0 8px 32px rgba(36,21,20,.10)',
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
