import { SliceCartItem } from '../redux/cart/types';

export const calcTotalPrice = (items: SliceCartItem[]) => {
  return items.reduce((sum, item) => item.price * item.count + sum, 0);
};
