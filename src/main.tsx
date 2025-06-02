import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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

  return (
    <BrowserRouter basename='/cigareditte'>
      {!isSmoking ? (
        <div className='d-flex flex-column flex-lg-row h-100 w-100 page-padding'>
          <div className='flex-0 h-100 w-100'>
            <div className='row page-width main text-center'>
              <div className='col-12 py-4'>
                <h2 className='fw-lighter mb-3'>Cigareditte</h2>
                <p className='mt-2 mb-0 px-3 fw-light'>Scrolling social media feeds is like smoking an infinite cigarette. What if the cigarettes weren't infinite anymore?</p>
                <p><img 
                  src={totalSmoked == 0 ? 'ashtray_0.png' : totalSmoked == 1 ? 'ashtray_1.png' : totalSmoked == 2 ? 'ashtray_2.png' : 'ashtray_3.png'} 
                  width='138px' 
                  height='138px' 
                  alt='ashtray'
                /></p>
                <button className='btn btn-outline-dark btn-md fw-light' onClick={() => startSmoking()} disabled={isSmoking}>
                  Light Cigarette
                </button>
                <p className='mt-2 text-xs'>{`[Cigarettes Smoked: ${totalSmoked}]`}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='d-flex flex-column flex-lg-row h-100 w-100 page-padding'>
          <Navbar />
          <div className='flex-1 content'>
            <div className='row page-width'>
              <div className='col-12 p-4'>
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