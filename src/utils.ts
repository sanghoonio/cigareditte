export const getRelativeTime = (timestamp: number) => {
  const now = Date.now() / 1000;
  const diff = timestamp - now;
  const absDiff = Math.abs(diff);

  if (absDiff < 60) return 'just now';
  if (absDiff < 3600) return `${Math.floor(absDiff / 60)}m ago`;
  if (absDiff < 86400) return `${Math.floor(absDiff / 3600)}h ago`;
  return `${Math.floor(absDiff / 86400)}d ago`;
};


export function createSmoke(startX: number, startY: number) {
  const smokeChars = ['°', '˚', '∘', '○', '◦', '•', '∙', '⋅', '∴', '∵'];
  const container = document.querySelector('.smoke-container');
  
  if (!container) return;
  
  // Create 3-5 particles
  for (let i = 0; i < Math.random() * 3 + 2; i++) {
    const particle = document.createElement('div');
    particle.className = 'smoke-particle';
    particle.textContent = smokeChars[Math.floor(Math.random() * smokeChars.length)];
    
    // Random horizontal drift
    const drift = (Math.random() - 0.5) * 40 + 'px';
    particle.style.setProperty('--drift', drift);
    
    // Starting position
    particle.style.left = startX + (Math.random() - 0.5) * 10 + 'px';
    particle.style.top = startY + 'px';
    
    // Slight delay between particles
    particle.style.animationDelay = i * 0.2 + 's';
    
    container.appendChild(particle);
    
    // Remove after animation
    setTimeout(() => particle.remove(), 3000);
  }
}
