import { useCigarette } from '../stores/cigarette';

type SmokeConfig = {
  type: 'animated-image' | 'sprite-sheet' | 'frame-sequence';
  src: string;
  width: number;
  height: number;
  // sprite-sheet options
  frameCount?: number;
  fps?: number;
  frameWidth?: number;
  frameHeight?: number;
};

const SMOKE_CONFIG: SmokeConfig = {
  type: 'animated-image',
  src: 'smoke.webp',
  width: 128,
  height: 256,
};

export function SmokeLayer() {
  const { isSmoking } = useCigarette();

  if (!isSmoking) return null;

  if (SMOKE_CONFIG.type === 'animated-image') {
    return (
      <div className='smoke-layer'>
        <img
          src={SMOKE_CONFIG.src}
          width={SMOKE_CONFIG.width}
          height={SMOKE_CONFIG.height}
          alt=''
          style={{ pointerEvents: 'none' }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      </div>
    );
  }

  if (SMOKE_CONFIG.type === 'sprite-sheet') {
    const { frameCount = 1, fps = 12, frameWidth = SMOKE_CONFIG.width, frameHeight = SMOKE_CONFIG.height } = SMOKE_CONFIG;
    const totalWidth = frameWidth * frameCount;
    const duration = frameCount / fps;

    return (
      <div className='smoke-layer'>
        <div
          style={{
            width: frameWidth,
            height: frameHeight,
            backgroundImage: `url(${SMOKE_CONFIG.src})`,
            backgroundSize: `${totalWidth}px ${frameHeight}px`,
            animation: `smoke-sprite ${duration}s steps(${frameCount}) infinite`,
            pointerEvents: 'none',
          }}
        />
      </div>
    );
  }

  return null;
}
