/// <reference types="vite/client" />

// Imágenes (mayúsculas y minúsculas)
declare module '*.jpg'  { const src: string; export default src }
declare module '*.JPG'  { const src: string; export default src }
declare module '*.jpeg' { const src: string; export default src }
declare module '*.JPEG' { const src: string; export default src }
declare module '*.png'  { const src: string; export default src }
declare module '*.webp' { const src: string; export default src }

// Vídeos (incluye mayúsculas)
declare module '*.mp4'  { const src: string; export default src }
declare module '*.MP4'  { const src: string; export default src }
declare module '*.mov'  { const src: string; export default src }
declare module '*.ogg'  { const src: string; export default src }
declare module '*.webm' { const src: string; export default src }
