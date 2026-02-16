export const getRelativeTime = (timestamp: number) => {
  const now = Date.now() / 1000;
  const diff = timestamp - now;
  const absDiff = Math.abs(diff);

  if (absDiff < 60) return 'just now';
  if (absDiff < 3600) return `${Math.floor(absDiff / 60)}m ago`;
  if (absDiff < 86400) return `${Math.floor(absDiff / 3600)}h ago`;
  return `${Math.floor(absDiff / 86400)}d ago`;
};

export const extractDomain = (url?: string): string | null => {
  if (!url) return null;
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
};

export const getCigaretteSprite = (burnProgress: number): string => {
  const frame = Math.min(Math.floor(burnProgress / 10) + 1, 10);
  return `cigarette_${frame}.png`;
};
