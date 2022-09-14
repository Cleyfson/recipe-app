import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from 'react-router-dom';

const Veggie = () => {
  const [veggie, setVeggie] = useState([]);
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setSize(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    console.log(size);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    const check = localStorage.getItem('veggie');
    if (check) {
      setVeggie(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${
          import.meta.env.VITE_API_KEY
        }&number=9&tags=vegetarian`
      );
      const data = await api.json();
      localStorage.setItem('veggie', JSON.stringify(data.recipes));
      setVeggie(data.recipes);
    }
  };

  const spliderDesktop = {
    perPage: 3,
    arrows: true,
    pagination: false,
    drag: 'free',
    gap: '5rem',
  };

  const spliderMobile = {
    perPage: 2,
    arrows: true,
    pagination: false,
    drag: 'free',
    gap: '1rem',
  };

  return (
    <div className='wrapper'>
      <h3 className='wrapper__title'>Our Vegetarian Picks</h3>

      <Splide options={size <= 820 ? spliderMobile : spliderDesktop}>
        {veggie.map((recipe) => {
          return (
            <SplideSlide key={recipe.id}>
              <div className='wrapper__card'>
                <Link to={'/recipe/' + recipe.id}>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                  <div className='wrapper__gradient'></div>
                </Link>
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};

export default Veggie;
