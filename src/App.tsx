import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './scss/app.scss';

import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header';
import FullPizza from './pages/FullPizza';
import Home from './pages/Home';

const Cart = React.lazy(() => import('./pages/Cart'));

function App() {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/cart'
            element={
              <React.Suspense fallback={<div style={{ fontSize: '50px' }}>Йобана!! Корзина ща будет!</div>}>
                <Cart />
              </React.Suspense>
            }
          />
          <Route path='/pizza/:id' element={<FullPizza />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
