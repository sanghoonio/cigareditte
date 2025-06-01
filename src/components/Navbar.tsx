import { useRef } from 'react'
import { Link, useLocation } from 'react-router-dom';

import { useIsSmoking, useBurnProgress } from '../stores/cigarette';

type NavLinkProps = {
  page: string; 
  title: string;
  position: string;
  currentPage: string;
}

const NavLink = (props: NavLinkProps) => {
  const { page, title, position, currentPage } = props;

  if (position === 'top') return (
    <Link className={`text-hover cursor-pointer ${currentPage === page ? 'text-dark' : 'text-black-50'}`} to={page}>
      <p className='mb-0 nav-hover cursor-pointer'>{title}</p>
    </Link>
  )

  return (
    <p className='mb-0'>
      <Link className={`text-hover cursor-pointer ${currentPage === page ? 'text-dark fw-medium' : 'text-black-50 fw-lighter'}`} to={page}>
        {title}
      </Link>
    </p>
  );
};

function createSmoke(startX: number, startY: number) {
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



function Navbar() {
  const location = useLocation().pathname.substring(1) || 'hot';

  const { isSmoking, setIsSmoking } = useIsSmoking();
  const { burnProgress, setBurnProgress } = useBurnProgress();
  
  const smokeInterval = useRef<number | null>(null)
  const burnInterval = useRef<number | null>(null)

  const getSmokePosition = (progress: number) => {
    // Cigarette starts at left: 50px, width: 100px
    // Smoke should come from the ember position
    const cigaretteStart = 50;
    const cigaretteWidth = 100;
    const smokeX = cigaretteStart + (cigaretteWidth * progress / 100);
    return { x: smokeX, y: 60 };
  };

  const startSmoking = () => {
    if (isSmoking) return;
    
    setIsSmoking(true);
    setBurnProgress(0);
    
    // Start smoking immediately
    const initialPos = getSmokePosition(0);
    createSmoke(initialPos.x, initialPos.y);
    
    // Continue smoke every 500ms - use getState() to get current value
    smokeInterval.current = setInterval(() => {
      const currentProgress = useBurnProgress.getState().burnProgress;
      const pos = getSmokePosition(currentProgress);
      createSmoke(pos.x, pos.y);
    }, 500);
    
    // Burn progress over 5 minutes (300 seconds)
    burnInterval.current = setInterval(() => {
      const burnTime = 300;
      const currentProgress = useBurnProgress.getState().burnProgress;
      const newProgress = currentProgress + (100 / burnTime);
      
      if (newProgress >= 100) {
        setBurnProgress(100);
        stopSmoking();
      } else {
        setBurnProgress(newProgress);
      }
    }, 1000);
  }

  const stopSmoking = () => {
    setIsSmoking(false);
    if (smokeInterval.current) {
      clearInterval(smokeInterval.current);
      smokeInterval.current = null;
    }
    if (burnInterval.current) {
      clearInterval(burnInterval.current);
      burnInterval.current = null;
    }
  }

  return (
    <>
      <div className='flex-0 sidebar'>
        <div className='row page-width sticky-top'>
          <div className='col-12 py-4'>
            <Link to='' className='text-decoration-none text-dark'>
              <h4 className='fw-lighter mb-3'>Cigareditte</h4>
            </Link>
            <div className='col-12 text-start'>
              <NavLink page={'hot'} title={'Hot'} position='side' currentPage={location}/>
              <NavLink page={'new'} title={'New'} position='side' currentPage={location}/>
              <NavLink page={'best'} title={'Best'} position='side' currentPage={location}/>
              {/* <NavLink page={'comments'} title={'Comments'} position='side' currentPage={location}/> */}
            </div>

            <div className="smoke-container" style={{
              position: 'relative',
              height: '100px',
              overflow: 'hidden',
              border: '1px solid #ccc',
              margin: '20px 0',
              backgroundColor: '#f9f9f9'
            }}>
              <div className="cigarette" style={{
                position: 'absolute',
                bottom: '30px',
                left: '50px',
                width: '100px',
                height: '15px',
                backgroundColor: 'white',
                // border: '1px solid #ddd',
                // borderRadius: '4px 0 0 4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${burnProgress}%`,
                  backgroundColor: '#f9f9f9',
                  transition: 'width 1s ease-out'
                }}></div>
                
                {isSmoking && burnProgress < 100 && (
                  <div style={{
                    position: 'absolute',
                    left: `${Math.max(0, burnProgress - 2)}%`,
                    top: '-1px',
                    width: '4px',
                    height: '17px',
                    backgroundColor: '#ff4444',
                    borderRadius: '2px',
                    boxShadow: '0 0 4px #ff4444'
                  }}></div>
                )}
              </div>
              <div style={{
                position: 'absolute',
                bottom: '30px',
                left: '150px',
                width: '30px',
                height: '15px',
                backgroundColor: '#f4e4bc',
                borderLeft: '2px solid #ddd',
                // borderRadius: '0 4px 4px 0'
              }}></div>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <button onClick={startSmoking} disabled={isSmoking}>
                Light Cigarette
              </button>
              <button onClick={stopSmoking} disabled={!isSmoking} style={{ marginLeft: '10px' }}>
                Put Out
              </button>
              <p>Status: {isSmoking ? `Smoking 🔥 (${Math.round(burnProgress)}% burnt)` : burnProgress === 100 ? 'Finished' : 'Not lit'}</p>
            </div>

          </div>
        </div>
      </div>

      <div className='flex-0 topbar sticky-top'>
        <div className='row page-width'>
          <div className='col-12 p-4'>
            <Link to='' className='text-decoration-none text-dark'>
              <h5 className='d-inline fw-medium mb-3'>Cigareditte</h5>
            </Link>
            <span className='d-inline float-end cursor-pointer dropdown-hover' data-bs-toggle='dropdown' aria-expanded='false'>
              <h5 className='bi bi-three-dots mb-0'></h5>
            </span>
            <div className='dropdown-menu px-3 shadow border-0'>
              <NavLink page={'hot'} title={'Hot'} position='side' currentPage={location}/>
              <NavLink page={'new'} title={'New'} position='side' currentPage={location}/>
              <NavLink page={'best'} title={'Best'} position='side' currentPage={location}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
