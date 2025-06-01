  export const getRelativeTime = (timestamp: number) => {
    const now = Date.now() / 1000;
    const diff = timestamp - now;
    const absDiff = Math.abs(diff);

    if (absDiff < 60) return 'just now';
    if (absDiff < 3600) return `${Math.floor(absDiff / 60)}m ago`;
    if (absDiff < 86400) return `${Math.floor(absDiff / 3600)}h ago`;
    return `${Math.floor(absDiff / 86400)}d ago`;
  };
