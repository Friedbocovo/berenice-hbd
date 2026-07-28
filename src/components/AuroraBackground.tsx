/** Full-screen animated gradient backdrop with soft floating blobs. */
export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-lavande-50" />
      <div className="absolute -left-32 -top-32 h-[40rem] w-[40rem] rounded-full bg-rose-200/40 blur-[120px] animate-float-slow" />
      <div className="absolute right-[-10rem] top-1/4 h-[36rem] w-[36rem] rounded-full bg-lavande-200/40 blur-[120px] animate-float-slower" />
      <div className="absolute bottom-[-12rem] left-1/3 h-[34rem] w-[34rem] rounded-full bg-ciel-200/40 blur-[120px] animate-float-slow" />
      <div className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-or-200/30 blur-[120px] animate-breathe" />
    </div>
  )
}
