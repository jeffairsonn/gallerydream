import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCart } from '../../redux/features/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const { products: cart } = useSelector((state: any) => state.cart);

  useEffect(() => {
    const localCart = localStorage.getItem('cart');
    if (localCart) {
      dispatch(updateCart(JSON.parse(localCart) || []));
    }
  }, []);

  const addToCart = (product: any, quantity = 1) => {
    const newCart: any = [...cart];
    const productIndex = newCart.findIndex((p: any) => p.id === product.id);
    if (productIndex >= 0) {
      const updatedProduct = {
        ...newCart[productIndex],
        quantity: newCart[productIndex].quantity + quantity,
      };
      newCart[productIndex] = updatedProduct;
    } else {
      newCart.push({ ...product, quantity });
    }
    dispatch(updateCart(newCart));
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeFromCart = (product: any) => {
    const newCart: any = [...cart];
    const productIndex = newCart.findIndex((p: any) => p.id === product.id);
    if (productIndex >= 0) {
      newCart.splice(productIndex, 1);
    }
    dispatch(updateCart(newCart));
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const clearCart = () => {
    const newCart: any = [];
    dispatch(updateCart(newCart));
    localStorage.setItem('cart', JSON.stringify([]));
  };

  const total = cart.reduce(
    (toto: any, product: any) => toto + product.quantity,
    0
  );

  return { cart, addToCart, removeFromCart, clearCart, total };
};

export default useCart;
