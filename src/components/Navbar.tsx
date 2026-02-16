import { useCigarette } from '../stores/cigarette';
import { getCigaretteSprite } from '../utils';
import { SmokeLayer } from './SmokeLayer';
import type { StoryType } from '../types';

type NavLinkProps = {
  page: StoryType;
  title: string;
  position: string;
  currentPage: StoryType;
  onClick: (page: StoryType) => void;
}

const NavLink = ({ page, title, position, currentPage, onClick }: NavLinkProps) => {
  if (position === 'top') return (
    <span className={`text-hover cursor-pointer ${currentPage === page ? 'text-dark' : 'text-black-50'}`} onClick={() => onClick(page)}>
      <p className='mb-0 nav-hover cursor-pointer'>{title}</p>
    </span>
  )

  return (
    <p className='mb-0'>
      <span className={`text-hover cursor-pointer ${currentPage === page ? 'text-dark fw-medium' : 'text-black-50 fw-lighter'}`} onClick={() => onClick(page)}>
        {title}
      </span>
    </p>
  );
};

type NavbarProps = {
  currentPage: StoryType;
  onNavigate: (page: StoryType) => void;
};

function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const { isSmoking, burnProgress, totalSmoked } = useCigarette();

  const cigaretteSrc = getCigaretteSprite(burnProgress);

  return (
    <>
      <div className='flex-0 sidebar'>
        <div className='row page-width sticky-top'>
          <div className='col-12 py-4'>
            <span className='cursor-pointer' onClick={() => onNavigate('top')}>
              <h4 className='fw-lighter mb-3'>Cigareditte</h4>
            </span>
            <div className='col-12 text-start'>
              <NavLink page={'top'} title={'Hot'} position='side' currentPage={currentPage} onClick={onNavigate}/>
              <NavLink page={'new'} title={'New'} position='side' currentPage={currentPage} onClick={onNavigate}/>
              <NavLink page={'best'} title={'Best'} position='side' currentPage={currentPage} onClick={onNavigate}/>
              <NavLink page={'ask'} title={'Ask HN'} position='side' currentPage={currentPage} onClick={onNavigate}/>
              <NavLink page={'show'} title={'Show HN'} position='side' currentPage={currentPage} onClick={onNavigate}/>
              <NavLink page={'job'} title={'Jobs'} position='side' currentPage={currentPage} onClick={onNavigate}/>
            </div>

            <div className='position-relative d-inline-block text-center' style={{marginLeft: '-1.5rem', width: 'calc(100% + 1.5rem)'}}>
              <SmokeLayer />
              <img
                src={cigaretteSrc}
                width='138px'
                height='138px'
                alt='cigarette'
              />
            </div>
            <p className='text-xs text-center mb-0' style={{marginTop: '-1rem', marginLeft: '-1.5rem'}}>
              {isSmoking ? `${Math.round(burnProgress)}% Burnt` : burnProgress === 100 ? 'Finished' : 'Not lit'}
            </p>
            <p className='text-xs text-center' style={{marginTop: '-0.2rem', marginLeft: '-1.5rem'}}>
              {`[Cigarettes Smoked: ${totalSmoked}]`}
            </p>
          </div>
        </div>
      </div>

      <div className='flex-0 topbar sticky-top'>
        <div className='row page-width'>
          <div className='col-12 pt-4 px-4'>
            <span className='cursor-pointer' onClick={() => onNavigate('top')}>
              <h5 className='d-inline fw-light mb-3'>Cigareditte</h5>
            </span>
            <span className='d-inline float-end cursor-pointer dropdown-hover' data-bs-toggle='dropdown' aria-expanded='false'>
              <h5 className='bi bi-three-dots mb-0'></h5>
            </span>
            <div className='dropdown-menu px-3 shadow border-0'>
              <NavLink page={'top'} title={'Hot'} position='side' currentPage={currentPage} onClick={onNavigate}/>
              <NavLink page={'new'} title={'New'} position='side' currentPage={currentPage} onClick={onNavigate}/>
              <NavLink page={'best'} title={'Best'} position='side' currentPage={currentPage} onClick={onNavigate}/>
              <NavLink page={'ask'} title={'Ask HN'} position='side' currentPage={currentPage} onClick={onNavigate}/>
              <NavLink page={'show'} title={'Show HN'} position='side' currentPage={currentPage} onClick={onNavigate}/>
              <NavLink page={'job'} title={'Jobs'} position='side' currentPage={currentPage} onClick={onNavigate}/>
            </div>
          </div>
        </div>
        <div className='row page-width'>
          <div className='position-relative d-inline-block text-center'>
            <SmokeLayer />
            <img
              src={cigaretteSrc}
              width='138px'
              height='138px'
              alt='cigarette'
            />
          </div>
          <p className='text-xs text-center mb-0' style={{marginTop: '-1rem'}}>
            {isSmoking ? `${Math.round(burnProgress)}% Burnt` : burnProgress === 100 ? 'Finished' : 'Not lit'}
          </p>
          <p className='text-xs text-center mb-3' style={{marginTop: '-0.2rem'}}>
            {`[Cigarettes Smoked: ${totalSmoked}]`}
          </p>
        </div>
      </div>
    </>
  );
}

export default Navbar;
