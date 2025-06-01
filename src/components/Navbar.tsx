import { Link, useLocation } from 'react-router-dom';

import { createSmoke } from '../utils';
import { useCigarette } from '../stores/cigarette';

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


function Navbar() {
  const location = useLocation().pathname.substring(1) || 'hot';

  const { isSmoking, burnProgress } = useCigarette();

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
              height: '80px',
              overflow: 'hidden',
              border: '1px solid #ccc',
              margin: '10px 0',
              backgroundColor: '#f9f9f9',
              borderRadius: '50%'
            }}>
              <div className="cigarette" style={{
                position: 'absolute',
                bottom: '30px',
                left: '20px',
                width: '100px',
                height: '15px',
                backgroundColor: 'white',
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
                left: '120px',
                width: '40px',
                height: '15px',
                backgroundColor: '#f4e4bc',
                borderLeft: '2px solid #ddd',
              }}></div>
            </div>
            
            <div>
              <p className='text-xs'>Smoking Status: {isSmoking ? `${Math.round(burnProgress)}% burnt` : burnProgress === 100 ? 'Finished' : 'Not lit'}</p>
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
