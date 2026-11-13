import { EXPLORE_CONTROL_EVENT } from './ExploreController'

type ExploreHudProps = {
  onExit: () => void
}

function sendControl(code: string, pressed: boolean) {
  window.dispatchEvent(new CustomEvent(EXPLORE_CONTROL_EVENT, { detail: { code, pressed } }))
}

function ControlButton({ code, children }: { code: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={code}
      className="flex h-11 w-11 touch-none items-center justify-center rounded-full border border-white/40 bg-black/45 text-sm font-black text-white backdrop-blur"
      onPointerDown={(event) => { event.preventDefault(); sendControl(code, true) }}
      onPointerUp={() => sendControl(code, false)}
      onPointerCancel={() => sendControl(code, false)}
      onPointerLeave={() => sendControl(code, false)}
    >
      {children}
    </button>
  )
}

export function ExploreHud({ onExit }: ExploreHudProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[60] text-white">
      <div className="pointer-events-auto absolute left-4 top-4 max-w-[20rem] rounded-2xl border border-white/25 bg-black/45 px-4 py-3 text-xs leading-relaxed backdrop-blur-md sm:left-6 sm:top-6">
        <p className="font-black uppercase tracking-[0.18em] text-[#f4d36b]">Explore mode</p>
        <p className="mt-1 hidden text-white/85 sm:block">Click the farm to look around. WASD moves, Shift sprints, and Esc exits.</p>
        <p className="mt-1 sm:hidden text-white/85">Use the controls to walk and turn. Tap Exit to return.</p>
      </div>
      <button type="button" onClick={onExit} className="pointer-events-auto absolute right-4 top-4 rounded-full border border-white/40 bg-black/45 px-4 py-2 text-sm font-bold backdrop-blur-md sm:right-6 sm:top-6">
        Exit <span className="hidden sm:inline">(Esc)</span>
      </button>
      <div className="pointer-events-auto absolute bottom-5 left-5 grid grid-cols-3 gap-2 sm:hidden">
        <span />
        <ControlButton code="KeyW">▲</ControlButton>
        <span />
        <ControlButton code="KeyA">◀</ControlButton>
        <ControlButton code="KeyS">▼</ControlButton>
        <ControlButton code="KeyD">▶</ControlButton>
      </div>
      <div className="pointer-events-auto absolute bottom-5 right-5 flex gap-2 sm:hidden">
        <ControlButton code="ArrowLeft">↶</ControlButton>
        <ControlButton code="ArrowRight">↷</ControlButton>
      </div>
    </div>
  )
}
