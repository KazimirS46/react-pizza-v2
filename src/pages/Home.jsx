import { useState, useEffect } from 'react';
import axios from 'axios';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import { ItemPlaceholder } from '../components/PizzaBlock/ItemPlaceholder';

const URL = {
  items: 'https://63aaeaf2fdc006ba604fd8b5.mockapi.io/items',
};

export const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sort: 'rating',
  });
  const order = 'desc';

  useEffect(() => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    setIsLoading(true);
    axios.get(`${URL.items}?${category}&sortBy=${sortType.sort}&order=${order}`).then((res) => {
      setItems(res.data);
      setIsLoading(false);
    });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);
  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          value={categoryId}
          onClickCategory={(index) => {
            setCategoryId(index);
          }}
        />
        <Sort
          value={sortType}
          onChangeSort={(index) => {
            setSortType(index);
          }}
        />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>{isLoading ? [...new Array(6)].map((_, i) => <ItemPlaceholder key={i} />) : items.map((item) => <PizzaBlock key={item.productId} {...item} />)}</div>
    </div>
  );
};
