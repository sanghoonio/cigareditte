import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Top from './components/Top.tsx'
import New from './components/New.tsx'
import Best from './components/Best.tsx'

import './style.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <div className='d-flex flex-column flex-lg-row h-100 w-100 page-padding'>
        <Navbar />
        <div className='flex-1 content'>
          <div className='row page-width'>
            <div className='col-12 p-4 mb-4'>

              <Routes>
                <Route path="/" element={<Top />} />
                <Route path="/hot" element={<Top />} />
                <Route path="/new" element={<New />} />
                <Route path="/best" element={<Best />} />
                {/* <Route path="/comments" element={<Top />} /> */}
              </Routes>
            
            </div>
          </div>
        </div>

      </div>
    </BrowserRouter>
  </QueryClientProvider>
)