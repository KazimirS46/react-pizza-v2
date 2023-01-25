/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

export const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://63aaeaf2fdc006ba604fd8b5.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return 'Загрузка...';
  }
  return (
    <div className='container'>
      <img src={pizza.imageUrl} alt='Pict.' />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};
