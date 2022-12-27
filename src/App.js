import { useEffect, useState } from 'react';

import axios from 'axios';

import './scss/app.scss';

import { Header } from './components/Header';
import { Categories } from './components/Categories';
import { Sort } from './components/Sort';
import { PizzaBlock } from './components/PizzaBlock';
import { ItemPlaceholder } from './components/PizzaBlock/ItemPlaceholder';

const URL = {
  items: 'https://63aaeaf2fdc006ba604fd8b5.mockapi.io/items',
};

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(URL.items).then((res) => {
      setItems(res.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
          <div className='content__top'>
            <Categories />
            <Sort />
          </div>
          <h2 className='content__title'>Все пиццы</h2>
          <div className='content__items'>{isLoading ? [...new Array(6)].map((_, i) => <ItemPlaceholder key={i} />) : items.map((item) => <PizzaBlock key={item.productId} {...item} />)}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
