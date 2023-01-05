// import { createContext, useState } from 'react';
// import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './scss/app.scss';

// import { Header } from './components/Header';
// import { Home } from './pages/Home';
// import { Cart } from './pages/Cart';
// import { NotFoundBlock } from './components/NotFoundBlock';
import { increment, decrement } from './redux/slices/filterSlice';

// export const SearchContext = createContext();

function App() {
  // const [searchValue, setSearchValue] = useState('');
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div className='wrapper'>
      <button aria-label='Increment value' onClick={() => dispatch(increment())}>
        Increment
      </button>
      <span>{count}</span>
      <button aria-label='Decrement value' onClick={() => dispatch(decrement())}>
        Decrement
      </button>
      {/* <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFoundBlock />} />
          </Routes>
        </div>
      </SearchContext.Provider> */}
    </div>
  );
}

export default App;
