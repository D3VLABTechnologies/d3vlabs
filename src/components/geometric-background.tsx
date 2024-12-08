export function GeometricBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-primary/5 rotate-12 transform-gpu" />
      <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-primary/5 -rotate-12 transform-gpu" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,27,58,0.8)_100%)]" />
    </div>
  )
}

