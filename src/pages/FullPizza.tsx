/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const FullPizza = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://63aaeaf2fdc006ba604fd8b5.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пицц');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className='container'>
      <img src={pizza.imageUrl} alt='Pict.' />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;
