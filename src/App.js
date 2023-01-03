import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './scss/app.scss';

import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { NotFoundBlock } from './components/NotFoundBlock';

function App() {
  const [searchValue, setSearchValue] = useState('Хуй');

  return (
    <div className='wrapper'>
      <Header value={searchValue} onChangeValue={setSearchValue} />
      <div className='content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='*' element={<NotFoundBlock />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
