import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './scss/app.scss';
import Downloading from './components/Downloading';
import Home from './pages/Home';
import Header from './components/Header';

const Cart = React.lazy(() => import(/*webpackChunkName: "Cart" */ './pages/Cart'));
const FullPizza = React.lazy(() => import(/*webpackChunkName: "FullPizza" */ './pages/FullPizza'));
const NotFoundPage = React.lazy(() => import(/*webpackChunkName: "NotFoundPage" */ './pages/NotFoundPage'));

function App() {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <Routes>
          <Route index element={<Home />} />
          <Route
            path='/cart'
            element={
              <React.Suspense fallback={<Downloading />}>
                <Cart />
              </React.Suspense>
            }
          />
          <Route
            path='/pizza/:id'
            element={
              <React.Suspense fallback={<Downloading />}>
                <FullPizza />
              </React.Suspense>
            }
          />
          <Route
            path='*'
            element={
              <React.Suspense fallback={<Downloading />}>
                <NotFoundPage />
              </React.Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
