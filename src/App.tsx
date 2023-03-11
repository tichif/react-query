import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
const Home = lazy(() => import('./pages/Home'));
const Posts = lazy(() => import('./pages/Posts'));

function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/posts' element={<Posts />} />
        </Routes>
      </div>
      <Toaster />
    </Suspense>
  );
}

export default App;
