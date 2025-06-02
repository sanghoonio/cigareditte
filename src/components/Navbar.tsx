import { Link, useLocation } from 'react-router-dom';

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

  const { isSmoking, burnProgress, totalSmoked } = useCigarette();

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
              <a className='text-hover cursor-pointer text-black-50' href='https://github.com/sanghoonio/cigareditte' target='_blank' rel='noopener noreferrer'>
                <p className='mb-0 nav-hover cursor-pointer text-black-50 fw-lighter'>GitHub</p>
              </a>
            </div>

            <p className='mb-0 text-center'><img 
              src={
                (burnProgress >= 0 && burnProgress < 10) ? 'cigarette_1.png' : 
                (burnProgress >= 10 && burnProgress < 20) ? 'cigarette_2.png' : 
                (burnProgress >= 20 && burnProgress < 30) ? 'cigarette_3.png' : 
                (burnProgress >= 30 && burnProgress < 40) ? 'cigarette_4.png' : 
                (burnProgress >= 40 && burnProgress < 50) ? 'cigarette_5.png' : 
                (burnProgress >= 50 && burnProgress < 60) ? 'cigarette_6.png' : 
                (burnProgress >= 60 && burnProgress < 70) ? 'cigarette_7.png' : 
                (burnProgress >= 70 && burnProgress < 80) ? 'cigarette_8.png' : 
                (burnProgress >= 80 && burnProgress < 90) ? 'cigarette_9.png' : 
                'cigarette_10.png'
              } 
              width='138px' 
              height='138px' 
              alt='ashtray'
              style={{marginLeft: '-1.5rem'}}
            /></p>
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
            <Link to='' className='text-decoration-none text-dark'>
              <h5 className='d-inline fw-light mb-3'>Cigareditte</h5>
            </Link>
            <span className='d-inline float-end cursor-pointer dropdown-hover' data-bs-toggle='dropdown' aria-expanded='false'>
              <h5 className='bi bi-three-dots mb-0'></h5>
            </span>
            <div className='dropdown-menu px-3 shadow border-0'>
              <NavLink page={'hot'} title={'Hot'} position='side' currentPage={location}/>
              <NavLink page={'new'} title={'New'} position='side' currentPage={location}/>
              <NavLink page={'best'} title={'Best'} position='side' currentPage={location}/>
              <a className='text-hover cursor-pointer text-black-50' href='https://github.com/sanghoonio/cigareditte' target='_blank' rel='noopener noreferrer'>
                <p className='mb-0 nav-hover cursor-pointer text-black-50 fw-lighter'>GitHub</p>
              </a>
            </div>
          </div>
        </div>
        <div className='row page-width'>
          <p className='mb-0 text-center'><img 
            src={
              (burnProgress >= 0 && burnProgress < 10) ? 'cigarette_1.png' : 
              (burnProgress >= 10 && burnProgress < 20) ? 'cigarette_2.png' : 
              (burnProgress >= 20 && burnProgress < 30) ? 'cigarette_3.png' : 
              (burnProgress >= 30 && burnProgress < 40) ? 'cigarette_4.png' : 
              (burnProgress >= 40 && burnProgress < 50) ? 'cigarette_5.png' : 
              (burnProgress >= 50 && burnProgress < 60) ? 'cigarette_6.png' : 
              (burnProgress >= 60 && burnProgress < 70) ? 'cigarette_7.png' : 
              (burnProgress >= 70 && burnProgress < 80) ? 'cigarette_8.png' : 
              (burnProgress >= 80 && burnProgress < 90) ? 'cigarette_9.png' : 
              'cigarette_10.png'
            } 
            width='138px' 
            height='138px' 
            alt='ashtray'
          /></p>
          <p className='text-xs text-center mb-0' style={{marginTop: '-1rem'}}>
            {isSmoking ? `${Math.round(burnProgress)}% Burnt` : burnProgress === 100 ? 'Finished' : 'Not lit'}
          </p>
          <p className='text-xs text-center mb-2' style={{marginTop: '-0.2rem'}}>
            {`[Cigarettes Smoked: ${totalSmoked}]`}
          </p>
        </div>
      </div>
    </>
  );
}

export default Navbar;
