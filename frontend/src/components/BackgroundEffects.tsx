'use client';

interface BackgroundEffectsProps {
  scrollY: number;
}

export default function BackgroundEffects({ scrollY }: BackgroundEffectsProps) {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute -top-96 -right-96 w-[800px] h-[800px] bg-gradient-to-br from-amber-500/20 via-orange-600/15 to-transparent rounded-full blur-3xl transform"
        style={{
          transform: `translate(${scrollY * 0.2}px, ${scrollY * 0.1}px)`,
        }}
      ></div>
      <div
        className="absolute -bottom-96 -left-96 w-[900px] h-[900px] bg-gradient-to-tr from-orange-500/15 via-amber-600/20 to-transparent rounded-full blur-3xl transform"
        style={{
          transform: `translate(${-scrollY * 0.15}px, ${-scrollY * 0.1}px)`,
        }}
      ></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-400/10 via-orange-500/15 to-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
    </div>
  );
}
