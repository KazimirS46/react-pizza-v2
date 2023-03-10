import { Link } from 'react-router-dom';

import cartEmptyImg from '../assets/img/empty-cart.png';

const CartEmpty = () => {
  return (
    <div className='container container--cart'>
      <div className='cart cart--empty'>
        <h2>
          Корзина пустая <span className='smile'>😕</span>
        </h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={cartEmptyImg} alt='Empty cart' />
        <Link to='/react-pizza-v2/' className='button button--black'>
          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  );
};

export default CartEmpty;
