import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './components/Navbar';
import Top from './components/Top.tsx'
import New from './components/New.tsx'
import Best from './components/Best.tsx'

import { useCigarette } from './stores/cigarette';

import './style.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

const queryClient = new QueryClient();

function Main() {
  const { isSmoking, totalSmoked, startSmoking } = useCigarette();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <BrowserRouter basename='/cigareditte'>
      {!isSmoking ? (
        <div className='d-flex flex-column flex-lg-row h-100 w-100 page-padding'>
          <div className={`flex-0 h-100 w-100 ${isExpanded && 'mb-5'}`}>
            <div className={`row page-width splash text-center ${isExpanded && 'mb-5'}`}>
              <div className='col-12 py-4'>
                <h2 className='fw-lighter mb-3'>Cigareditte</h2>
                { totalSmoked == 0 ? 
                  <>
                    <p className='mt-2 px-3 fw-light'>Scrolling social media feeds is like smoking an infinite cigarette. What if the cigarettes weren't infinite anymore?</p>
                    {isExpanded &&
                      <div className='row justify-content-center px-4'>
                        <div className='col-11 col-sm-9 col-md-7 col-lg-5 col-xl-4'>
                          <p className='mt-2 mb-0 px-3 fw-light text-xs info-width mx-auto text-start'>The average person spends about 150 minutes (2.5 hours) on social media per day. It takes about 5 minutes to smoke a cigarette. How many packs worth of online slop are you smoking?</p>
                          <p className='mt-2 mb-0 px-3 fw-light text-xs info-width  mx-auto text-start'>Each cigarette on Cigareditte takes 5 minutes to smoke. Within your allotted smoke break time window, you are free to browse any of the top, new, or best stories from <a className='text-decoration-none' href='https://news.ycombinator.com/' target='_blank' rel='noopener noreferrer'>Hacker News</a>. Embedded windows let you browse stories in the app, with options to view comments on Hacker News or open the page in a new tab. When your cigarette runs out, you'll need to light another one to get back to where you were.</p>
                          <p className='mt-2 px-3 fw-light text-xs info-width mx-auto text-start'>The app keeps track of how many cigarettes you smoke during your session. Good luck. Pixel art inspired and provided by <a className='text-decoration-none' href='https://www.deviantart.com/minetoblend/art/Pixel-Art-Ashtray-613081396' target='_blank' rel='noopener noreferrer'>minetoblend</a>.</p>
                        </div>
                      </div>
                    }
                  </>
                  :
                  <>
                    <p className='mt-2 mb-0 px-3 fw-light'>Scrolling social media feeds is like smoking an infinite cigarette. What if the cigarettes weren't infinite anymore?</p>
                    <p className='px-3 fw-light'>You want another one now, don't you?</p>
                    {isExpanded &&
                      <div className='row justify-content-center px-4'>
                        <div className='col-11 col-sm-9 col-md-7 col-lg-5 col-xl-4'>
                          <p className='mt-2 mb-0 px-3 fw-light text-xs info-width mx-auto text-start'>The average person spends about 150 minutes (2.5 hours) on social media per day. It takes about 5 minutes to smoke a cigarette. How many packs worth of online slop are you smoking?</p>
                          <p className='mt-2 mb-0 px-3 fw-light text-xs info-width  mx-auto text-start'>Each cigarette on Cigareditte takes 5 minutes to smoke. Within your allotted smoke break time window, you are free to browse any of the top, new, or best stories from <a className='text-decoration-none' href='https://news.ycombinator.com/' target='_blank' rel='noopener noreferrer'>Hacker News</a>. Embedded windows let you browse stories in the app, with options to view comments on Hacker News or open the page in a new tab. When your cigarette runs out, you'll need to light another one to get back to where you were.</p>
                          <p className='mt-2 px-3 fw-light text-xs info-width mx-auto text-start'>The app keeps track of how many cigarettes you smoke during your session. Good luck. Pixel art inspired and provided by <a className='text-decoration-none' href='https://www.deviantart.com/minetoblend/art/Pixel-Art-Ashtray-613081396' target='_blank' rel='noopener noreferrer'>minetoblend</a>.</p>
                        </div>
                      </div>
                    }
                  </>
                }
                <h5 className={`bi ${isExpanded ? 'bi-chevron-compact-up' : 'bi-chevron-compact-down'}  cursor-pointer mb-0 d-inline-block`} onClick={() => setIsExpanded(!isExpanded)}></h5>
                <p><img 
                  src={totalSmoked == 0 ? 'ashtray_0.png' : totalSmoked == 1 ? 'ashtray_1.png' : totalSmoked == 2 ? 'ashtray_2.png' : 'ashtray_3.png'} 
                  width='138px' 
                  height='138px' 
                  alt='ashtray'
                /></p>
                <button className='btn btn-danger rounded-4 btn-md fw-light' onClick={() => startSmoking()} disabled={isSmoking}>
                  { totalSmoked == 0 ? 'Light Cigarette' : 'Smoke One More' }
                </button>
                
                <p className='mt-2 mb-5 text-xs'>{`[Cigarettes Smoked: ${totalSmoked}]`}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='d-flex flex-column flex-lg-row h-100 w-100 page-padding'>
          <Navbar />
          <div className='flex-1 content'>
            <div className='row page-width'>
              <div className='col-12 main'>
                <Routes>
                  <Route path="/" element={<Top />} />
                  <Route path="/hot" element={<Top />} />
                  <Route path="/new" element={<New />} />
                  <Route path="/best" element={<Best />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      )}
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
)