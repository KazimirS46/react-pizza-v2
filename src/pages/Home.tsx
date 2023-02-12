/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import Sort, { typeOfSorting } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import ItemPlaceholder from '../components/PizzaBlock/ItemPlaceholder';
import Pagination from '../components/Pagination';
import { setCategoryId, setCurentPage, setFilters } from '../redux/fiter/slice';
import { useAppDispatch } from '../redux/store';
import { selectFilters } from '../redux/fiter/seletors';
import { selectPizzas } from '../redux/pizzas/selectors';
import { fetchPizzas } from '../redux/pizzas/asyncActions';
import Categories from '../components/Categories';
import { SearchPizzaParams } from '../redux/pizzas/types';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilters);
  const { items, status } = useSelector(selectPizzas);

  const sortType = sort.sortProperty;

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurentPage(page));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const order = 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(fetchPizzas({ category, order, search, sortType, currentPage }));

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = typeOfSorting.find((obj) => obj.sortProperty === params.sortType);

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: params.currentPage,
          sort: sort || typeOfSorting[0],
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((item: any) => <PizzaBlock {...item} key={item.id} />);
  const skeletons = [...new Array(4)].map((_, i) => <ItemPlaceholder key={i} />);

  return (
    <div className='container'>
      {status !== 'error' && (
        <>
          <div className='content__top'>
            <Categories value={categoryId} onClickCategory={onChangeCategory} />
            <Sort value={sort} />
          </div>
          <h2 className='content__title'>Все пиццы</h2>
        </>
      )}
      {/* <div className='content__top'>
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className='content__title'>Все пиццы</h2> */}
      {status === 'error' ? (
        <div className='content__error'>
          <h2>Ошибка нахуй</h2>
          <p>Чет произошло</p>
        </div>
      ) : (
        <div className='content__items'>{status === 'loading' ? skeletons : pizzas}</div>
      )}
      {status !== 'error' && <Pagination currentPage={currentPage} onChangePage={onChangePage} />}
    </div>
  );
};

export default Home;
