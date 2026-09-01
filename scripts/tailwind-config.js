// CONFIG: extends the Tailwind CDN engine's default theme before it scans
// the DOM (loaded in index.html right after the Tailwind <script>).
tailwind.config = {
  theme: {
    extend: {
      // PALETTE: custom color tokens used as bg-*/text-*/border-* utilities
      colors: { ink: '#0a0a0a', grid: '#1c1c1c', ash: '#8a8a8a', bone: '#e8e6e0' },
      // TYPOGRAPHY: font families exposed as font-display / font-body
      fontFamily: {
        display: ['"Barlow Condensed"', 'Oswald', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  }
};
