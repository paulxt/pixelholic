import { PixelChar } from './PixelCharacters'
import { clientThemes } from './ClientDetail'

/* Mega Man stage-intro READY screen: dark CRT scanlines, the client's
   pixel mascot, and a blinking READY. */
export default function StageReady({ client }) {
  if (!client) return null
  return (
    <div
      className="fixed inset-0 z-[100] scanlines flex flex-col items-center justify-center gap-10"
      style={{ backgroundColor: '#0B1020' }}
    >
      <PixelChar type={clientThemes[client.id].charType} color={client.color} size={9} />
      <span className="pixel-font text-white tracking-[0.3em] animate-blink-fast" style={{ fontSize: 22 }}>
        READY
      </span>
    </div>
  )
}
