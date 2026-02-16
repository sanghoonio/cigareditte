import { useCigarette } from '../stores/cigarette';

export function AtmosphericOverlay() {
  const { isSmoking, burnProgress } = useCigarette();

  if (!isSmoking) return null;

  const progress = burnProgress / 100;

  return (
    <>
      <div
        className='atmospheric-tint'
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 99998,
          backgroundColor: `rgba(180, 140, 80, ${progress * 0.06})`,
          transition: 'all 2s ease',
        }}
      />
      <div
        className='atmospheric-vignette'
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 99998,
          backgroundColor: 'transparent',
          boxShadow: `inset 0 0 ${progress * 200}px rgba(160, 140, 110, ${progress * 0.12})`,
          transition: 'all 2s ease',
        }}
      />
    </>
  );
}
