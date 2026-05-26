export function BackgroundBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Top Left Blob */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#08c7cf]/20 blur-3xl md:h-96 md:w-96" />

      {/* Bottom Right Blob */}
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#0566bb]/20 blur-3xl md:h-128 md:w-lg" />

      {/* Center Glow */}
      <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-[#ff3131]/10 blur-3xl md:h-96 md:w-96" />

      {/* Optional Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f910_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f910_1px,transparent_1px)] bg-[size:4rem_4rem]" />
    </div>
  );
}