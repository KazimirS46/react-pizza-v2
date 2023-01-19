import { useEffect, useContext, useRef } from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Categories } from '../components/Categories';
import { Sort, typeOfSorting } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import { ItemPlaceholder } from '../components/PizzaBlock/ItemPlaceholder';
import { Pagination } from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId, setCurentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlise';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const { items, status } = useSelector((state) => state.pizza);

  const sortType = sort.sortProperty;
  const { searchValue } = useContext(SearchContext);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page) => {
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
  }, [categoryId, sortType, currentPage, navigate]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = typeOfSorting.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((item) => <PizzaBlock key={item.productId} {...item} />);
  const skeletons = [...new Array(4)].map((_, i) => <ItemPlaceholder key={i} />);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status === 'error' ? (
        <div>
          <h2>Ошибка нахуй</h2>
          <p>Чет произошло</p>
        </div>
      ) : (
        <div className='content__items'>{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
