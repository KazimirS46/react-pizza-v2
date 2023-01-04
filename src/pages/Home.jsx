import { useState, useEffect } from 'react';
import axios from 'axios';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import { ItemPlaceholder } from '../components/PizzaBlock/ItemPlaceholder';
import { Pagination } from '../components/Pagination';

const URL = {
  items: 'https://63aaeaf2fdc006ba604fd8b5.mockapi.io/items',
};

export const Home = ({ searchValue }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sort: 'rating',
  });
  const [currentPage, setCurrentPage] = useState(1);

  const pizzas = items.map((item) => <PizzaBlock key={item.productId} {...item} />);
  const skeletons = [...new Array(6)].map((_, i) => <ItemPlaceholder key={i} />);

  useEffect(() => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const order = 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    setIsLoading(true);
    axios.get(`${URL.items}?page=${currentPage}&limit=4&${category}&sortBy=${sortType.sort}&order=${order}${search}`).then((res) => {
      setItems(res.data);
      setIsLoading(false);
    });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

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
      <div className='content__items'>{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};
