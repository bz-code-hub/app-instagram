# Instagram Live Interface

A modern web application that simulates an Instagram Live streaming experience with real-time comments, interactive features, and a mobile-optimized interface.

## Features

- **Real-time Comments**: Simulated live comments with user avatars and colorful badges
- **Interactive Actions**: Heart reactions, share, comment, and additional options
- **Floating Animations**: Animated floating hearts and emoji reactions
- **Glass Morphism Design**: Modern glassmorphic UI elements with backdrop blur effects
- **Mobile Optimized**: Fully responsive design with safe area support for notched devices
- **YouTube Integration**: Embedded YouTube player as video background
- **Instagram Branding**: Authentic Instagram Live styling and animations

## Quick Start

### Installation

```bash
npm install
npm run dev
```

The application will start at `http://localhost:5173`

## Configuration

Edit `src/config/livestream-config.ts` to customize:

- **Video Settings**: YouTube URL, video type (YouTube, Vimeo, or Direct)
- **Channel Information**: Channel name, profile image, verification badge
- **Live Stats**: Viewer counts, animation intervals
- **Chat Messages**: Pre-configured comments that appear during the live stream
- **Timing**: Comment intervals, visible message count, looping behavior

### Example Configuration

```typescript
export const chatConfig = {
  visibleComments: 3,
  commentInterval: 2,
  loopComments: true,
};

export const videoConfig = {
  url: "https://www.youtube.com/embed/VIDEO_ID",
  videoType: "youtube",
};
```

## Build for Production

```bash
npm run build
npm run preview
```

The optimized build will be in the `dist/` folder.

## Technology Stack

- **React 18**: Modern UI library with hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and dev server
- **Lucide Icons**: Beautiful icon library
- **Radix UI**: Accessible UI components

## File Structure

```
src/
├── components/
│   ├── VideoPlayer.tsx      # Header and video background
│   ├── LiveChat.tsx         # Comments and input bar
│   └── ui/                  # Reusable UI components
├── pages/
│   └── Index.tsx            # Main layout
├── config/
│   └── livestream-config.ts # Configuration file
└── index.css                # Global styles and animations
```

## Browser Support

Works on all modern browsers including:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT
