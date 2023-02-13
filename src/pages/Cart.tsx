import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import CartItem, { icons } from '../components/CartItem';
import { selectCart } from '../redux/cart/selectors';
import { clearItems } from '../redux/cart/slice';
import CartEmpty from '../components/CartEmpty';

const Cart = () => {
  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector(selectCart);
  const itemsCount = items.reduce((sum: number, obj: any) => obj.count + sum, 0);

  const onClickClear = () => {
    if (window.confirm('Очистить корзину?')) {
      dispatch(clearItems());
    }
  };

  if (items.length) {
    return (
      <div className='container container--cart'>
        <div className='cart'>
          <div className='cart__top'>
            <h2 className='content__title'>
              {icons.cart}
              Корзина
            </h2>
            <button onClick={onClickClear} className='cart__clear'>
              {icons.trash}
              <span>Очистить корзину</span>
            </button>
          </div>
          <div className='content__items'>
            {items.map((item: any) => (
              <CartItem key={item.productId} {...item} />
            ))}
          </div>
          <div className='cart__bottom'>
            <div className='cart__bottom-details'>
              <span>
                Всего пицц: <b>{itemsCount} шт.</b>
              </span>
              <span>
                Сумма заказа: <b>{totalPrice} ₽</b>
              </span>
            </div>
            <div className='cart__bottom-buttons'>
              <Link to='/react-pizza-v2/' className='button button--outline button--add go-back-btn'>
                <svg width='8' height='14' viewBox='0 0 8 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M7 13L1 6.93015L6.86175 1' stroke='#D3D3D3'></path>
                </svg>
                <span className='back'>Вернуться&nbsp;</span> <span>назад</span>
              </Link>
              <div className='button pay-btn'>
                <span>Оплатить</span> <span className='now'>&nbsp;сейчас</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <CartEmpty />;
  }
};

export default Cart;
